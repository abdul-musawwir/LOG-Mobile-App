import React,{useEffect, useState} from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import{ AuthContext } from '../components/context';
import { Button, TextInput } from 'react-native-paper';
import Iconrnv from 'react-native-vector-icons/MaterialCommunityIcons' ;
import axios from 'axios';
import { Alert } from 'react-native';
import { SERVER_IP } from '../components/constants';
import { ScrollView } from 'react-native';

const AdminScreen = ({navigation,data}) => {

  const { colors } = useTheme();
  const { signOut, toggleTheme } = React.useContext(AuthContext);
  const theme = useTheme();
  const [CapData, setCapData] = useState({
    TeamName : null,
    CapName : null,
    CapPass : null
  })

  const [Captains, setCaptains] = useState(null)


  useEffect(() => {
    axios.get(SERVER_IP+"/api/getcaptains", {
}).then(res => {
  console.log(res.data)
  setCaptains(res.data)
  // history.push('/')
}).catch(err => {
  console.log(err)
  console.log("Data Insertion failed! Please try again.");
})
  }, [])




  const HandleSubmit = (CapName,TeamName,CapPass) => {
    axios.post(SERVER_IP+"/api/registercaptain", {
      "TeamName" : TeamName,
    "UserName": CapName,
    "UserPassword": CapPass
}).then(res => {
  Alert.alert("Successfully inserted");
  // history.push('/')
}).catch(err => {
  console.log(err)
  console.log("Data Insertion failed! Please try again.");
})
  }
    return (
      <ScrollView>
      <View style={styles.container}>
        <Text style={{fontSize:30,alignSelf: 'center'}}>Register Captain</Text>
        <Button icon={({color, size}) => (
                        <Iconrnv
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    onPress={() => {signOut()}}
                >Sign Out</Button>
                <View style={{maxHeight:400}}>
         <TextInput
      label="Team Name"
      onChangeText={(tname)=>{setCapData({...CapData,TeamName:tname})}}
    />
    <TextInput
      label="Captain Name"
      onChangeText={(cname)=>{setCapData({...CapData,CapName:cname})}}
    />
    <TextInput
      label="Captain's Password"
      onChangeText={(cpass)=>{setCapData({...CapData,CapPass:cpass})}}
      secureTextEntry
    />
    <View>
    <Button mode="contained" style={{width:200,marginTop:10,alignSelf: 'center'}} onPress={(e)=>{HandleSubmit(CapData.CapName,CapData.TeamName,CapData.CapPass)}}>Submit</Button>
    </View>
    </View>
    <View style={{flex: 1, 
     alignItems: 'center', marginTop:15 }}>
        <Text style={{fontSize:20}}>Captains already registered:</Text>
        {Captains !== null?Captains.map(captain =><View>
          <View style={{paddingBottom:15}}>
          <Text style={{fontSize:15}}>Captain Name:{captain.UserName}</Text>
          <Text style={{fontSize:15}}>Team Name:{captain.TeamName}</Text>
          </View>
          </View>):null}
      </View>
      </View>
      </ScrollView>
    );
};

export default AdminScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    // alignItems: 'center', 
    // justifyContent: 'center'
  },
});
