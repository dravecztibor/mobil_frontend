import React, { useState, useEffect } from 'react';
import { Button, Image, View, Text, TextInput, TouchableOpacity} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {Picker} from '@react-native-picker/picker';

import Ipcim from './Ipcim';

export default function ImagePickerExample() {
  //kép backend----
  const [image, setImage] = useState(null);
  const SERVER_URL = Ipcim.Ipcim;

  const createFormData = (photo, body = {}) => {
    const data = new FormData();
  
    data.append('photo', {
      name: 'photo.jpg',
      type: 'image/jpg',
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });
  
    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });
  
    return data;
  };
  //kép backend vége----

  //ételtípusok backend---------
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [bevitel2, setBevitel2] = useState();

  const getMovies = async () => {
    try {
      const response = await fetch(Ipcim.Ipcim + 'eteltipusok');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);
  //ételtípusok backend vége---------

  //ételek backend----------
  const [isLoading2, setLoading2] = useState(true);
  const [data2, setData2] = useState([]);
  const [bevitel1, setBevitel1] = useState('');
  const [bevitel3, setBevitel3] = useState('')
  const [bevitel4, setBevitel4] = useState('')
  const [bevitel5, setBevitel5] = useState('')

  const etelek = async () => {
    try {
      const response = await fetch(Ipcim.Ipcim + 'etelek');
      const json = await response.json();
      setData2(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading2(false);
    }
  };

  useEffect(() => {
    etelek();
  }, []);
  //ételek backend vége---------

  //kiválasztássok-------
  const handleUploadPhoto = async () => {
    try {
      if (!image) {
        console.log('Please select an image first');
        return;
      }

      const formData = createFormData(image, {
        bevitel1: bevitel1, 
        bevitel2: bevitel2, 
        bevitel3: bevitel3,
        bevitel4: bevitel4,
        bevitel5: bevitel5
      });

      const response = await fetch(`${SERVER_URL}api/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) {
        throw new Error('Network request failed');
      }

      const data = await response.json();
      const data2 = await response.json();
      console.log('Hiba', error.message);
      alert("Hiba", error.message)
    } catch (error) {
      console.log('Sikeres feltöltés', data);
      alert("Sikeres feltöltés", data)
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result);
    }
  };
  //kiválasztássok vége-------

  return (
    <View style={{ 
      flex: 1, 
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#f0f8ff"
    }}>
      
      <TextInput
        style={{height: 40, margin:5, backgroundColor: "lightgrey", padding: 10,}}
        placeholder="Adj meg egy nevet!"
        onChangeText={newText => setBevitel1(newText)}
        defaultValue={bevitel1}
      />

      <Picker
        style={{ height: 50, width: 150, marginTop:10, marginBottom:10, backgroundColor: "lightgrey", padding: 10}}
        selectedValue={bevitel2}
        onValueChange={(itemValue, itemIndex) =>
        setBevitel2(itemValue)
      }>
      {data.map((item)=>{
        return(
          <Picker.Item label={item.eteltipusok_nev} value={item.eteltipusok_id} /> 
	      )}
	    )}
      </Picker>

      <TextInput
        style={{height: 40, margin:5, backgroundColor: "lightgrey", padding: 10}}
        placeholder="Írj ide hozzávalókat!"
        onChangeText={newText => setBevitel3(newText)}
        defaultValue={bevitel3}
      />

      <TextInput
        style={{height: 40, margin:5, backgroundColor: "lightgrey", padding: 10,}}
        placeholder="Írj ide allergéneket!"
        onChangeText={newText => setBevitel4(newText)}
        defaultValue={bevitel4}
      />

      <TextInput
        style={{height: 40, margin:5, backgroundColor: "lightgrey", padding: 10,}}
        placeholder="Írd le az étel elkészítését!"
        onChangeText={newText => setBevitel5(newText)}
        defaultValue={bevitel5}
      />

      <TouchableOpacity onPress={pickImage}>
        <View style={{backgroundColor: "lightblue", padding: 10, marginBottom: 9, borderRadius: 5, borderWidth: 1}}>
          <Text style={{fontStyle: "italic", fontWeight: "bold", color: "blue"}}>Kép kiválasztása</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleUploadPhoto}>
        <View style={{backgroundColor:"lightblue", padding: 10, marginBottom: 9, borderRadius: 5, borderWidth: 1}}>
          <Text style={{fontStyle: "italic", fontWeight: "bold", color: "blue"}}>Feltöltés</Text>
        </View>
      </TouchableOpacity>
        
        {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}