import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lifeguide.app',
  appName: 'LifeGuide',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
