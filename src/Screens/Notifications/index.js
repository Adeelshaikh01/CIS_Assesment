import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Notification = () => {
  return (
    <View>
      <Text style={styles.heading}>Notification Screen</Text>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
