import React,{useEffect} from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import{ AuthContext } from '../components/context';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = ({navigation,data}) => {

  const { colors } = useTheme();
  const { signOut, toggleTheme } = React.useContext(AuthContext);
  const theme = useTheme();
  useEffect(() => {
    console.log(data)
    
  }, [])
    return (
      <View style={styles.container}>
        <Button icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    onPress={() => {signOut()}}
                >Sign Out</Button>
        <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
        <Text style={{color: colors.text}}>Home Screen</Text>
      <Button
        onPress={() => navigation.navigate("Details")}
      >Go to details screen</Button>
      </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
