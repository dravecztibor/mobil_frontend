import React from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView } from 'react-native';
import Ipcim from './Ipcim';
import { WebView } from 'react-native-webview';

const Ujlap = ({route}) => {
  const {atkuld1, atkuld2, atkuld3, atkuld4, atkuld5, atkuld6} = route.params

  return (
    <ScrollView>
      <View style={styles.container}>
      
        {/*<Text>{atkuld1}</Text>*/}
        
        <Text style={{height:30, textTransform:"uppercase", fontStyle:"italic", fontWeight:"bold", color:"green"}}>{atkuld2}</Text>

        <Text style={{marginTop:10, marginBottom:5}}>Hozzávalók:</Text>
        <Text>{atkuld3}</Text>

        <Text style={{marginTop:10, marginBottom:5}}>Allergének:</Text>
        <Text>{atkuld4}</Text>
        
        <Text style={{marginTop:10, marginBottom:5}}>Elkészítés:</Text>
        <Text>{atkuld5}</Text>

        <Text style={{marginTop:10, marginBottom:5}}>Videó az elkészítéshez:</Text>
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
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    marginTop: 5,
  },
});

export default Ujlap;
