import {createStackNavigator} from '@react-navigation/stack';
import Login from '../Screens/Auth/Login';
import Signup from '../Screens/Auth/Signup';
import Profile from '../Screens/Profile';
import {useContext, useEffect} from 'react';
import {AuthContext} from '../context/AuthContext';
import ChatScreen from '../Screens/Chat';
import ReelsScreen from '../Screens/Reels';
import Notification from '../Screens/Notifications';
import NotificationService, {navigate} from '../service/notificationService';
import notifee from '@notifee/react-native';
import {Alert} from 'react-native';

const Stack = createStackNavigator();

function RootStack() {
  const {user} = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      await NotificationService.createDefaultChannel();
      await NotificationService.getFcmToken();
      notifee.onForegroundEvent(({}) => {
        navigate('Notification');
      });
    })();
  }, []);

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen
            options={{headerShown: false}}
            name="ReelsScreen"
            component={ReelsScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default RootStack;
