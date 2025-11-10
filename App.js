import 'react-native-gesture-handler';
import * as React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Planets from './screens/Planets';
import Films from './screens/Films';
import Spaceships from './screens/Spaceships';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Planets" component={Planets} />
      <Tab.Screen name="Films" component={Films} />
      <Tab.Screen name="Spaceships" component={Spaceships} />
    </Tab.Navigator>
  );
}

function DrawerNav() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Planets" component={Planets} />
      <Drawer.Screen name="Films" component={Films} />
      <Drawer.Screen name="Spaceships" component={Spaceships} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      {Platform.OS === 'ios' ? <Tabs /> : <DrawerNav />}
    </NavigationContainer>
  );
}
