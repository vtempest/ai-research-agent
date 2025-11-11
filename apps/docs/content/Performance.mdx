---
title: ⚡️ Performance Best Practices
---

## Best Practices

### 1. **Use Response Objects for UI State**

```javascript
let userProfile = { };
await grab('users/me', { response: userProfile });

// Direct assignment is supported but loses .isLoading status
let user = await grab('users/me');
```

### 2. **Configure Defaults Early**

```javascript
grab('', {
  setDefaults: true,
  baseURL: process.env.API_URL,
  timeout: 30,
  debug: process.env.NODE_ENV === 'development'
});
```

### 3. **Use Mocks for Development**

```javascript
if (process.env.NODE_ENV === 'development') {
  grab.mock = {
    'users/me': { response: mockUser },
    'posts': { response: mockPosts },
    'settings': { response: mockSettings }
  };
}
```

### 4. **Handle Loading States**

```javascript
{state.isLoading ? (
  <LoadingSpinner />
) : state.error ? (
  <ErrorMessage error={state.error} />
) : (
  <DataComponent data={state.data} />
)}
```

### 5. **Use Rate Limiting for User Interactions**

```javascript
await grab('save-data', {
  post: true,
  rateLimit: 2, // 2 seconds between saves
  data: formData
});
```

### 6. **Development vs Production**

```javascript
// config.js
const isDevelopment = process.env.NODE_ENV === 'development';

// Configure GRAB for different environments
grab('', {
  setDefaults: true,
  baseURL: isDevelopment 
    ? 'http://localhost:3001/api'
    : 'https://api.myapp.com/v1',
  debug: isDevelopment,
  timeout: isDevelopment ? 60 : 30,
  cache: !isDevelopment,
  retryAttempts: isDevelopment ? 0 : 2
});
```

### Common Issues

1. **Request not updating UI**: Make sure to use the `response` parameter and trigger re-renders in your framework.

2. **CORS errors**: Configure your server's CORS policy or use a proxy in development.

3. **Rate limiting too aggressive**: Adjust the `rateLimit` value or disable it for testing.

4. **Mocks not working**: Ensure the mock path exactly matches the request path.

5. **TypeScript errors**: Add proper type definitions or use `any` for rapid prototyping.

