/**
 * AI Research Agent - Memory Management System
 * 
 * This module provides intelligent memory management for AI agents with:
 * - Persistent storage of user memories and facts
 * - Vector-based relevance search
 * - Automatic summarization of conversations
 * - Caching and performance optimization
 * - Rate limiting and error handling
 * 
 * @author vtempest
 */

import { weighRelevanceConceptVectorAPI, generateLanguageResponse } from '..'
import { sql, eq, and, desc, or, like } from 'drizzle-orm';

/**
 * Configuration constants for memory management
 */
const MEMORY_CONFIG = {
  DEFAULT_MAX_MEMORIES: 100,
  DEFAULT_SUMMARY_THRESHOLD: 10,
  DEFAULT_CACHE_EXPIRY: 5 * 60 * 1000, // 5 minutes
  DEFAULT_BATCH_SIZE: 5,
  DEFAULT_RELEVANCE_THRESHOLD: 0.3,
  DEFAULT_IMPORTANCE_RANGE: { min: 0, max: 10 },
  DEFAULT_RATE_LIMIT: { requests: 10, windowMs: 60000 },
  DEFAULT_TIMEOUT: 30000, // 30 seconds
  VECTOR_SEARCH_ENABLED: true,
  AUTO_SUMMARIZATION_ENABLED: true
};

/**
 * Memory types for categorization
 */
const MEMORY_TYPES = {
  FACT: 'fact',
  CONVERSATION: 'conversation',
  PREFERENCE: 'preference',
  PERSONAL: 'personal',
  WORK: 'work',
  MANUAL: 'manual'
};

/**
 * Simple Memory Class - Core memory management functionality
 * 
 * Features:
 * - Message deduplication
 * - Automatic summarization
 * - Vector-based relevance search
 * - Caching with TTL
 * - Batch processing
 * - Conflict resolution
 */
class SimpleMemory {
  /**
   * Initialize memory system for a user
   * 
   * @param {string} userId - Unique user identifier
   * @param {Object} db - Database connection
   * @param {Object} options - Configuration options
   * @param {number} options.maxMemories - Maximum memories to store
   * @param {number} options.summaryThreshold - Messages before auto-summarization
   * @param {number} options.cacheExpiry - Cache TTL in milliseconds
   * @param {boolean} options.enableVectorSearch - Enable vector-based search
   * @param {boolean} options.enableAutoSummarization - Enable auto-summarization
   */
  constructor(userId, db, options = {}) {
    if (!userId || !db) {
      throw new Error('userId and db are required parameters');
    }

    this.userId = userId;
    this.db = db;
    this.maxMemories = options.maxMemories || MEMORY_CONFIG.DEFAULT_MAX_MEMORIES;
    this.summaryThreshold = options.summaryThreshold || MEMORY_CONFIG.DEFAULT_SUMMARY_THRESHOLD;
    this.cacheExpiry = options.cacheExpiry || MEMORY_CONFIG.DEFAULT_CACHE_EXPIRY;
    this.batchSize = options.batchSize || MEMORY_CONFIG.DEFAULT_BATCH_SIZE;
    this.relevanceThreshold = options.relevanceThreshold || MEMORY_CONFIG.DEFAULT_RELEVANCE_THRESHOLD;
    
    // Feature flags
    this.enableVectorSearch = options.enableVectorSearch !== false && MEMORY_CONFIG.VECTOR_SEARCH_ENABLED;
    this.enableAutoSummarization = options.enableAutoSummarization !== false && MEMORY_CONFIG.AUTO_SUMMARIZATION_ENABLED;
    
    // State management
    this.recentMessages = [];
    this.memoryCache = new Map();
    this.isProcessing = false;
    this.processingQueue = [];
    
    // Performance metrics
    this.metrics = {
      cacheHits: 0,
      cacheMisses: 0,
      vectorSearches: 0,
      summarizations: 0,
      errors: 0
    };
  }

