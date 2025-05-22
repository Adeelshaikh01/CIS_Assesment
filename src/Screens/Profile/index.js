import {StyleSheet, Text, View, Image, Button} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';
import {getAuth, signOut} from '@react-native-firebase/auth';

const Profile = ({navigation}) => {
  const {user} = useContext(AuthContext);

  const name = user?.displayName || 'No Name';
  const email = user?.email || 'No Email';

  return (
    <View style={styles.container}>
      <Image
        source={{uri: 'https://i.pravatar.cc/150?img=3'}}
        style={styles.avatar}
      />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
      <View style={{gap: 10}}>
        <Button
          title="Chat"
          onPress={() => navigation.navigate('ChatScreen')}
        />
        <Button
          title="Reels"
          onPress={() => navigation.navigate('ReelsScreen')}
        />
        <Button title="Logout" onPress={() => signOut(getAuth())} />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#555',
  },
});
