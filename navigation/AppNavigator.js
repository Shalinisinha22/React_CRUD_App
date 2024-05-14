import { StyleSheet, Text, View } from "react-native";
import React, {useEffect} from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../Screens/HomeScreen";
import LoginScreen from "../Screens/LoginScreen";
import { useSelector } from "react-redux";







const AppNavigator = () => {
  const Stack = createNativeStackNavigator();


  const userInfo = useSelector(state => state.user.userInfo);
  

    useEffect(()=>{
       
    },[userInfo])

  return (
    <NavigationContainer>
      <Stack.Navigator>

        {
            userInfo!=null ?
            <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          :
          <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        }
   
       
      
        
     

  
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});