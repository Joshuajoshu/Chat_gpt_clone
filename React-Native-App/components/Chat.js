import React, { useState } from 'react';
import { View, Text, SafeAreaView, Button, TextInput, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = () => {
    const [response, setResponse] = useState('');
    const [prompt, setPrompt] = useState('');

    const handleSummarize = async () => {
        try {
            const storedUsername = await AsyncStorage.getItem('username');
            if (storedUsername != null){
                const response = await fetch(`http://192.168.0.6:5000/Chatbot?username=${storedUsername}`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ prompt: prompt }),
                });
                const data = await response.json();
                if (data.error) {
                  Alert.alert('Error', data.error);
                } else {
                  setResponse(data.response);
                  setPrompt(data.prompt);
                }
              }
              else{
                Alert.alert("Cannon't use Chat feature without loggin in");
              }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleInputChange = (text) => {
        setPrompt(text);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={{ padding: 20 }}>
                    <TextInput
                        style={{ paddingLeft: 8, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, borderRadius: 50 }}
                        placeholder="Enter your prompt here"
                        onChangeText={handleInputChange}
                        value={prompt}
                    />
                    <Button title="Generate" onPress={handleSummarize} />
                    <View style={{ marginTop: 20 }}>
                        <Text>You: {prompt}</Text>
                        <Text>Bot: {response}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Chat;
