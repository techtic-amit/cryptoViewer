import React, {Component} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    Button,
    FlatList,
    TouchableOpacity,
    Image,
    useColorScheme,
    View,
  } from 'react-native'; 
  import { NavigationContainer, DrawerActions } from '@react-navigation/native';

 
  export default class App extends Component
  {
      constructor(props)
      {
          super(props);
         
          this.state={
              data:[],
              nm:[],
          }
          this.showListings();

      }
      gettingNames=async()=>
      {
        await fetch('http://api.coinlayer.com/api/live?access_key=f7fab8662888eee136d58308391a00c2',
        {
            method: 'GET',
            headers: 
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },

        }).then((response) => response.json()).then((responseJson) =>
        {
            
       
        }).catch((error) =>
        {
            alert("An error occured please try again."+error)
        });
      
      }
      showListings=async()=>
      {
        await fetch('http://api.coinlayer.com/api/list?access_key=f7fab8662888eee136d58308391a00c2',
        {
            method: 'GET',
            headers: 
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },

        }).then((response) => response.json()).then((responseJson) =>
        {
            if(responseJson.crypto)
            {
            const result = Object.entries(responseJson.crypto).map(([key, val]) => ({
                [key]: val
              }));


              this.setState({nm:Object.keys(responseJson.crypto)});
              //console.log(this.state.nm.length);
              //console.log(Object.keys(responseJson.crypto));
              var arr=[];
              var c=0,x,y;
              for (let nms of this.state.nm) {
                  x=parseInt(result[c][nms]['max_supply']);
                 
                  if(x < 9999) {
                      y=x.toString();
                  }
              
                  if(x < 1000000) {
                      y=Math.round(x/1000) + "K USD";
                  }
                  if( x < 10000000) {
                      y=(x/1000000).toFixed(1) + "M USD";
                  }
              
                  if(x < 1000000000) {
                     y=Math.round((x/1000000)) + "M USD";
                  }
              
                //   if(x < 1000000000000) {
                //       y= Math.round((x/1000000000)) + "B";
                //   }
              
                 var dat={
                    "symbol":result[c][nms]['symbol'],
                    "name":result[c][nms]['name'],
                    "name_full":result[c][nms]['name_full'],
                    "max_supply":y,
                    "icon_url":result[c][nms]['icon_url']

                }
                c++;
               arr.push(dat)
            }
        
            this.setState({data:arr});
        }
        else
        {
            alert("no data to show");
        }
       
        }).catch((error) =>
        {
            alert("An error occured please try again."+error)
        });
      }

     
      render()
    {
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()}>
                 <Image
            
        source={require('../assets/tmp.jpg')} 
        style={{ width: 40, height: 40,
        left: 5,
        top: 5, }}
    />
    <Text style={{fontSize:30,fontWeight:'bold',marginBottom:15,alignSelf:'center',textAlign:"center"}}>Listings</Text>
    </TouchableOpacity>
            <FlatList style={styles.list}
              contentContainerStyle={styles.listContainer}
              data={this.state.data}
              horizontal={false}
              numColumns={2}
              keyExtractor= {(item) => {
                  
                return item.symbol;
              }}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity style={styles.card}>
                    <View style={styles.cardHeader}>
                    </View>
                    <Image style={styles.userImage} source={{uri:item.icon_url}}/>
                    <View style={styles.cardFooter}>
                      <View style={{alignItems:"center", justifyContent:"center"}}>
                        <Text style={styles.name}>{item.name_full}</Text>
                        <Text style={styles.position}>{item.max_supply}</Text>
                      
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              }}/>
          </View>
        );
    }
  }

  const styles = StyleSheet.create({
    container:{
      flex:1,
      marginTop:20,
    },
    list: {
      paddingHorizontal: 5,
      backgroundColor:"#E6E6E6",
    },
    listContainer:{
     alignItems:'center'
    },
    /******** card **************/
    card:{
      shadowColor: '#00000021',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 12,
  
      marginVertical: 5,
      backgroundColor:"white",
      flexBasis: '46%',
      marginHorizontal: 5,
    },
    cardFooter: {
      paddingVertical: 17,
      paddingHorizontal: 16,
      borderTopLeftRadius: 1,
      borderTopRightRadius: 1,
      flexDirection: 'row',
      alignItems:"center", 
      justifyContent:"center"
    },
    cardContent: {
      paddingVertical: 12.5,
      paddingHorizontal: 16,
    },
    cardHeader:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 12.5,
      paddingBottom: 25,
      paddingHorizontal: 16,
      borderBottomLeftRadius: 1,
      borderBottomRightRadius: 1,
    },
    userImage:{
      height: 120,
      width: 120,
      borderRadius:60,
      alignSelf:'center',
      borderColor:"#DCDCDC",
      borderWidth:3,
    },
    name:{
      fontSize:18,
      flex:1,
      alignSelf:'center',
      color:"#008080",
      fontWeight:'bold'
    },
    position:{
      fontSize:14,
      flex:1,
      alignSelf:'center',
      color:"#696969"
    },
    followButton: {
      marginTop:10,
      height:35,
      width:100,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:30,
      backgroundColor: "#00BFFF",
    },
    followButtonText:{
      color: "#FFFFFF",
      fontSize:20,
    },
    icon:{
      height: 20,
      width: 20, 
    }
  });    