import {
  updateUserFileIndex,
  getUserFileIndex,
  deleteFile,
  createFile,
  updateFile,
  getUserSettings,
  updateUserSettings
} from './files-api-frontend'; // Adjust the import path as necessary

// Function to seed localStorage with mock data
function seedMockData() {
  // Mock file index data
  const mockFileIndex = [
    {
      id: 'file1',
      name: 'Introduction to AI',
      type: 'document',
      createdAt: '2023-07-01T10:00:00Z',
      updatedAt: '2023-07-05T14:30:00Z',
      size: 1024,
      path: '/documents/ai/'
    },
    {
      id: 'file2',
      name: 'Machine Learning Basics',
      type: 'document',
      createdAt: '2023-07-02T09:15:00Z',
      updatedAt: '2023-07-06T11:45:00Z',
      size: 2048,
      path: '/documents/ml/'
    },
    {
      id: 'file3',
      name: 'Neural Networks Overview',
      type: 'document',
      createdAt: '2023-07-03T13:20:00Z',
      updatedAt: '2023-07-07T16:10:00Z',
      size: 1536,
      path: '/documents/nn/'
    }
  ];

  // Seed file index
  updateUserFileIndex(mockFileIndex, 'user123', false, true);

  // Create mock files
  createFile('file1', 'Artificial Intelligence (AI) is the simulation of human intelligence processes by machines, especially computer systems.', true)
  createFile('file2', 'Machine Learning is a subset of AI that provides systems the ability to automatically learn and improve from experience.', true)
  createFile('file3', 'Neural Networks are a set of algorithms, modeled loosely after the human brain, that are designed to recognize patterns.', true);

  // Mock user settings
  const mockUserSettings = {
    userId: 'user123',
    theme: 'dark',
    fontSize: 14,
    language: 'en',
    notifications: {
      email: true,
      push: false
    }
  };

  // Seed user settings
  updateUserSettings(mockUserSettings);

  console.log('Mock data seeded successfully!');
}

// Function to verify seeded data
function verifySeededData() {
  console.log('File Index:', getUserFileIndex());
  console.log('User Settings:', getUserSettings());
}
// Example of how to use these functions in your application
export function seedMockExample() {
  // Get the current file index
    

    // Run the seeding process
    seedMockData();
    verifySeededData();
}
