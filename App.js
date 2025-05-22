import './gesture-handler';
import React from 'react';
import RootStack from './src/RootStack';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './src/context/AuthContext';
import {navigationRef} from './src/service/notificationService';

function App() {
  return (
    <AuthProvider>
      <NavigationContainer ref={navigationRef}>
        <RootStack />
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
