import React, {Component} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    Image,
    useColorScheme,
    View,
  } from 'react-native'; 

  export default class Exchanges extends Component
  {
      constructor(props)
      {
          super(props);
          this.showExchanges();
          this.state={
              data:[],
              nm:[]
          }

      }
      showExchanges=async()=>
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
         // console.log(responseJson);
         this.setState({nm:Object.keys(responseJson.rates)})
         const result = Object.entries(responseJson.rates).map(([key, val]) => ({
            [key]: val
          }));
         //console.log(this.state.nm)
         var arr=[];    
         var c=0;
         for(let nms of this.state.nm)
            {
                var obj={
                    "name":nms,
                    "val":result[c][nms]
                }
                c++;
                arr.push(obj);
            }
            
         this.setState({data:arr});
          
          
        }).catch((error) =>
        {
            alert("An error occured please try again."+error)
        });
      }

      render(){
        const lapsList = this.state.data.map((data) => {
            return (
                <View><Text>{data.name}</Text></View>
              )
        })
        return (
            <View style={styles.container}>
            <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()}>
                 <Image
            
        source={require('../assets/tmp.jpg')} 
        style={{ width: 40, height: 40,
        left: 5,
        top: 5, }}
    />
     <Text style={{fontSize:30,fontWeight:'bold',marginBottom:15,alignSelf:'center',textAlign:"center"}}>Exchange Rates</Text>
    </TouchableOpacity>
            <View style={styles.formContent}>
             
            </View>
            
            <FlatList 
              style={styles.notificationList}
              data={this.state.data}
              keyExtractor= {(item) => {
                return item.id;
              }}
              renderItem={({item}) => {
                return (
                  <View style={styles.notificationBox}>
                    
                   <View> 
                    <Text style={styles.name}>{item.name}</Text>
                    </View>
                    <View style={{flex:1,alignContent:'flex-end'}}>
                    <Text style={styles.name2}>{item.val}</Text>
                    </View>
                  </View>
                )}}/>
          </View>

          );
      }
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#EBEBEB',
    },
    formContent:{
      flexDirection: 'row',
      marginTop:30,
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        height:45,
        flexDirection: 'row',
        alignItems:'center',
        flex:1,
        margin:10,
    },
    icon:{
      width:30,
      height:30,
    },
    iconBtnSearch:{
      alignSelf:'center'
    },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    inputIcon:{
      marginLeft:15,
      justifyContent: 'center'
    },
    notificationList:{
      marginTop:20,
      padding:10,
      width:"100%"
    },
    notificationBox: {
      paddingTop:10,
      paddingBottom:10,
      width:"100%",
      marginTop:5,
      backgroundColor: '#FFFFFF',
      flexDirection: 'row',
      borderRadius:10,
    },
    image:{
      width:45,
      height:45,
      borderRadius:20,
      marginLeft:20
    },
    name:{
      fontSize:20,
      fontWeight: 'bold',
      color: "#000000",
      marginLeft:10,

      alignSelf: 'flex-start',
     
    },
    name2:{
        fontSize:20,
        fontWeight: 'bold',
        color: "#000000",
        textAlign:"right",
        position: 'absolute', 
        right: 0
      
      
      },
  }); 
                  