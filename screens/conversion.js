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
    Button,
    Picker,
    useColorScheme,
    View,
  } from 'react-native'; 
  import DatePicker from 'react-native-datepicker'

  export default class Historical_data extends Component
  {
      constructor(props)
      {
          super(props);
          
          this.state={
              data:[],
              nam1:'',
              nam2:'',
              amt:'',
            rate:"",
            result:"",
              nm:[]
          }
          this.getNames();

      }
      getNames=async()=>
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
      
        
         this.setState({nm:Object.keys(responseJson.rates)})
      
         var arr=[];    
         var c=0;
         for(let nms of this.state.nm)
            {
                var obj={
                    "name":nms,
                  
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

      showExchangesAccorDate=async()=>
      {
          if(this.state.nam1 == this.state.nam2 )
          {
              alert("please choose a differen currency in either of one dropdown");
          }
          else if(this.state.amt.length == 0)
          {
              alert("Please fill the amount field")
          }
          else
          {
  await fetch('http://api.coinlayer.com/convert?access_key=0edd7fb6ba7a937a5e64a90ed942e65e&from='+this.state.nam1+'&to='+this.state.nam2+'&amount='+this.state.amt,
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
         
         this.setState({rate:responseJson.info["rate"]});
         this.setState({result:responseJson.result});
          
          
        }).catch((error) =>
        {
            alert("An error occured please try again."+error)
        });

          }
         
      
          
      }

      render(){
          const today=new Date();
      
        return (
            <View style={styles.container}>
                        <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()}>
                 <Image
            
        source={require('../assets/tmp.jpg')} 
        style={{ width: 40, height: 40,
        left: 5,
        top: 5, }}
    />
     <Text style={{fontSize:30,fontWeight:'bold',marginBottom:15,alignSelf:'center',textAlign:"center"}}>Conversion Rates</Text>
    </TouchableOpacity>
            <View style={styles.formContent}>
             
            </View>
            <Text style={{fontWeight:"bold"}}>Currency From*</Text>
            <Picker
        selectedValue={this.state.nam1}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => this.setState({nam1:itemValue})}
      >
   
    {this.state.data.map((item, index) => (
        <Picker.Item label={item.name} value={item.name} />
    ))}
    
      </Picker>
      <Text style={{fontWeight:"bold"}}>Currency To*</Text>
      <Picker
        selectedValue={this.state.nam2}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => this.setState({nam2:itemValue})}
      >
   
    {this.state.data.map((item, index) => (
        <Picker.Item label={item.name} value={item.name} />
    ))}
    
      </Picker>

      <TextInput 
   style={{width:"100%"}}
   style={{height: 40,backgroundColor: 'white', fontSize: 20}}  
   keyboardType='numeric'
   onChangeText={(text)=>this.setState({amt:text})}
   value={this.state.amt}
   maxLength={10}  //setting limit of input
   placeholder="AMT"
/>
<Button
  onPress={this.showExchangesAccorDate}
  title="Get Qty"
  color="#841584"
/>

<Text style={{textAlign:"left",fontWeight:'bold',fontSize:20}}>Rate :{this.state.rate}</Text>

<Text style={{textAlign:"left",fontWeight:'bold',fontSize:20}}>Result :{this.state.result}</Text>
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
    },
    notificationBox: {
      paddingTop:10,
      paddingBottom:10,
      
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
      alignSelf: 'center'
    },
    name2:{
        fontSize:20,
        fontWeight: 'bold',
        color: "#000000",
        marginLeft:50,
        textAlign:'right'
      },
  }); 
                  