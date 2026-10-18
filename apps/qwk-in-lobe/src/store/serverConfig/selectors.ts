import { type ServerConfigStore } from './store';

export const featureFlagsSelectors = (s: ServerConfigStore) => s.featureFlags;

export const serverConfigSelectors = {
  enableBusinessFeatures: (s: ServerConfigStore) => s.serverConfig.enableBusinessFeatures || false,
  enableComposio: (s: ServerConfigStore) => s.serverConfig.enableComposio || false,
  enableGatewayMode: (s: ServerConfigStore) => s.serverConfig.enableGatewayMode || false,
  enableLobehubSkill: (s: ServerConfigStore) => s.serverConfig.enableLobehubSkill || false,
  enableMarketTrustedClient: (s: ServerConfigStore) =>
    s.serverConfig.enableMarketTrustedClient || false,
  enableUploadFileToServer: (s: ServerConfigStore) => s.serverConfig.enableUploadFileToServer,
  enableMultimodalUnderstanding: (s: ServerConfigStore) =>
    s.serverConfig.enableMultimodalUnderstanding || false,
  enabledTelemetryChat: (s: ServerConfigStore) => s.serverConfig.telemetry.langfuse || false,
  isMobile: (s: ServerConfigStore) => s.isMobile || false,
  multimodalUnderstanding: (s: ServerConfigStore) => s.serverConfig.multimodalUnderstanding,
};
