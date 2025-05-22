import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const ChatScreen = ({route}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const currentUserId = auth().currentUser.uid;
  const chatId = 'chatId';

  const messagesRef = firestore()
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .orderBy('timestamp', 'asc');

  useEffect(() => {
    const unsubscribe = messagesRef.onSnapshot(snapshot => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
    });

    return unsubscribe;
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    await firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .add({
        text: input,
        senderId: currentUserId,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });

    setInput('');
  };

  const renderItem = ({item}) => {
    const isCurrentUser = item.senderId === currentUserId;
    return (
      <View
        style={[
          styles.message,
          isCurrentUser ? styles.myMessage : styles.otherMessage,
        ]}>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{padding: 10}}
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type a message"
          value={input}
          onChangeText={setInput}
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={{color: 'white'}}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  message: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: '75%',
  },
  myMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#eee',
    alignSelf: 'flex-start',
  },
  text: {fontSize: 16},
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
  },
});
