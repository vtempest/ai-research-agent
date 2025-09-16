import { 
    SimpleMemory, 
    MemoryAgent, 
    createMemorySchema, 
    MEMORY_CONFIG,
    MEMORY_TYPES
  } from "../src/agents/memory.js";


/**
 * Comprehensive usage example with error handling
 * 
 * @param {Object} db - Database connection
 * @returns {Promise<void>}
 */
async function exampleUsage(db) {
    console.log('🚀 Starting Memory Agent Example...\n');
  
    try {
      // Create agent with comprehensive configuration
      const agent = new MemoryAgent('user123', db, {
        defaultProvider: 'groq',
        defaultApiKey: process.env.GROQ_API_KEY,
        defaultModel: 'mixtral-8x7b-32768',
        memoryOptions: {
          maxMemories: 100,
          summaryThreshold: 8,
          cacheExpiry: 10 * 60 * 1000, // 10 minutes
          enableVectorSearch: true,
          enableAutoSummarization: true
        },
        rateLimit: {
          requests: 20,
          windowMs: 60000 // 1 minute
        }
      });
  
      // Health check
      console.log('📊 Performing health check...');
      const health = await agent.healthCheck();
      console.log('System health:', health.status);
      console.log('Memory metrics:', health.memory);
  
      // Initial conversation
      console.log('\n💬 Starting conversation...');
      let response = await agent.chat("Hi, I'm John and I work as a software engineer at Google in San Francisco. I prefer working remotely and I'm interested in AI and machine learning.");
      
      if (response.success) {
        console.log('✅ Response:', response.content);
        console.log('📝 Memory context used:', response.memoryContext ? 'Yes' : 'No');
        console.log('🔢 Tokens used:', response.tokensUsed);
      } else {
        console.error('❌ Chat failed:', response.error);
      }
  
      // Remember specific facts manually
      console.log('\n🧠 Storing specific facts...');
      await agent.remember("John is allergic to peanuts", 9, 'personal', { 
        source: 'conversation',
        confidence: 0.95 
      });
      await agent.remember("John prefers dark mode for coding", 7, 'preference', { 
        source: 'observation' 
      });
  
      // Continue conversation - agent should remember
      console.log('\n💬 Continuing conversation...');
      response = await agent.chat("What do you remember about my job, location, and preferences?");
      
      if (response.success) {
        console.log('✅ Response:', response.content);
      }
  
      // Search for specific memories
      console.log('\n🔍 Searching for work-related memories...');
      const workMemories = await agent.getMemories('work', 5, { 
        memoryType: 'work',
        minImportance: 5 
      });
      console.log('Found work memories:', workMemories.length);
  
      // Search for preference memories
      console.log('\n🔍 Searching for preference memories...');
      const preferenceMemories = await agent.getMemories('preference', 5, { 
        memoryType: 'preference' 
      });
      console.log('Found preference memories:', preferenceMemories.length);
  
      // Get analytics
      console.log('\n📈 Getting analytics...');
      const analytics = agent.getAnalytics();
      console.log('Total messages:', analytics.totalMessages);
      console.log('Total tokens:', analytics.totalTokens);
      console.log('Average response time:', analytics.averageResponseTime.toFixed(2), 'ms');
  
      // Force summarization
      console.log('\n📝 Forcing conversation summarization...');
      await agent.forceStoreSummary();
  
  
      // Final health check
      console.log('\n📊 Final health check...');
      const finalHealth = await agent.healthCheck();
      console.log('Final status:', finalHealth.status);
      console.log('Memory cache size:', finalHealth.memory.cacheSize);
  
      console.log('\n✅ Example completed successfully!');
  
    } catch (error) {
      console.error('❌ Example usage failed:', error);
    }
  }
  