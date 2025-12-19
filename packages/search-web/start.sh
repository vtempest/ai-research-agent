#!/bin/bash

export PATH="/root/.bun/bin:${PATH}"

# Start the Bun server in the background with logging
echo "========================================="
echo "Starting Bun server on port 3000..."
echo "========================================="

cd /app

# Check if bun exists
BUN_PATH=$(which bun)
if [ -z "$BUN_PATH" ]; then
    echo "ERROR: Bun binary not found in PATH"
    echo "PATH: $PATH"
    ls -la /root/.bun/bin/ 2>/dev/null || echo "/root/.bun/bin/ does not exist"
else
    echo "Found bun at: $BUN_PATH"
fi

# Check if index.js exists
if [ ! -f /app/src/index.js ]; then
    echo "ERROR: /app/src/index.js not found"
    ls -la /app/src/ 2>/dev/null || echo "/app/src/ does not exist"
    ls -la /app/ 2>/dev/null || echo "/app/ does not exist"
else
    echo "Found index.js at /app/src/index.js"
fi

# Run bun with output logging
echo "Running: bun run /app/src/index.js"
bun run /app/src/index.js > /var/log/bun.log 2>&1 &
BUN_PID=$!

# Give Bun a moment to start
sleep 3

# Check if Bun is running
if kill -0 $BUN_PID 2>/dev/null; then
    echo "Bun server started successfully (PID: $BUN_PID)"
else
    echo "ERROR: Bun server failed to start. Log output:"
    cat /var/log/bun.log
fi

echo "========================================="
echo "Starting SearXNG uwsgi server on port 8080..."
echo "========================================="

# Start uwsgi (SearXNG) in the foreground
exec uwsgi --master --http-socket 0.0.0.0:8080 --module searx.webapp:application