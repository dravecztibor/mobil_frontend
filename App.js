import * as React from 'react';

import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Proba from "./Proba"
import Proba2 from "./Etelek"
import Proba3 from "./Eteltipusok"
import Kep from "./Kep"
import Felvitel from "./Felvitel"
import Lenyilo from "./Lenyilo"
import Kozosscreen from "./Etelek2"
import Ujlap from "./Reszletek"
import Video from "./Video"

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
      {/*<Button
        onPress={() => navigation.navigate('Proba')}
        title="Próba képernyő"
      />*/}
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

function Etelek({ navigation }) {
  return (
    <Proba2/>
  );
}

function Eteltipusok({ navigation }) {
  return (
    <Proba3/>
  );
}

function Root ({navigation}){
  return(
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      <Drawer.Screen name="Ételek" component={Kozosscreen} />
      {/*<Drawer.Screen name="Ételek" component={Etelek} />*/}
      <Drawer.Screen name="Ételtípusok" component={Eteltipusok} />
      {/*<Drawer.Screen name="Képfeltöltés" component={Kep} />*/}
      <Drawer.Screen name="Felvitel" component={Felvitel} />
      {/*<Drawer.Screen name="Lenyíló" component={Lenyilo} />*/}
      {/*<Drawer.Screen name="Videók" component={Video} />*/}
    </Drawer.Navigator>
  )
}

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Root" component={Root} options={{headerShown:false}} />
        <Stack.Screen name="Proba" component={Proba} />
        <Stack.Screen name="Részletek" component={Ujlap} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}