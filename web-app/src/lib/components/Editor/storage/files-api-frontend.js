/**
 * API connection models - either local storage or remote API
 * 
 * // list of exported function names
 * - updateUserFileIndex
 * - getUserFileIndex
 * - deleteFile
 * - createFile
 * - updateFile
 * - getUserSettings
 * - updateUserSettings
 * 
 * 
 * - fetchData
 * - fetchFromAPI
 * - getFromLocalStorage
 * - saveToLocalStorage
 * - removeFromLocalStorage
 * - clearLocalStorage
 */

const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API base URL

// New functions for file operations

export async function updateFile(fileId, updates, useLocalStorage = true) {
  updates.lastUpdated = new Date().toISOString();
  if (useLocalStorage) {
    const files = getFromLocalStorage('files') || [];
    const fileIndex = files.findIndex(f => f.id === fileId);
    if (fileIndex !== -1) {
      files[fileIndex] = { ...files[fileIndex], ...updates };
      saveToLocalStorage('files', files);
      return files[fileIndex];
    }
    throw new Error('File not found');
  } else {
    return fetchFromAPI(`/files/${fileId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
  }
}



export async function getUserSettings(userId, useLocalStorage = true) {
    if (useLocalStorage) {
      const settings = getFromLocalStorage(`userSettings_${userId}`);
      return settings || {};
    } else {
      return fetchFromAPI(`/users/${userId}/settings`);
    }
  }
  
  export async function updateUserSettings(userId, newSettings, useLocalStorage = true) {
    if (useLocalStorage) {
      const currentSettings = await getUserSettings(userId, true);
      const updatedSettings = { ...currentSettings, ...newSettings };
      saveToLocalStorage(`userSettings_${userId}`, updatedSettings);
      return updatedSettings;
    } else {
      return fetchFromAPI(`/users/${userId}/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings)
      });
    }
  }
  
  // User File Index functions
  
  export async function getUserFileIndex(userId,useLocalStorage = false) {
    if (useLocalStorage) {
      const index = getFromLocalStorage(`userFileIndex_${userId}`);
      return index || [];
    } else {
      return fetchFromAPI(`/users/${userId}/files`);
    }
  }
  
  export async function updateUserFileIndex(userId, fileId, action, useLocalStorage = true) {
    if (useLocalStorage) {
      const currentIndex = await getUserFileIndex(userId, true);
      let updatedIndex;
  
      if (action === 'add') {
        updatedIndex = [...currentIndex, fileId];
      } else if (action === 'remove') {
        updatedIndex = currentIndex.filter(id => id !== fileId);
      } else {
        throw new Error('Invalid action. Use "add" or "remove".');
      }
  
      saveToLocalStorage(`userFileIndex_${userId}`, updatedIndex);
      return updatedIndex;
    } else {
      return fetchFromAPI(`/users/${userId}/files`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, fileId })
      });
    }
  }
  
  // Updated file functions to maintain user file index
  
  export async function createFile(file, userId, useLocalStorage = true) {
    file.lastUpdated = new Date().toISOString();
    let createdFile;
  
    if (useLocalStorage) {
      const files = getFromLocalStorage('files') || [];
      file.id = Date.now().toString(); // Simple ID generation
      files.push(file);
      saveToLocalStorage('files', files);
      createdFile = file;
    } else {
      createdFile = await fetchFromAPI('/files', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(file)
      });
    }
  
    // Update user's file index
    await updateUserFileIndex(userId, createdFile.id, 'add', useLocalStorage);
    return createdFile;
  }
  
  export async function deleteFile(fileId, userId, useLocalStorage = true) {
    if (useLocalStorage) {
      const files = getFromLocalStorage('files') || [];
      const updatedFiles = files.filter(f => f.id !== fileId);
      saveToLocalStorage('files', updatedFiles);
    } else {
      await fetchFromAPI(`/files/${fileId}`, {
        method: 'DELETE'
      });
    }
  
    // Update user's file index
    await updateUserFileIndex(userId, fileId, 'remove', useLocalStorage);
    return { success: true };
  }



/*** BASE API FUNCTIONS */

  
export async function fetchData(endpoint, useLocalStorage = true) {
    if (useLocalStorage) {
      return getFromLocalStorage(endpoint);
    } else {
      return fetchFromAPI(endpoint);
    }
  }
  

async function fetchFromAPI(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
/**

async function getFromChromeStorage(key) {
  try {
    const result = await storage.local.get(key);
    return result[key] || null;
  } catch (error) {
    console.error('Chrome storage get error:', error);
    return null;
  }
}

async function saveToChromeStorage(key, data) {
  try {
    await storage.local.set({ [key]: data });
  } catch (error) {
    console.error('Chrome storage set error:', error);
  }
}

async function removeFromChromeStorage(key) {
  try {
    await storage.local.remove(key);  
  } catch (error) {
    console.error('Chrome storage remove error:', error);
  }
}

async function clearChromeStorage() {
  try {
    await storage.local.clear();
  } catch (error) {
    console.error('Chrome storage clear error:', error);
  }
} */

export {
  fetchFromAPI
};
  
  function getFromLocalStorage(key) {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  }
  
  export function saveToLocalStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('localStorage error:', error);
    }
  }
  
  export function removeFromLocalStorage(key) {
    localStorage.removeItem(key);
  }
  
  export function clearLocalStorage() {
    localStorage.clear();
  }
  