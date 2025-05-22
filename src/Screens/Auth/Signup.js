import React, {useContext} from 'react';
import {View, TextInput, Button, StyleSheet, Text, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from '@react-native-firebase/auth';
import {AuthContext} from '../../context/AuthContext';

const Signup = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const {refreshUser} = useContext(AuthContext);

  const onSubmit = async data => {
    try {
      const userCredential = await getAuth().createUserWithEmailAndPassword(
        data.email,
        data.password,
      );
      await userCredential.user.updateProfile({displayName: data.username});
      await refreshUser();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      {/* Username Field */}
      <Controller
        control={control}
        name="username"
        rules={{required: 'Username is required'}}
        render={({field: {onChange, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.username && (
        <Text style={styles.error}>{errors.username.message}</Text>
      )}

      {/* Email Field */}
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

      {/* Password Field */}
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
        <Button title="Sign Up" onPress={handleSubmit(onSubmit)} />
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
  );
};

export default Signup;

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
