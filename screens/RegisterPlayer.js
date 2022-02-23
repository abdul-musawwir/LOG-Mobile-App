import React,{useEffect, useState} from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import{ AuthContext } from '../components/context';
import { Button, TextInput } from 'react-native-paper';
import Iconrnv from 'react-native-vector-icons/MaterialCommunityIcons' ;
import axios from 'axios';
import { Alert } from 'react-native';
import { SERVER_IP } from '../components/constants';

const RegisterPlayer = ({navigation,route}) => {

  const { data, Sport } = route.params;
  const { colors } = useTheme();
  const { signOut, toggleTheme } = React.useContext(AuthContext);
  const theme = useTheme();
  const [CapData, setCapData] = useState({
    CapName : null,
    CapPass : null
  })

  const [Captains, setCaptains] = useState(null)


  useEffect(() => {
    console.log(navigation)
    console.log(data)
    console.log(Sport)
    axios.post(SERVER_IP+"/api/getplayers", {
      "TeamName" : data.TeamName,
    "Sport" : Sport
    }).then(res => {
  console.log(res.data)
  setCaptains(res.data)
  // history.push('/')
}).catch(err => {
  console.log(err)
  console.log("Data Insertion failed! Please try again.");
})
  }, [])




  const HandleSubmit = (Name,Pass,TeamName,CapName,Sport) => {
    axios.post(SERVER_IP+"/api/addplayer", {
      "TeamName" : TeamName,
    "UserName": Name,
    "UserPassword": Pass,
    "CaptainName" : CapName,
    "Sport": Sport
}).then(res => {
  Alert.alert("Successfully inserted");
  // history.push('/')
}).catch(err => {
  console.log(err)
  console.log("Data Insertion failed! Please try again.");
})
  }



    return (
      <View style={styles.container}>
        <Text style={{fontSize:30,alignSelf: 'center'}}>Register Player</Text>
        <Text style={{fontSize:30,alignSelf: 'center'}}>{Sport.toUpperCase()}</Text>
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
      label="Player Name"
      onChangeText={(cname)=>{setCapData({...CapData,CapName:cname})}}
    />
    <TextInput
      label="Player's Password"
      onChangeText={(cpass)=>{setCapData({...CapData,CapPass:cpass})}}
      secureTextEntry
    />
    <View>
    <Button mode="contained" style={{width:200,marginTop:10,alignSelf: 'center'}} onPress={(e)=>{HandleSubmit(CapData.CapName,CapData.CapPass,data.TeamName,data.UserName,Sport)}}>Submit</Button>
    </View>
    </View> 
      <View style={{flex: 1, 
     alignItems: 'center', marginTop:15 }}>
        <Text style={{fontSize:20}}>Players already registered in this team:</Text>
        {Captains !== null?Captains.map(captain =><View>
          <Text style={{fontSize:15}}>{captain.UserName}</Text>
          </View>):null}
      </View>
      </View>
    );
};

export default RegisterPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    // alignItems: 'center', 
    // justifyContent: 'center'
  },
});
