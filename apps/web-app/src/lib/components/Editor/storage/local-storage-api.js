import { writable, derived, get } from 'svelte/store';

/**
 * 
 * Exports:
 * savedDocuments
 * documentIndex
 * listDocuments
 * getDocument
 * updateDocument
 * deleteDocument
 * getDocumentIndex
 * setDocumentIndex
 */

// Configuration option
const OPTION_USE_LOCALSTORAGE = true; // Set this to false to use chrome.storage.local

// Create writable stores
const savedDocumentsMut = writable({});
const documentIndexMut = writable([]);

// Export read-only versions of the stores
export const savedDocuments = derived(savedDocumentsMut, value => value);
export const documentIndex = derived(documentIndexMut, value => value);

// Constants
const MAX_SAVED_DOCUMENTS = 100;
const DOCUMENTS_STORAGE_KEY = 'savedDocuments';
const INDEX_STORAGE_KEY = 'documentIndex';

// Storage wrapper
const storage = {
  get: async (keys) => {
    if (OPTION_USE_LOCALSTORAGE && typeof localStorage !== 'undefined' && localStorage) {
      const result = {};
      keys.forEach(key => {
        const item = localStorage.getItem(key);
        if (item !== null) {
          result[key] = JSON.parse(item);
        }
      });
      return result;
    } else if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      return new Promise((resolve) => {
        chrome.storage.local.get(keys, resolve);
      });
    } else {
      console.warn('No storage mechanism available');
      return {};
    }
  },
  set: async (items) => {
    if (OPTION_USE_LOCALSTORAGE && typeof localStorage !== 'undefined' && localStorage) {
      Object.entries(items).forEach(([key, value]) => {
        localStorage.setItem(key, JSON.stringify(value));
      });
    } else if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      return new Promise((resolve) => {
        chrome.storage.local.set(items, resolve);
      });
    } else {
      console.warn('No storage mechanism available');
    }
  }
};

// Initialize the stores
(async () => {
  const result = await storage.get([DOCUMENTS_STORAGE_KEY, INDEX_STORAGE_KEY]);
  const storedDocuments = result[DOCUMENTS_STORAGE_KEY] || {};
  const storedIndex = result[INDEX_STORAGE_KEY] || [];
  savedDocumentsMut.set(storedDocuments);
  documentIndexMut.set(storedIndex);
})();

// Helper function to generate a new document key
function newDocumentKey() {
  return `doc:${crypto.randomUUID()}`;
}

// Function to save a document and update the index
export async function saveDocument(document, parentId = null) {
  const documents = get(savedDocumentsMut);
  const index = get(documentIndexMut);
  const key = newDocumentKey();
  const newDocument = {
    ...document,
    lastModified: new Date().toISOString()
  };

  const updatedDocuments = {
    ...documents,
    [key]: newDocument
  };

  // Remove oldest document if limit is exceeded
  const documentKeys = Object.keys(updatedDocuments);
  if (documentKeys.length > MAX_SAVED_DOCUMENTS) {
    const oldestKey = documentKeys.reduce((a, b) => 
      updatedDocuments[a].lastModified < updatedDocuments[b].lastModified ? a : b
    );
    delete updatedDocuments[oldestKey];
    // Also remove from index
    const indexToRemove = index.findIndex(item => item.id === oldestKey);
    if (indexToRemove !== -1) {
      index.splice(indexToRemove, 1);
    }
  }

  // Add to index
  const newIndexItem = {
    id: key,
    name: document.title,
    type: 'text', // Default to text, you might want to determine this based on the document content
    parentId: parentId
  };
  const updatedIndex = [...index, newIndexItem];

  await storage.set({ 
    [DOCUMENTS_STORAGE_KEY]: updatedDocuments,
    [INDEX_STORAGE_KEY]: updatedIndex
  });
  savedDocumentsMut.set(updatedDocuments);
  documentIndexMut.set(updatedIndex);

  return key;
}

