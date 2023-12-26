import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.Practi',
  appName: 'Practi',
  webDir: 'build',
  server: {
    androidScheme: 'https',  // Update to 'http'
    hostname:  'practi-web.onrender.com/app',  // Replace with your computer's IP address
    androidPort: 5000, // Add this line with your desired port
    iosScheme: 'https',  // Update to 'http' if needed for iOS
  }
};

export default config;
