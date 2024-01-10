import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, Button, Image, TextInput,} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Ipcim from "./Ipcim"
import { TouchableOpacity } from 'react-native-gesture-handler';

//ételek backend-------------
const Kozosscreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
   //ételtipus picker eleje---------
  
   const [data2, setData2] = useState([]);
   const [selectedEteltipusok, setSelectedEteltipusok] = useState(null);
   const [text, setText] = useState('');
  
  const getMovies = async () => {
    try {
      const response = await fetch(Ipcim.Ipcim + 'etelek');
      const json = await response.json();
      setData(json);
    } 
    catch (error) {
      console.error(error);
    } 
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
    eteltipusok()
  }, []);
  //ételek backend vége-------------

 

  const eteltipusok = async () => {
    try {
      const response = await fetch(Ipcim.Ipcim + 'eteltipusok');
      const json = await response.json();
      //alert(JSON.stringify(json))
      setData2(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading2(false);
    }
  };

  const kattintas= async () =>{
    //alert(selectedEteltipusok)
    var adatok2 = {
      "bevitel2":selectedEteltipusok
  }
  try {
    const response = await fetch(Ipcim.Ipcim + 'kereseteltipus', 
    {
      method: "POST",
      body: JSON.stringify(adatok2),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
    );
    const json = await response.json();
    setData(json);
  } 
  catch (error) {
    console.error(error);
  } 
  finally {
    setLoading(false);
  }
  }
  //ételtipus picker vége---------

  //keresés mező eleje--------
  const keresfuggveny = async () => {
    //alert(text)
    var adatok = {
        "bevitel1":text
    }
    try {
      const response = await fetch(Ipcim.Ipcim + 'keresetelszoveg', 
      {
        method: "POST",
        body: JSON.stringify(adatok),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      }
      );
      const json = await response.json();
      setData(json);
    } 
    catch (error) {
      console.error(error);
    } 
    finally {
      setLoading(false);
    }


  }
  //keresés mező vége--------

  return (
    //picker eleje------------
    <View style={{flex: 1, padding: 24,}}>
      <Picker
        style={{textAlign:"center", backgroundColor:"lightgrey", marginBottom:5, marginLeft:20, marginRight:20,}}
        selectedValue={selectedEteltipusok}
        onValueChange={(itemValue, itemIndex) =>
        setSelectedEteltipusok(itemValue)
      }>
      {data2.map((item)=>{
        return(
          <Picker.Item label={item.eteltipusok_nev} value={item.eteltipusok_id}/>
        
	    )}
	    )}


      </Picker>


      <TouchableOpacity onPress={() => kattintas()}>
        <View style={{padding: 10, borderRadius: 5, backgroundColor:"green", marginLeft:20, marginRight:20, marginBottom:10}}>
          <Text style={{color: 'yellow', textAlign: 'center', textTransform:"uppercase", fontWeight:"bold", fontStyle:"italic"}}>Keresés</Text>
        </View>
      </TouchableOpacity>
      {/*picker vége------------*/}

      <View style={{borderWidth:1, borderColor:"grey", marginTop:10, marginBottom:20}}/>

      {/*keresésmező eleje------------*/}
      <TextInput
        style={{height: 40, textAlign:"center", backgroundColor:"lightgrey", marginBottom:5, marginLeft:20, marginRight:20, borderRadius:5}}
        placeholder="Keresés..."
        onChangeText={newText => setText(newText)}
        defaultValue={text}
      />

    <TouchableOpacity title='keresés' onPress={() => keresfuggveny()}>
      <View style={{padding: 10, borderRadius: 5, backgroundColor:"green", marginLeft:20, marginRight:20, marginBottom:10}}>
        <Text style={{color: 'yellow', textAlign: 'center', textTransform:"uppercase", fontWeight:"bold", fontStyle:"italic"}}>Keresés</Text>
      </View>
    </TouchableOpacity>
    {/*keresésmező vége------------*/}

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <View style={{
              borderWidth:3, 
              marginBottom:10, 
              backgroundColor:"lightgreen",}}>
                <Text style={{
                  color:"brown", 
                  fontSize:20, textAlign:"center", 
                  marginTop:20, 
                  marginBottom:5, 
                  color:"darkgreen", 
                  fontWeight:"bold", 
                  fontStyle:"italic",
                  textDecorationLine:"underline"}}>
                    {item.etelek_nev}
                </Text>

                <Image source={{uri: Ipcim.Ipcim + `${item.etelek_kep}`}} style={{
                  width:270, 
                  height:270, 
                  alignItems:"center", 
                  marginLeft:30, 
                  marginBottom:20, 
                  marginTop:20,}}
                />

                <TouchableOpacity onPress={() => navigation.navigate("Részletek", {atkuld1:item.etelek_id, atkuld2:item.etelek_nev, atkuld3:item.etelek_hozzavalok, atkuld4:item.etelek_allergenek, atkuld5:item.etelek_elkeszites, atkuld6:item.etelek_video, atkuld7:item.etelek_kep})}>
                  <View style={{padding: 10, borderRadius: 5, backgroundColor:"green", marginLeft:20, marginRight:20, marginBottom:10}}>
                    <Text style={{color: 'yellow', textAlign: 'center', textTransform:"uppercase", fontWeight:"bold", fontStyle:"italic"}}>Részletek</Text>
                  </View>
                </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default Kozosscreen;