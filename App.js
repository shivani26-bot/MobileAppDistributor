import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import RequireAuth from './components/RequireAuth';
import Application from './screens/Application';
import AuthScreen from './screens/AuthScreen';

import ProjectDetails from './screens/ProjectDetails';
import {Image, TouchableOpacity} from 'react-native';
import AppDeleteIcon from './components/AppDeleteIcon';

import Registration from './screens/Register';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2979FF',
            height: 100,
          },
          headerTintColor: '#fff',
        }}>
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{headerShown: true}}
        />
        <Stack.Screen name="Application" options={{headerShown: false}}>
          {() => (
            <RequireAuth>
              <Application />
            </RequireAuth>
          )}
        </Stack.Screen>

        {/* Releases or project details page */}

        <Stack.Screen name="Project Details" component={ProjectDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
