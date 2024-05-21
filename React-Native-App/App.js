import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Alert, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from "./components/Login";
import Register from "./components/Register";
import Chat from "./components/Chat";
import History from "./components/History";

import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const App = () => {
  const Tab = createBottomTabNavigator();

  const handleLogout = async () => {
      await AsyncStorage.removeItem('username');
      Alert.alert('Logout', 'You have been successfully logged out');
  };

    return <>   
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Login" component={Login} options={
            { tabBarIcon: () => <MaterialCommunityIcons name="login" size={24} color="blue" /> }
          } />
          <Tab.Screen name="Register" component={Register} options={
            { tabBarIcon: () => <MaterialCommunityIcons name="registered-trademark" size={24} color="blue" /> }
          } />
          <Tab.Screen name="Chat" component={Chat} options={
            { tabBarIcon: () => <MaterialIcons name="snapchat" size={24} color="blue" /> }
          } />
          <Tab.Screen name="History" component={History} options={
            { tabBarIcon: () => <MaterialIcons name="history-toggle-off" size={24} color="blue" /> }
          } />
        </Tab.Navigator>
      </NavigationContainer>
      <View>
        <Button title="Logout" onPress={handleLogout}  color="#ea4335" />
      </View>
      </>
};

export default App;
