
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.Practi',
  appName: 'Practi',
  webDir: 'build',
  server: {
    androidScheme: 'https',
    hostname: 'practi-web.onrender.com/app',
    androidPort: 5000,
    iosScheme: 'https',
  },
  cordova: {
    preferences: {
      Fullscreen: 'true',
      'AndroidLaunchMode': 'singleTask', // Add this line
    },
    android: {
      debug: {
        keystore: {
          path: '/mnt/c/Users/yuval/Documents/GitHub/practi-BasketBall/practi-front/my-release-key.keystore',
          password: 'nitay511',
          keyAlias: 'my-key-alias',
          keyPassword: 'nitay511',
        },
      },
      release: {
        keystore: {
          path: '/mnt/c/Users/yuval/Documents/GitHub/practi-BasketBall/practi-front/my-release-key.keystore',
          password: 'nitay511',
          keyAlias: 'my-key-alias',
          keyPassword: 'nitay511',
        },
      },
    },
  },
};

export default config;