// Function to retrieve a document
export async function getDocument(key) {
  const documents = get(savedDocumentsMut);
  return documents[key] || null;
}

// Function to update a document and its index entry
export async function updateDocument(key, updates) {
  const documents = get(savedDocumentsMut);
  const index = get(documentIndexMut);
  if (!documents[key]) {
    throw new Error(`Document with key ${key} not found`);
  }

  const updatedDocument = {
    ...documents[key],
    ...updates,
    lastModified: new Date().toISOString()
  };

  const updatedDocuments = {
    ...documents,
    [key]: updatedDocument
  };

  // Update index if title changed
  let updatedIndex = [...index];
  if (updates.title) {
    updatedIndex = updatedIndex.map(item => 
      item.id === key ? { ...item, name: updates.title } : item
    );
  }

  await storage.set({ 
    [DOCUMENTS_STORAGE_KEY]: updatedDocuments,
    [INDEX_STORAGE_KEY]: updatedIndex
  });
  savedDocumentsMut.set(updatedDocuments);
  documentIndexMut.set(updatedIndex);
}

// Function to delete a document and its index entry
export async function deleteDocument(key) {
  const documents = get(savedDocumentsMut);
  const index = get(documentIndexMut);
  if (!documents[key]) {
    throw new Error(`Document with key ${key} not found`);
  }

  const { [key]: _, ...updatedDocuments } = documents;
  const updatedIndex = index.filter(item => item.id !== key);

  await storage.set({ 
    [DOCUMENTS_STORAGE_KEY]: updatedDocuments,
    [INDEX_STORAGE_KEY]: updatedIndex
  });
  savedDocumentsMut.set(updatedDocuments);
  documentIndexMut.set(updatedIndex);
}

// Function to list all documents
export function listDocuments() {
  return get(savedDocuments);
}

// Function to get the document index
export function getDocumentIndex() {
  return get(documentIndex);
}

// Function to add a folder to the index
export async function addFolder(name, parentId = null) {
  const index = get(documentIndexMut);
  const newFolder = {
    id: `folder:${crypto.randomUUID()}`,
    name,
    type: 'folder',
    parentId,
    expanded: false
  };
  const updatedIndex = [...index, newFolder];

  await storage.set({ [INDEX_STORAGE_KEY]: updatedIndex });
  documentIndexMut.set(updatedIndex);

  return newFolder.id;
}

// Function to update a folder in the index
export async function updateFolder(id, updates) {
  const index = get(documentIndexMut);
  const updatedIndex = index.map(item => 
    item.id === id ? { ...item, ...updates } : item
  );

  await storage.set({ [INDEX_STORAGE_KEY]: updatedIndex });
  documentIndexMut.set(updatedIndex);
}

// Function to delete a folder and its contents from the index
export async function deleteFolder(id) {
  const index = get(documentIndexMut);
  const updatedIndex = index.filter(item => item.id !== id && item.parentId !== id);

  await storage.set({ [INDEX_STORAGE_KEY]: updatedIndex });
  documentIndexMut.set(updatedIndex);

  // Note: This doesn't delete the actual documents. You might want to implement that separately.
}

// Set up storage change listener
if (!OPTION_USE_LOCALSTORAGE && typeof chrome !== 'undefined' && chrome.storage) {
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'local') {
      if (changes[DOCUMENTS_STORAGE_KEY]) {
        savedDocumentsMut.set(changes[DOCUMENTS_STORAGE_KEY].newValue);
      }
      if (changes[INDEX_STORAGE_KEY]) {
        documentIndexMut.set(changes[INDEX_STORAGE_KEY].newValue);
      }
    }
  });
} else if (OPTION_USE_LOCALSTORAGE && typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key === DOCUMENTS_STORAGE_KEY) {
      savedDocumentsMut.set(JSON.parse(event.newValue || '{}'));
    } else if (event.key === INDEX_STORAGE_KEY) {
      documentIndexMut.set(JSON.parse(event.newValue || '[]'));
    }
  });
}