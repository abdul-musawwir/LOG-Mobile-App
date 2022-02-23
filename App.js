/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
  StackActions
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme 
} from 'react-native-paper';


import { AuthContext } from './components/context';

import RootStackScreen from './screens/RootStackScreen';

import AsyncStorage from '@react-native-community/async-storage';
import HomeScreen from './screens/HomeScreen';
import AdminScreen from './screens/AdminScreen';
import PlayerScreen from './screens/PlayerScreen';
import CaptainScreen from './screens/CaptainScreen';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterPlayer from './screens/RegisterPlayer';

const Stack = createStackNavigator();

const App = () => {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null); 

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

 

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const [data, setData] = React.useState({
    isLoading: true,
    userName: null,
    TeamName : null,
    role: null ,
    userToken: null, 
    CaptainName: null, 
    Sport : null,
});
  const initialLoginState = {
    isLoading: true,
    userName: null,
    TeamName : null,
    role: null ,
    userToken: null, 
    CaptainName: null, 
    Sport : null,
  };
  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        console.log("retrieve " + JSON.stringify(action))
        return {
          ...prevState,
          userToken: action.Token,
          isLoading: false,
        };
      case 'LOGIN': 
        console.log("login")
        return {
          ...prevState,
          userName: action.userName,
          role: action.role ,
          userToken: action.Token, 
          CaptainName: action.CaptainName, 
          Sport : action.Sport,
          TeamName : action.TeamName,
          isLoading: false,
        };
      case 'LOGOUT': 
        console.log("logout")
        return {
          ...prevState,
          userName: null,
          role: null,
          userToken: null, 
          CaptainName: null, 
          Sport : null,
          TeamName : null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async(foundUser) => {
      // setUserToken('fgkj');
      // setIsLoading(false);
      console.log(foundUser)
      const userToken = foundUser.Token;
      const userName = foundUser.UserName?foundUser.UserName:null;
      const CaptainName = foundUser.CaptainName?foundUser.CaptainName:null;
      const Sport = foundUser.Sport?foundUser.Sport:null;
      const role = foundUser.role?foundUser.role:null;
      const TeamName = foundUser.TeamName?foundUser.TeamName:null;
      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch(e) {
        console.log(e);
      }
      setData({
        ...data,
        userName: userName,
        role:role ,
        TeamName:TeamName, 
        userToken: userToken, 
        CaptainName: CaptainName, 
        Sport : Sport
      })
      dispatch({ type: 'LOGIN', userName: userName,role:role ,TeamName:TeamName, userToken: userToken, CaptainName: CaptainName, Sport : Sport});
      
    },
    signOut: async() => {
      // setUserToken(null);
      // setIsLoading(false);
      console.log("hehehehrh")
      try {
        await AsyncStorage.removeItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    }
  }), []);

  useEffect(() => {
    setTimeout(async() => {
      // setIsLoading(false);
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', userToken: userToken });
    }, 1000);
  }, []);
  if( loginState.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
  console.log(loginState);
  return (
    <PaperProvider theme={theme}>
    <AuthContext.Provider value={authContext}>
    <NavigationContainer theme={theme}>
      
      { loginState.userToken !== null && data.role === "admin"  ? (
        <AdminScreen data={data} />
      )
    : loginState.userToken !== null && data.role === "captain"  ? (
      <Stack.Navigator headerMode='none'>
        <Stack.Screen name = "Captain" component = {()=>(<CaptainScreen data = {data}/>)}/> 
        <Stack.Screen name = "AddPlayer" component = {RegisterPlayer}/> 
      </Stack.Navigator>
      ):
      loginState.userToken !== null && data.role === "player"  ? (
        <PlayerScreen data={data} />
      ):
      <RootStackScreen/>
    }
    </NavigationContainer>
    </AuthContext.Provider>
    </PaperProvider>
  );
}

export default App;
