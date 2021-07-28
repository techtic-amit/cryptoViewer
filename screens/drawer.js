import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Listing from './listings';
import exchange from './exchanges';
import Historical from './Historical_data';
import Conversion from './conversion';
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Listings">
        <Drawer.Screen name="Listings" component={Listing} />
        <Drawer.Screen name="Exchange Rates" component={exchange} />
        <Drawer.Screen name="Historical Data" component={Historical} />
        <Drawer.Screen name="Conversion" component={Conversion} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}