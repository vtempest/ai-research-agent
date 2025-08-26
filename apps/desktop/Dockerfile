FROM ubuntu:24.04

# Prevent interactive prompts during installation
ENV DEBIAN_FRONTEND=noninteractive

# Set up timezone (prevents tzdata interactive prompts)
RUN ln -fs /usr/share/zoneinfo/Etc/UTC /etc/localtime

# Install dependencies for Tauri
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    gnupg \
    software-properties-common \
    build-essential \
    libssl-dev \
    libgtk-3-dev \
    libwebkit2gtk-4.1-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev \
    patchelf \
    libx11-dev \
    libxdo-dev \
    libxcb-shape0-dev \
    libxcb-xfixes0-dev \
    libasound2-dev \
    libxkbcommon-dev \
    pkg-config \
    git \
    cmake \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js v20.x
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Rust
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:${PATH}"

# Set up working directory
WORKDIR /app

# Create a non-root user for better security
RUN useradd -m tauri -d /home/tauri
RUN chown -R tauri:tauri /app

# Copy project files
COPY --chown=tauri:tauri . .

# Switch to non-root user
USER tauri

# Install dependencies
RUN bun install

# Build the app
CMD ["bunx", "tauri", "build"]