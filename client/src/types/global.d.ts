// Add global property typings for development settings
interface Window {
  __DEV_MODE__?: boolean;
  __BYPASS_AUTH__?: boolean;
  __UNLOCK_ALL_REALMS__?: boolean;
}

export {};