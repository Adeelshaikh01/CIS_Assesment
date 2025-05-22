import notifee, {AndroidImportance} from '@notifee/react-native';
import {getApp} from '@react-native-firebase/app';
import {
  getMessaging,
  getToken,
  requestPermission,
} from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from 'react-native';

class NotificationService {
  static app = getApp();
  static messaging = getMessaging(NotificationService.app);

  static async requestPermission() {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Android notification permission denied');
        return false;
      }
    }

    const authStatus = await requestPermission();
    return authStatus === 1 || authStatus === 2;
  }

  static async createDefaultChannel() {
    if (Platform.OS === 'android') {
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });
    }
  }

  static async display(title, body) {
    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId: 'default',
        pressAction: {id: 'default'},
      },
    });
  }

  static async getFcmToken() {
    const permissionGranted = await NotificationService.requestPermission();
    if (!permissionGranted) return null;

    const token = await getToken(NotificationService.messaging);
    console.log('FCM Token:', token);
    return token;
  }
}

export default NotificationService;

import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
