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
    useColorScheme,
    View,
  } from 'react-native'; 
  import DatePicker from 'react-native-datepicker'
import axios from 'react-native-axios';
  export default class Historical_data extends Component
  {
      constructor(props)
      {
          super(props);
          
          this.state={
              data:[],
              date:'',
              nm:[]
          }

      }
      test_axios=async()=>
      {
        axios.get('http://api.coinlayer.com/api/2021-04-01?access_key=f7fab8662888eee136d58308391a00c2')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
      }
      showExchangesAccorDate=async()=>
      {
          if(this.state.date.length == 0)
          {
              alert("Enter a date");
          }
          else
          {

        await fetch('http://api.coinlayer.com/api/'+this.state.date+'?access_key=f7fab8662888eee136d58308391a00c2',
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
     <Text style={{fontSize:30,fontWeight:'bold',marginBottom:15,alignSelf:'center',textAlign:"center"}}>Exchange Rates According to Date</Text>
    </TouchableOpacity>
            <View style={styles.formContent}>
             
            </View>
            <DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2008-05-01"
        maxDate={today}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36,
            marginBottom:20
          
        }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
<Button
  onPress={this.showExchangesAccorDate}
  title="Get Data"
  color="#841584"
/>


            <FlatList 
              style={styles.notificationList}
              data={this.state.data}
              keyExtractor= {(item) => {
                return item.id;
              }}
              renderItem={({item}) => {
                return (
                  <View style={styles.notificationBox}>
                    
                    
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.name2}>{item.val}</Text>
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
                  