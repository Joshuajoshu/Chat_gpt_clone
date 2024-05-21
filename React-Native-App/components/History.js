import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const History = () => {
    const [chatHistory, setChatHistory] = useState([]);
    const [username, setUsername] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const fetchHistory = async () => {
          const storedUsername = await AsyncStorage.getItem('username');
          if (storedUsername) {
            setUsername(storedUsername);
            setLoggedIn(true);
            fetchChatHistory(storedUsername);
          } else {
            setChatHistory([]); // Clear chat history when user logs out
            setLoggedIn(false);
          }
        };
    
        fetchHistory(); // Initial fetch when component mounts
    
        const interval = setInterval(fetchHistory, 1000); // Refresh every 1 second
    
        return () => clearInterval(interval);
      }, []);
    
      const fetchChatHistory = async (username) => {
        const response = await fetch(`http://192.168.0.6:5000/chat_history?username=${username}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          const reversedChatHistory = data.reverse();
          setChatHistory(reversedChatHistory);
        } else {
          console.error('Unexpected response format:', data);
        }
      };
    
      if (!loggedIn) {
        return null; // Don't render anything if the user is not logged in
      }
    
      return (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            {chatHistory.map((chat, index) => (
              <View key={index} style={styles.outputContainer}>
                <Text>You: {chat.Prompt}</Text>
                <Text>Bot: {chat.Response}</Text>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
      width: '100%',
    },
    outputContainer: {
      marginBottom: 20,
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
    },
    thumbnail: {
      width: 366,
      height: 250,
      marginTop: 10,
      marginBottom: 10,
    },
  });
  
export default History;



