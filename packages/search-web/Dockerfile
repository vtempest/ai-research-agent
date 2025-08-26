FROM docker.io/searxng/searxng:latest

# Copy settings
COPY searxng-settings.yml /etc/searxng/settings.yml

# Development environment variables
ENV SEARXNG_BASE_URL=http://localhost:8080
ENV UWSGI_WORKERS=1
ENV UWSGI_THREADS=1
ENV SEARXNG_DEBUG=1

# Expose port
EXPOSE 8080

# Keep it simple for development
USER searxng