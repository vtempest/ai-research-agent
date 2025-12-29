# Simplified Single Dockerfile for SearXNG
# Based on Alpine Linux

ARG ALPINE_VERSION=3.21

###########################################################################
# Stage 1: Builder - Install build dependencies and compile
###########################################################################
FROM docker.io/library/alpine:${ALPINE_VERSION} AS builder

RUN apk add --no-cache \
    python3 \
    python3-dev \
    py3-pip \
    gcc \
    musl-dev \
    libffi-dev \
    libxml2-dev \
    libxslt-dev \
    openssl-dev \
    brotli \
    ca-certificates \
    tzdata

# Install uv for fast Python package management
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

WORKDIR /usr/local/searxng/

COPY ./requirements.txt ./requirements-server.txt ./

ENV UV_NO_MANAGED_PYTHON="true" \
    UV_NATIVE_TLS="true" \
    UV_SYSTEM_PYTHON="true"

ARG TIMESTAMP_VENV="0"

RUN --mount=type=cache,id=uv,target=/root/.cache/uv set -eux; \
    export SOURCE_DATE_EPOCH="$TIMESTAMP_VENV"; \
    uv venv; \
    uv pip install --requirements ./requirements.txt --requirements ./requirements-server.txt; \
    uv cache prune --ci; \
    find ./.venv/lib/ -type f -name "*.so" -exec strip --strip-unneeded {} + 2>/dev/null || true; \
    find ./.venv/lib/ -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true; \
    find ./.venv/lib/ -type f -name "*.pyc" -delete; \
    python3 -m compileall -q -f -j 0 --invalidation-mode=unchecked-hash ./.venv/lib/; \
    find ./.venv/lib/python*/site-packages/*.dist-info/ -type f -name "RECORD" -exec sort -t, -k1,1 -o {} {} \; 2>/dev/null || true; \
    find ./.venv/ -exec touch -h --date="@$TIMESTAMP_VENV" {} +

COPY --exclude=./searx/version_frozen.py ./searx/ ./searx/

ARG TIMESTAMP_SETTINGS="0"

RUN set -eux; \
    python3 -m compileall -q -f -j 0 --invalidation-mode=unchecked-hash ./searx/; \
    find ./searx/static/ -type f \
    \( -name "*.html" -o -name "*.css" -o -name "*.js" -o -name "*.svg" \) \
    -exec gzip -9 -k {} + \
    -exec brotli -9 -k {} + \
    -exec gzip --test {}.gz + \
    -exec brotli --test {}.br +; \
    touch -c --date="@$TIMESTAMP_SETTINGS" ./searx/settings.yml

###########################################################################
# Stage 2: Runtime - Minimal production image
###########################################################################
FROM docker.io/library/alpine:${ALPINE_VERSION} AS dist

RUN apk add --no-cache \
    python3 \
    libxml2 \
    libxslt \
    libffi \
    ca-certificates \
    tzdata \
    && rm -rf /var/cache/apk/*

# Create searxng user and group
RUN addgroup -g 977 -S searxng \
    && adduser -u 977 -S -G searxng -h /usr/local/searxng -s /bin/sh searxng

# Create required directories
RUN install -dm0755 -o searxng -g searxng /etc/searxng \
    && install -dm0755 -o searxng -g searxng /var/cache/searxng

ENV PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin" \
    SSL_CERT_DIR="/etc/ssl/certs" \
    SSL_CERT_FILE="/etc/ssl/certs/ca-certificates.crt" \
    HISTFILE="/dev/null" \
    CONFIG_PATH="/etc/searxng" \
    DATA_PATH="/var/cache/searxng"

WORKDIR /usr/local/searxng/

# Copy built artifacts from builder
COPY --chown=977:977 --from=builder /usr/local/searxng/.venv/ ./.venv/
COPY --chown=977:977 --from=builder /usr/local/searxng/searx/ ./searx/

# Copy container scripts and frozen version
COPY --chown=977:977 ./container/ ./
COPY --chown=977:977 ./searx/version_frozen.py ./searx/

# Build arguments for labels
ARG CREATED="0001-01-01T00:00:00Z"
ARG VERSION="unknown"
ARG VCS_URL="unknown"
ARG VCS_REVISION="unknown"

LABEL org.opencontainers.image.created="$CREATED" \
    org.opencontainers.image.description="SearXNG is a metasearch engine. Users are neither tracked nor profiled." \
    org.opencontainers.image.documentation="https://docs.searxng.org/admin/installation-docker" \
    org.opencontainers.image.licenses="AGPL-3.0-or-later" \
    org.opencontainers.image.revision="$VCS_REVISION" \
    org.opencontainers.image.source="$VCS_URL" \
    org.opencontainers.image.title="SearXNG" \
    org.opencontainers.image.url="https://searxng.org" \
    org.opencontainers.image.version="$VERSION"

ENV SEARXNG_VERSION="$VERSION" \
    SEARXNG_SETTINGS_PATH="$CONFIG_PATH/settings.yml" \
    GRANIAN_PROCESS_NAME="searxng" \
    GRANIAN_INTERFACE="wsgi" \
    GRANIAN_HOST="::" \
    GRANIAN_PORT="8080" \
    GRANIAN_WEBSOCKETS="false" \
    GRANIAN_BLOCKING_THREADS="4" \
    GRANIAN_WORKERS_KILL_TIMEOUT="30s" \
    GRANIAN_BLOCKING_THREADS_IDLE_TIMEOUT="5m"

VOLUME $CONFIG_PATH
VOLUME $DATA_PATH

EXPOSE 8080

ENTRYPOINT ["/usr/local/searxng/entrypoint.sh"]