import React from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView } from 'react-native';
import Ipcim from './Ipcim';
import { WebView } from 'react-native-webview';

const Ujlap = ({route}) => {
  const {atkuld1, atkuld2, atkuld3, atkuld4, atkuld5, atkuld6, atkuld7} = route.params

  return (
    <ScrollView>
      <View style={styles.container}>
      
        {/*<Text>{atkuld1}</Text>*/}

        <Text 
        style={{
          height:30, 
          textTransform:"uppercase", 
          fontStyle:"italic", 
          fontWeight:"bold",
          color:"darkgreen",
          textDecorationLine:"underline"
        }}
        >{atkuld2}</Text>


        <Text 
        style={{
          marginTop:10, 
          marginBottom:5, 
          textAlign:"center", 
          fontWeight:"bold", 
          fontStyle:"italic", 
          textDecorationLine:"underline",
        }}
        >Hozzávalók:</Text>
        <Text>{atkuld3}</Text>

        
        <Text style={{marginTop:10, 
          marginBottom:5, 
          textAlign:"center", 
          fontWeight:"bold", 
          fontStyle:"italic",
          textDecorationLine:"underline",
        }}
        >Allergének:</Text>
        <Text>{atkuld4}</Text>
        
        
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
        }}
        >Videó az elkészítéshez:</Text>
        <WebView source={{ uri: atkuld6 }} style={{ flex: 1, padding: 150,}}/>
    

    </View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 3,
    backgroundColor: "lightgreen",
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
    padding: 20,
  },

});

export default Ujlap;
