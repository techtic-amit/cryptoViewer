import React from "react";
import { StyleSheet, Text,TextInput, View, Image, TouchableOpacity, ScrollView ,Dimensions} from "react-native";
import InputTextField from "../components/InputTextField";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';



export default function Header()
{
    return(
        <View style={styles.header}>
          <View>
              <Text style={styles.headerText}>LION CHARGE</Text>
          </View>
        </View>
    );
}


const styles=StyleSheet.create({
header:{
    
    width:"100%",
    height: 60,
    backgroundColor:"#006a3e",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
},
headerText:{
    fontSize:20,
    color:"#fff",
    letterSpacing:1,
}
});