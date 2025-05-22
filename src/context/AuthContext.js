import React, {createContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);

  const refreshUser = async () => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      await currentUser.reload();
      setUser(auth().currentUser);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async currentUser => {
      if (currentUser) {
        await currentUser.reload();
        setUser(auth().currentUser);
      } else {
        setUser(null);
      }
      if (initializing) setInitializing(false);
    });
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <AuthContext.Provider value={{user, setUser, refreshUser}}>
      {children}
    </AuthContext.Provider>
  );
};
