import React,{useEffect, useState} from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import{ AuthContext } from '../components/context';
import { Button, TextInput } from 'react-native-paper';
import Iconrnv from 'react-native-vector-icons/MaterialCommunityIcons' ;
import axios from 'axios';
import { Alert } from 'react-native';
import { SERVER_IP } from '../components/constants';

const CaptainScreen = ({data}) => {

  const { colors } = useTheme();
  const { signOut, toggleTheme } = React.useContext(AuthContext);
const navigation = useNavigation()


  useEffect(() => {
      console.log(data)
  }, [])




  const handleClick = (Sport) => {
    console.log(Sport)
    console.log(data)
    navigation.navigate("AddPlayer",{Sport:Sport,data:data})
  }
    return (
      <View style={styles.container}>
        <Text style={{fontSize:30}}>Choose Sport</Text>
        <Button icon={({color, size}) => (
                        <Iconrnv
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    onPress={() => {signOut()}}
                >Sign Out</Button>
                <View > 
        <Button style={{marginBottom:4}} mode="contained" onPress={()=>{handleClick('futsal boys')}}>Futsal boys</Button>
        <Button style={{marginBottom:4}} mode="contained" onPress={()=>{handleClick('futsal girls')}}>Futsal girls</Button>
        <Button style={{marginBottom:4}} mode="contained" onPress={()=>{handleClick('tt girls')}}>TT girls</Button>
        <Button style={{marginBottom:4}} mode="contained" onPress={()=>{handleClick('tt boys')}}>TT boys</Button>
        <Button style={{marginBottom:4}} mode="contained" onPress={()=>{handleClick('badminton boys')}}>Badminton boys</Button>
        <Button style={{marginBottom:4}} mode="contained" onPress={()=>{handleClick('badminton girls')}}>Badminton girls</Button>
        <Button style={{marginBottom:4}} mode="contained" onPress={()=>{handleClick('throwball girls')}}>Throwball girls</Button>
        <Button style={{marginBottom:4}} mode="contained" onPress={()=>{handleClick('volley ball')}}>Volleyball boys</Button>
        <Button style={{marginBottom:4}} mode="contained" onPress={()=>{handleClick('basketball boys')}}>Basketball boys</Button>
        <Button style={{marginBottom:4}} mode="contained" onPress={()=>{handleClick('cricket boys')}}>Cricket boys</Button>
        </View>
      </View>
    );
};

export default CaptainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    // justifyContent: 'center'
  },
});
