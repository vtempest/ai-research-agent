[Documentation](modules.md) / hooks.server

## allowCORSAccessAPI

```ts
const allowCORSAccessAPI: Handle;
```

Defined in: apps/web-app/src/hooks.server.ts:23

Enable API access for users with valid API keys and allow CORS.

### Param

RequestEvent, resolve: Function

### Returns

- The resolved response

***

## handle

```ts
const handle: Handle;
```

Defined in: apps/web-app/src/hooks.server.ts:95

export const handleError = ({ status, message, error }) => {
  if (status !== 404) {
    console.log(error);
  }
  if (status === 404) {
    throw redirect(302, '/');
  }
  // do not return sensitive data here as it will be sent to the client
  return { message };
};
