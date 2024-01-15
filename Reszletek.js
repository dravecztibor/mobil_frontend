import React from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView, } from 'react-native';
import Ipcim from './Ipcim';
import { WebView } from 'react-native-webview';

const Ujlap = ({route}) => {
  const {atkuld1, atkuld2, atkuld3, atkuld4, atkuld5, atkuld6, atkuld7} = route.params

  return (
    <ScrollView>
      <View style={styles.container}>

      <View style={{borderWidth: 1, marginTop: 10, borderColor: "green"}}/>

        <Text 
        style={{
          height:30, 
          textTransform:"uppercase", 
          fontStyle:"italic", 
          fontWeight:"bold",
          color:"darkgreen",
          textDecorationLine:"underline",
          textAlign: "center"
        }}
        >{atkuld2}</Text>


        <Text style={{
          marginTop:10, 
          marginBottom:5,
          textAlign:"center", 
          fontWeight:"bold", 
          fontStyle:"italic", 
          textDecorationLine:"underline",
        }}>
          Hozzávalók:
        </Text>
        <Text style={{textAlign: "center",}}>{atkuld3}</Text>
        
        

        <Text style={{
          marginTop:10, 
          marginBottom:5,
          textAlign:"center", 
          fontWeight:"bold", 
          fontStyle:"italic", 
          textDecorationLine:"underline",
        }}>
          Allergének:
        </Text>
        <Text style={{textAlign: "center"}}>{atkuld4}</Text>

        

        <Text style={{
          marginTop:10, 
          marginBottom:5,
          textAlign:"center", 
          fontWeight:"bold", 
          fontStyle:"italic", 
          textDecorationLine:"underline",
        }}
        >Elkészítés:</Text>
        <Text>{atkuld5}</Text>

        

        <Text style={{
          marginTop:10, 
          marginBottom:5, 
          fontWeight:"bold",
          fontStyle:"italic", 
          textDecorationLine:"underline",
          textAlign: "center"
        }}
        >Videó az elkészítéshez:</Text>
        <WebView source={{ uri: atkuld6 }} style={{ flex: 1, padding: 100,}}/>

        <View style={{borderWidth: 1, marginTop: 10, borderColor: "green"}}/>
    

    </View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#adff2f"
  },

});

export default Ujlap;
