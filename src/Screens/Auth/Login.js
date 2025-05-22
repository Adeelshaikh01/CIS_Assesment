import React from 'react';
import {View, TextInput, Button, StyleSheet, Text, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {getAuth, signInWithEmailAndPassword} from '@react-native-firebase/auth';

const Login = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = async data => {
    const {email, password} = data;

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Login Successful');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        Alert.alert('No user found for that email.');
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Incorrect password.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Invalid email address.');
      } else {
        Alert.alert('Login Error', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Controller
        control={control}
        name="email"
        rules={{required: 'Email is required'}}
        render={({field: {onChange, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        rules={{required: 'Password is required'}}
        render={({field: {onChange, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      <View style={{gap: 10}}>
        <Button title="Login" onPress={handleSubmit(onSubmit)} />
        <Button
          title="Register"
          onPress={() => navigation.navigate('Signup')}
        />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  error: {
    color: 'red',
    marginBottom: 12,
    marginLeft: 4,
  },
});