  /**
   * Add a message to current session with intelligent deduplication
   * 
   * @param {string} role - Message role ('user' or 'assistant')
   * @param {string} content - Message content
   * @param {Object} metadata - Additional message metadata
   * @returns {boolean} - Whether message was added
   * 
   * @example
   * memory.addMessage('user', 'Hello, how are you?', { timestamp: Date.now() });
   * memory.addMessage('assistant', 'I am doing well, thank you!');
   */
  addMessage(role, content, metadata = {}) {
    if (!role || !content || typeof content !== 'string') {
      console.warn('Invalid message parameters:', { role, content });
      return false;
    }

    // Intelligent deduplication - check last few messages
    const lastMessages = this.recentMessages.slice(-3);
    const isDuplicate = lastMessages.some(msg => 
      msg.role === role && 
      msg.content === content &&
      Date.now() - msg.timestamp < 60000 // Within 1 minute
    );

    if (isDuplicate) {
      console.log('Duplicate message detected, skipping');
      return false;
    }

    // Add message with metadata
    const message = {
      role,
      content: content.trim(),
      timestamp: metadata.timestamp || Date.now(),
      metadata: { ...metadata }
    };

    this.recentMessages.push(message);

    // Auto-summarization with debouncing
    if (this.enableAutoSummarization && 
        this.recentMessages.length >= this.summaryThreshold && 
        !this.isProcessing) {
      this.debouncedSummarize();
    }

    return true;
  }

  /**
   * Debounced summarization to prevent excessive processing
   */
  debouncedSummarize() {
    if (this.summarizeTimeout) {
      clearTimeout(this.summarizeTimeout);
    }
    
    this.summarizeTimeout = setTimeout(() => {
      this.summarizeAndStore().catch(error => {
        console.error('Auto-summarization failed:', error);
        this.metrics.errors++;
      });
    }, 1000); // 1 second debounce
  }

  /**
   * Store important facts with validation and conflict resolution
   * 
   * @param {string} content - Fact content
   * @param {number} importance - Importance score (0-10)
   * @param {string} category - Memory category
   * @param {Object} metadata - Additional metadata
   * @returns {Promise<string>} - Memory ID
   * 
   * @example
   * await memory.storeFact('User prefers dark mode', 8, 'preference', { source: 'conversation' });
   * await memory.storeFact('User works at Google', 9, 'personal', { confidence: 0.95 });
   */
  async storeFact(content, importance = 1, category = MEMORY_TYPES.FACT, metadata = {}) {
    // Input validation
    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      throw new Error('Content cannot be empty');
    }

    if (importance < MEMORY_CONFIG.DEFAULT_IMPORTANCE_RANGE.min || 
        importance > MEMORY_CONFIG.DEFAULT_IMPORTANCE_RANGE.max) {
      throw new Error(`Importance must be between ${MEMORY_CONFIG.DEFAULT_IMPORTANCE_RANGE.min} and ${MEMORY_CONFIG.DEFAULT_IMPORTANCE_RANGE.max}`);
    }

    const normalizedContent = content.trim();
    const normalizedCategory = Object.values(MEMORY_TYPES).includes(category) ? category : MEMORY_TYPES.FACT;

