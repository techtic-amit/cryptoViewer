import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Listings from './screens/listings';
import Exchanges from './screens/exchanges';
import Historical from './screens/Historical_data';
import MyDrawer from './screens/drawer';
const Stack = createStackNavigator();

function App() {
  return (
    // <NavigationContainer>
    //     <Stack.Navigator initialRouteName="MyDrawer">
    //     <Stack.Screen name="Listings" component={Listings} />
    //     <Stack.Screen name="Exchanges" component={Exchanges} />
    //     <Stack.Screen name="Historical" component={Historical} />
    //     <Stack.Screen name="Drawer" component={MyDrawer} />
        
    //   </Stack.Navigator>
    // </NavigationContainer>
    <MyDrawer/>
  );
}
export default App;
