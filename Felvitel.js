import React, { useState, useEffect } from 'react';
import { Button, Image, View, Text, TextInput,} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {Picker} from '@react-native-picker/picker';
import Ipcim from './Ipcim';

export default function ImagePickerExample() {
  //kép backend----
  const [image, setImage] = useState(null);
  const [bevitel1, setBevitel1] = useState('');
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
  const [selectedEteltipusok, setSelectedEteltipusok] = useState();

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

  //kép kiválasztás-------
  const handleUploadPhoto = async () => {
    try {
      if (!image) {
        console.log('Please select an image first');
        return;
      }

      const response = await fetch(`${SERVER_URL}api/upload`, {
        method: 'POST',
        body: createFormData(image, { bevitel1: '123', bevitel1 }),
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) {
        throw new Error('Network request failed');
      }

      const data = await response.json();
      console.log('response', data);
    } catch (error) {
      console.log('error', error.message);
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
  //kép kiválasztás vége-------

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{padding: 10, fontWeight:"bold"}}>név:</Text>
        <TextInput
        style={{height: 40, margin:5, backgroundColor:"lightgreen"}}
        placeholder="Adj meg egy nevet!"
        onChangeText={newText => setBevitel1(newText)}
        defaultValue={bevitel1}
        />

      <Picker
        style={{ height: 50, width: 150, backgroundColor:"lightgreen", marginTop:10, marginBottom:10}}
        selectedValue={selectedEteltipusok}
        onValueChange={(itemValue, itemIndex) =>
        setSelectedEteltipusok(itemValue)
      }>
      {data.map((item)=>{
        return(
          <Picker.Item label={item.eteltipusok_nev} value={item.eteltipusok_id} />
        
	    )}
	    )}
      </Picker>

        <Button title="Kép kiválasztása" onPress={pickImage} />
        <Button title="Fotó feltöltés" onPress={handleUploadPhoto} />
        
        {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}