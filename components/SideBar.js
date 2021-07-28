import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground, Image,AsyncStorage } from "react-native";
import { DrawerNavigatorItems } from "react-navigation-drawer";

var photo=null;

export default class Tmp extends Component
{
   async componentDidMount()
   {
    AsyncStorage.getItem('photo').then((value) => {

        photo=value; 
    });
   }
    render(){
        return(
            <View></View>
        );
    }
}  

 SideBar = props => (
    
<ScrollView>
<Tmp/>  
            
        <ImageBackground
            source={{uri:"https://firebasestorage.googleapis.com/v0/b/lioncharge.appspot.com/o/005.png?alt=media&token=e054f099-eea7-4c94-8a60-3d937071ca0e"}}
            style={{ width: undefined, padding: 0, paddingTop: 170 }}
        >
            <Image source={{uri:photo}} style={styles.profile} />
            {/* <Image source={{uri:"https://image.shutterstock.com/image-photo/portrait-smiling-red-haired-millennial-260nw-1194497251.jpg"}} style={styles.profile} /> */}
            {/* <Text style={styles.name}>NearbuyCar</Text> */}

            <View style={{ flexDirection: "row" }}>
                {/* <Text style={styles.followers}>734 Followers</Text> */}
                {/* <Ionicons name="md-people" size={16} color="rgba(255, 255, 255, 0.8)" /> */}
            
            </View>
        </ImageBackground>

        <View style={styles.container} forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerNavigatorItems {...props} />
                  </View>
    </ScrollView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    profile: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: "#FFF"
    },
    name: {
        color: "#000000",
        fontSize: 20,
        fontWeight: "800",
        marginVertical: 50,
        alignContent:"flex-end"
    },
    followers: {
        color: "rgba(255, 255, 255, 0.8)",
        fontSize: 13,
        marginRight: 4
    }
});