    try {
      // Check for existing similar facts using fuzzy matching
      const existingFacts = await this.findSimilarFacts(normalizedContent);
      
      if (existingFacts.length > 0) {
        // Update existing fact if importance is higher
        const bestMatch = existingFacts[0];
        if (importance > bestMatch.importance) {
          await this.updateMemory(bestMatch.id, {
            importance,
            updated_at: new Date(),
            access_count: sql`access_count + 1`,
            metadata: { ...bestMatch.metadata, ...metadata }
          });
        }
        return bestMatch.id;
      }

      // Insert new fact with metadata
      const result = await this.db.insert('user_memories').values({
        user_id: this.userId,
        memory_type: normalizedCategory,
        content: normalizedContent,
        importance: Math.max(0, Math.min(10, importance)),
        access_count: 0,
        metadata: metadata,
        created_at: new Date(),
        updated_at: new Date()
      }).returning({ id: 'id' });

      // Clear cache after new insertion
      this.clearCache();
      
      return result[0]?.id;
    } catch (error) {
      console.error('Error storing fact:', error);
      this.metrics.errors++;
      throw error;
    }
  }

  /**
   * Find similar facts using content similarity
   * 
   * @param {string} content - Content to find similar facts for
   * @returns {Promise<Array>} - Similar facts
   */
  async findSimilarFacts(content) {
    try {
      // Simple similarity check - can be enhanced with vector search
      const words = content.toLowerCase().split(/\s+/).filter(w => w.length > 2);
      const searchTerms = words.slice(0, 3); // Use first 3 words
      
      const conditions = searchTerms.map(term => 
        like('content', `%${term}%`)
      );

      return await this.db
        .select()
        .from('user_memories')
        .where(and(
          eq('user_id', this.userId),
          or(...conditions)
        ))
        .orderBy(desc('importance'), desc('updated_at'))
        .limit(5);
    } catch (error) {
      console.error('Error finding similar facts:', error);
      return [];
    }
  }

  /**
   * Update memory record
   * 
   * @param {string} id - Memory ID
   * @param {Object} updates - Fields to update
   */
  async updateMemory(id, updates) {
    await this.db
      .update('user_memories')
      .set(updates)
      .where(eq('id', id));
  }

  /**
   * Enhanced memory recall with caching and vector search
   * 
   * @param {string} query - Search query
   * @param {number} limit - Maximum results
   * @param {Object} options - Search options
   * @returns {Promise<Array>} - Relevant memories
   * 
   * @example
   * // Search for work-related memories
   * const workMemories = await memory.recallRelevantMemories('work', 10);
   * 
   * // Get most important memories
   * const importantMemories = await memory.recallRelevantMemories('', 5);
   * 
   * // Search with specific options
   * const recentMemories = await memory.recallRelevantMemories('meeting', 10, { 
   *   minImportance: 5, 
   *   includeMetadata: true 
   * });
   */
  async recallRelevantMemories(query = '', limit = 10, options = {}) {
    const cacheKey = `${query}-${limit}-${JSON.stringify(options)}`;
    
    // Check cache first
    if (this.memoryCache.has(cacheKey)) {
      const cached = this.memoryCache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheExpiry) {
        this.metrics.cacheHits++;
        return cached.data;
      }
      this.memoryCache.delete(cacheKey);
    }
    
    this.metrics.cacheMisses++;

    try {
      let memories = await this.fetchMemoriesFromDB(query, limit, options);
      
      if (memories.length === 0) {
        return [];
      }

      // Apply vector search if enabled and query provided
      if (this.enableVectorSearch && query.trim() && memories.length > 0) {
        memories = await this.applyVectorSearch(query, memories, options);
      }

      // Apply relevance filtering
      if (options.minImportance) {
        memories = memories.filter(m => m.importance >= options.minImportance);
      }

      // Format results
      const result = memories.map(m => ({
        id: m.id,
        type: m.memory_type,
        content: m.content,
        importance: m.importance,
        relevance_score: m.relevance_score || 0,
        access_count: m.access_count,
        updated_at: m.updated_at,
        metadata: options.includeMetadata ? m.metadata : undefined
      }));

      // Cache the result
      this.memoryCache.set(cacheKey, {
        data: result,
        timestamp: Date.now()
      });

      return result;

    } catch (error) {
      console.error('Error retrieving memories:', error);
      this.metrics.errors++;
      return [];
    }
  }

  /**
   * Fetch memories from database with filtering
   */
  async fetchMemoriesFromDB(query, limit, options) {
    const conditions = [eq('user_id', this.userId)];
    
    if (query.trim()) {
      conditions.push(like('content', `%${query}%`));
    }
    
    if (options.memoryType) {
      conditions.push(eq('memory_type', options.memoryType));
    }

    return await this.db
      .select({
        id: 'id',
        memory_type: 'memory_type',
        content: 'content',
        importance: 'importance',
        access_count: 'access_count',
        updated_at: 'updated_at',
        metadata: 'metadata'
      })
      .from('user_memories')
      .where(and(...conditions))
      .orderBy(desc('importance'), desc('access_count'), desc('updated_at'))
      .limit(Math.min(limit, 50)); // Cap at 50 for performance
  }

  /**
   * Apply vector search to memories
   */
  async applyVectorSearch(query, memories, options) {
    try {
      this.metrics.vectorSearches++;
      
      const sentencesByRelevance = await weighRelevanceConceptVectorAPI(
        query, 
        memories.map(m => m.content)
      );

      // Update importance scores and access counts in batch
      await this.updateRelevanceScores(memories, sentencesByRelevance);

      // Sort by relevance score
      return memories
        .map(memory => {
          const relevanceData = sentencesByRelevance.find(s => s.sentence === memory.content);
          return {
            ...memory,
            relevance_score: relevanceData?.relevance || 0
          };
        })
        .sort((a, b) => b.relevance_score - a.relevance_score);

    } catch (vectorError) {
      console.warn('Vector search failed, falling back to basic search:', vectorError);
      return memories;
    }
  }

  /**
   * Update relevance scores for memories
   */
  async updateRelevanceScores(memories, sentencesByRelevance) {
    const updatePromises = sentencesByRelevance
      .filter(m => m.relevance > this.relevanceThreshold)
      .map(async (m) => {
        const memory = memories.find(mem => mem.content === m.sentence);
        if (memory) {
          return this.updateMemory(memory.id, {
            importance: Math.min(10, memory.importance + m.relevance * 0.5),
            access_count: sql`access_count + 1`,
            updated_at: new Date()
          });
        }
      })
      .filter(Boolean);

    if (updatePromises.length > 0) {
      await Promise.allSettled(updatePromises);
    }
  }

  /**
   * Improved summarization with error handling and batch processing
   * 
   * @returns {Promise<boolean>} - Success status
   */
  async summarizeAndStore() {
    if (this.recentMessages.length === 0 || this.isProcessing) {
      return false;
    }

    this.isProcessing = true;
    this.metrics.summarizations++;
    
    try {
      // Create conversation summary
      const conversationText = this.recentMessages
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n');
      
      // Extract facts using LLM
      const factsResponse = await this.extractFactsFromConversation(conversationText);
      
      if (!Array.isArray(factsResponse) || factsResponse.length === 0) {
        console.warn('No facts extracted from conversation');
        return false;
      }

      // Process facts in batches
      await this.processFactsInBatches(factsResponse);

      // Clear processed messages
      this.recentMessages = [];
      
      return true;
      
    } catch (error) {
      console.error('Error in summarizeAndStore:', error);
      this.metrics.errors++;
      return false;
    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * Extract facts from conversation using LLM
   */
  async extractFactsFromConversation(conversationText) {
    try {
      const { extract: factsResponse } = await generateLanguageResponse({
        agent: 'remember-facts',
        chat_history: conversationText,
        provider: 'groq',
        apiKey: process.env.GROQ_API_KEY,
        model: 'mixtral-8x7b-32768',
        timeout: MEMORY_CONFIG.DEFAULT_TIMEOUT
      });

      return Array.isArray(factsResponse) ? factsResponse : [];
    } catch (error) {
      console.error('Error extracting facts:', error);
      return [];
    }
  }

  /**
   * Process facts in batches to avoid overwhelming the database
   */
  async processFactsInBatches(factsResponse) {
    for (let i = 0; i < factsResponse.length; i += this.batchSize) {
      const batch = factsResponse.slice(i, i + this.batchSize);
      
      const storePromises = batch.map(async (fact) => {
        try {
          if (fact && typeof fact === 'object' && fact.content) {
            return await this.storeFact(
              fact.content,
              fact.importance || 1,
              fact.category || MEMORY_TYPES.CONVERSATION,
              fact.metadata || {}
            );
          } else if (typeof fact === 'string' && fact.trim()) {
            return await this.storeFact(fact.trim(), 1, MEMORY_TYPES.CONVERSATION);
          }
        } catch (error) {
          console.error('Error storing individual fact:', error);
          return null;
        }
      });

      await Promise.allSettled(storePromises);
      
      // Small delay between batches
      if (i + this.batchSize < factsResponse.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
  }

  /**
   * Clear cache utility
   */
  clearCache() {
    this.memoryCache.clear();
  }

  /**
   * Get memory context with better formatting and relevance
   * 
   * @param {string} query - Context query
   * @param {boolean} includeRecent - Include recent messages
   * @param {Object} options - Context options
   * @returns {Promise<string>} - Formatted context
   * 
   * @example
   * const context = await memory.getMemoryContext('work meeting', true, {
   *   maxMemories: 5,
   *   minImportance: 3
   * });
   */
  async getMemoryContext(query = '', includeRecent = true, options = {}) {
    const memories = await this.recallRelevantMemories(
      query, 
      options.maxMemories || 8,
      { minImportance: options.minImportance || 0.5 }
    );
    
    if (memories.length === 0 && this.recentMessages.length === 0) {
      return '';
    }

    let context = '';

    // Add relevant memories
    if (memories.length > 0) {
      context += "What I remember about you:\n";
      memories
        .filter(memory => memory.importance > (options.minImportance || 0.5))
        .forEach(memory => {
          const importanceIndicator = memory.importance >= 8 ? '⭐' : 
                                    memory.importance >= 5 ? '•' : '-';
          context += `${importanceIndicator} ${memory.content}\n`;
        });
    }

    // Add recent conversation if requested
    if (includeRecent && this.recentMessages.length > 0) {
      context += context ? "\nRecent conversation:\n" : "Recent conversation:\n";
      this.recentMessages.slice(-3).forEach(msg => {
        const truncatedContent = msg.content.length > 100 
          ? msg.content.substring(0, 100) + '...' 
          : msg.content;
        context += `${msg.role}: ${truncatedContent}\n`;
      });
    }

    return context;
  }

  /**
   * Get performance metrics
   */
  getMetrics() {
    return {
      ...this.metrics,
      cacheSize: this.memoryCache.size,
      recentMessagesCount: this.recentMessages.length,
      isProcessing: this.isProcessing
    };
  }

  
}

/**
 * Enhanced Memory Agent with better error handling and features
 * 
 * Features:
 * - Rate limiting
 * - Multiple LLM provider support
 * - Health monitoring
 * - Conversation management
 * - Memory analytics
 */
class MemoryAgent {
  /**
   * Initialize memory agent
   * 
   * @param {string} userId - User identifier
   * @param {Object} db - Database connection
   * @param {Object} options - Configuration options
   * @param {Object} options.memoryOptions - Memory system options
   * @param {string} options.defaultProvider - Default LLM provider
   * @param {string} options.defaultApiKey - Default API key
   * @param {string} options.defaultModel - Default model
   * @param {Object} options.rateLimit - Rate limiting configuration
   * @param {Object} options.providers - LLM provider configurations
   */
  constructor(userId, db, options = {}) {
    if (!userId || !db) {
      throw new Error('userId and db are required parameters');
    }

    this.memory = new SimpleMemory(userId, db, options.memoryOptions || {});
    this.defaultProvider = options.defaultProvider || 'groq';
    this.defaultApiKey = options.defaultApiKey;
    this.defaultModel = options.defaultModel;
    
    // Rate limiting
    this.rateLimiter = new Map();
    this.rateLimitConfig = {
      ...MEMORY_CONFIG.DEFAULT_RATE_LIMIT,
      ...options.rateLimit
    };
    
    // LLM providers
    this.providers = options.providers || this.getDefaultProviders();
    
    // Session management
    this.sessionId = this.generateSessionId();
    this.conversationHistory = [];
    
    // Analytics
    this.analytics = {
      totalMessages: 0,
      totalTokens: 0,
      averageResponseTime: 0,
      errorCount: 0,
      sessionStartTime: Date.now()
    };
  }

  /**
   * Get default LLM providers
   */
  getDefaultProviders() {
    return {
      groq: (apiKey, model, temperature) => ({
        invoke: async (prompt) => {
          // Implementation would go here
          return { content: 'Default response', tokensUsed: 0 };
        }
      }),
      openai: (apiKey, model, temperature) => ({
        invoke: async (prompt) => {
          // Implementation would go here
          return { content: 'Default response', tokensUsed: 0 };
        }
      })
    };
  }

  /**
   * Generate unique session ID
   */
  generateSessionId() {
    return `${this.userId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Rate limiting check with sliding window
   * 
   * @param {string} key - Rate limit key
   * @param {number} maxRequests - Maximum requests per window
   * @param {number} windowMs - Window size in milliseconds
   * @returns {boolean} - Whether request is allowed
   */
  checkRateLimit(key, maxRequests = null, windowMs = null) {
    const config = {
      maxRequests: maxRequests || this.rateLimitConfig.requests,
      windowMs: windowMs || this.rateLimitConfig.windowMs
    };

    const now = Date.now();
    const requests = this.rateLimiter.get(key) || [];
    
    // Remove old requests outside the window
    const validRequests = requests.filter(time => now - time < config.windowMs);
    
    if (validRequests.length >= config.maxRequests) {
      return false;
    }
    
    validRequests.push(now);
    this.rateLimiter.set(key, validRequests);
    return true;
  }

  /**
   * Main chat method with comprehensive error handling
   * 
   * @param {string} message - User message
   * @param {Object} options - Chat options
   * @returns {Promise<Object>} - Chat response
   * 
   * @example
   * const response = await agent.chat("Hello, I'm John", {
   *   provider: 'groq',
   *   model: 'mixtral-8x7b-32768',
   *   temperature: 0.7,
   *   systemPrompt: 'You are a helpful assistant.'
   * });
   * 
   * if (response.success) {
   *   console.log('Response:', response.content);
   *   console.log('Memory context:', response.memoryContext);
   *   console.log('Tokens used:', response.tokensUsed);
   * } else {
   *   console.error('Error:', response.error);
   * }
   */
  async chat(message, options = {}) {
    const startTime = Date.now();
    
    // Input validation
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return {
        error: 'Message cannot be empty',
        success: false,
        timestamp: new Date().toISOString()
      };
    }

    // Rate limiting
    const rateLimitKey = `chat-${this.userId}`;
    if (!this.checkRateLimit(rateLimitKey)) {
      return {
        error: 'Rate limit exceeded. Please try again later.',
        success: false,
        timestamp: new Date().toISOString()
      };
    }

    try {
      // Add user message to memory
      this.memory.addMessage('user', message, {
        sessionId: this.sessionId,
        timestamp: Date.now()
      });

      // Get memory context
      const memoryContext = await this.memory.getMemoryContext(message, true, {
        maxMemories: options.maxMemories || 8,
        minImportance: options.minImportance || 0.5
      });

      // Build enhanced prompt
      const prompt = this.buildPrompt(message, memoryContext, options);

      // Generate response
      const response = await this.generateResponse(prompt, options);

      if (!response || !response.content) {
        throw new Error('Invalid response from LLM');
      }

      // Add response to memory
      this.memory.addMessage('assistant', response.content, {
        sessionId: this.sessionId,
        tokensUsed: response.tokensUsed,
        timestamp: Date.now()
      });

      // Update analytics
      this.updateAnalytics(response.tokensUsed, Date.now() - startTime);

      return {
        content: response.content,
        memoryContext: memoryContext,
        success: true,
        tokensUsed: response.tokensUsed || 0,
        responseTime: Date.now() - startTime,
        sessionId: this.sessionId,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error('Chat error:', error);
      this.analytics.errorCount++;
      
      return {
        error: error.message || 'An unexpected error occurred',
        success: false,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Generate LLM response with timeout and error handling
   */
  async generateResponse(prompt, options) {
    const provider = options.provider || this.defaultProvider;
    const apiKey = options.apiKey || this.defaultApiKey;
    const model = options.model || this.defaultModel;
    const temperature = options.temperature || 0.7;

    if (!this.providers || !this.providers[provider]) {
      throw new Error(`Provider ${provider} not available`);
    }

    const llm = this.providers[provider](apiKey, model, temperature);
    
    // Add timeout to LLM call
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('LLM request timeout')), MEMORY_CONFIG.DEFAULT_TIMEOUT)
    );
    
    return await Promise.race([
      llm.invoke(prompt),
      timeoutPromise
    ]);
  }

  /**
   * Build enhanced prompt with context
   */
  buildPrompt(message, memoryContext, options) {
    let prompt = '';
    
    // Add system context if provided
    if (options.systemPrompt) {
      prompt += `${options.systemPrompt}\n\n`;
    }
    
    // Add memory context
    if (memoryContext) {
      prompt += `${memoryContext}\n\n`;
    }

    // Add conversation history if requested
    if (options.includeHistory && this.conversationHistory.length > 0) {
      prompt += "Recent conversation history:\n";
      this.conversationHistory.slice(-5).forEach(msg => {
        prompt += `${msg.role}: ${msg.content}\n`;
      });
      prompt += "\n";
    }

    prompt += `User: ${message}\n\nAssistant:`;

    return prompt;
  }

  /**
   * Update analytics
   */
  updateAnalytics(tokensUsed, responseTime) {
    this.analytics.totalMessages++;
    this.analytics.totalTokens += tokensUsed || 0;
    this.analytics.averageResponseTime = 
      (this.analytics.averageResponseTime * (this.analytics.totalMessages - 1) + responseTime) / 
      this.analytics.totalMessages;
  }

  /**
   * Enhanced memory management methods
   */

  /**
   * Remember a fact manually
   * 
   * @param {string} fact - Fact to remember
   * @param {number} importance - Importance score
   * @param {string} category - Memory category
   * @param {Object} metadata - Additional metadata
   * @returns {Promise<string>} - Memory ID
   * 
   * @example
   * await agent.remember("User prefers meetings in the morning", 8, 'preference', {
   *   source: 'manual',
   *   confidence: 0.9
   * });
   */
  async remember(fact, importance = 1, category = MEMORY_TYPES.MANUAL, metadata = {}) {
    try {
      return await this.memory.storeFact(fact, importance, category, {
        ...metadata,
        source: 'manual',
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Error remembering fact:', error);
      throw error;
    }
  }

  /**
   * Get memories with filtering
   * 
   * @param {string} query - Search query
   * @param {number} limit - Maximum results
   * @param {Object} options - Search options
   * @returns {Promise<Array>} - Memories
   * 
   * @example
   * // Get all work-related memories
   * const workMemories = await agent.getMemories('', 20, { memoryType: 'work' });
   * 
   * // Search for meeting memories
   * const meetingMemories = await agent.getMemories('meeting', 10);
   */
  async getMemories(query = '', limit = 10, options = {}) {
    return await this.memory.recallRelevantMemories(query, limit, options);
  }

  /**
   * Force store summary of current conversation
   */
  async forceStoreSummary() {
    return await this.memory.summarizeAndStore();
  }

  /**
   * Health check for the agent
   * 
   * @returns {Promise<Object>} - Health status
   */
  async healthCheck() {
    try {
      const memoryMetrics = this.memory.getMetrics();
      const rateLimitStatus = this.checkRateLimit('health-check', 1, 1000);
      
      return {
        status: 'healthy',
        memory: memoryMetrics,
        rateLimit: rateLimitStatus,
        analytics: this.analytics,
        sessionId: this.sessionId,
        uptime: Date.now() - this.analytics.sessionStartTime,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Get analytics and performance metrics
   */
  getAnalytics() {
    return {
      ...this.analytics,
      memory: this.memory.getMetrics(),
      sessionId: this.sessionId,
      uptime: Date.now() - this.analytics.sessionStartTime
    };
  }

  /**
   * Reset session and clear conversation history
   */
  resetSession() {
    this.sessionId = this.generateSessionId();
    this.conversationHistory = [];
    this.analytics.sessionStartTime = Date.now();
  }
}

/**
 * Database schema for memory system
 * 
 * @param {Object} db - Database instance
 * @returns {Object} - Schema definition
 */
function createMemorySchema(db) {
  return {
    user_memories: {
      id: 'uuid',
      user_id: 'string',
      memory_type: 'string',
      content: 'text',
      importance: 'number',
      access_count: 'number',
      metadata: 'jsonb',
      created_at: 'timestamp',
      updated_at: 'timestamp'
    }
  };
}

// Export all components
export { 
  SimpleMemory, 
  MemoryAgent, 
  createMemorySchema, 
  MEMORY_CONFIG,
  MEMORY_TYPES
};