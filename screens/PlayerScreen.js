import React,{useEffect, useState} from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import{ AuthContext } from '../components/context';
import { Button, TextInput } from 'react-native-paper';
import Iconrnv from 'react-native-vector-icons/MaterialCommunityIcons' ;
import axios from 'axios';
import { Alert } from 'react-native';
import { SERVER_IP } from '../components/constants';

const PlayerScreen = ({data}) => {

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
    axios.post(SERVER_IP+"/api/getteam", {
      "TeamName" : data.TeamName,
    "Sport" : data.Sport
}).then(res => {
  console.log(res.data)
  setCaptains(res.data)
  // history.push('/')
}).catch(err => {
  console.log(err)
  console.log("Data Insertion failed! Please try again.");
})
  }, [])

    return (
      <View style={styles.container}>
        <Text style={{fontSize:30}}>Show Player</Text>
        <Button icon={({color, size}) => (
                        <Iconrnv
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    onPress={() => {signOut()}}
                >Sign Out</Button>
         
    <View>
      <Text style={{fontSize:20}}>Player Name: {data.userName}</Text>
      <Text style={{fontSize:20}}>Team Name: {data.TeamName}</Text>
      <Text style={{fontSize:20}}>Sport: {data.Sport}</Text>
      <Text></Text>
    </View>
        
      <View >
        <Text style={{fontSize:20}}>Members in your Team:</Text>
        {Captains !== null?Captains.map(captain =><View>
          <Text style={{fontSize:18}}>{captain.UserName}</Text>
          </View>):null}
      </View>
      </View>
    );
};

export default PlayerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    // justifyContent: 'center'
  },
});
