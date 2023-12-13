import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import Ipcim from './Ipcim';

const Ujlap = ({route}) => {
  const {atkuld1, atkuld2, atkuld3, atkuld4, atkuld5} = route.params

  return (
    <View style={styles.container}>
        {/*<Text>{atkuld1}</Text>*/}
        <Text style={{height:50, textTransform:"uppercase", fontStyle:"italic", fontWeight:"bold", color:"green"}}>{atkuld2}</Text>

        <Text style={{marginBottom:5}}>Hozzávalók:</Text>
        <Text>{atkuld3}</Text>

        <Text style={{marginTop:10, marginBottom:5}}>Allergének:</Text>
        <Text>{atkuld4}</Text>

        <Text style={{marginTop:10, marginBottom:5}}>Elkészítés:</Text>
        <Text>{atkuld5}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Ujlap;
