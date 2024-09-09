import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import api from './src/services/api';

export default function App() {
  const [cep, setCep] = useState('')
  const [cepUser, SetCepUser] = useState(null)

  const inputRef = useRef();

  async function buscar(){
    if(cep === '' || cep.length !== 8){
      alert('Digite um cep valido')
      return false;
    }

    try {
      const response = await api.get(`${cep}`)
      SetCepUser(response.data)
      Keyboard.dismiss()
    } catch (error) {
      console.log('ERROR: ' + error);
    }
  };

  function limpar(){
    setCep('')
    SetCepUser(null)
    inputRef.current.focus()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>BUSCAR CEP</Text>

      <Text style={styles.textCep}>Digite o CEP desejado:</Text>

      <TextInput
      placeholder='EX: 01424000'
      style={styles.input}
      value={cep}
      onChangeText={(item) => setCep(item)}
      ref={inputRef}
      />

      <View style={styles.areaBotao}>
        <TouchableOpacity 
        style={[styles.botao, {backgroundColor: '#1d75cd'}]}
        onPress={ buscar }>
          <Text style={styles.textBotao}>BUSCAR</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={[styles.botao, {backgroundColor: '#cd3e1d'}]}
        onPress={ limpar }>
          <Text style={styles.textBotao}>LIMPAR</Text>
        </TouchableOpacity>
      </View>

      {cepUser && (
        <View style={styles.areaResultado}>
          <Text style={styles.textAreaResultado}>CEP: {cepUser.cep}</Text>
          <Text style={styles.textAreaResultado}>RUA: {cepUser.address}</Text>
          <Text style={styles.textAreaResultado}>BAIRRO: {cepUser.district}</Text>
          <Text style={styles.textAreaResultado}>CIDADE: {cepUser.city}</Text>
          <Text style={styles.textAreaResultado}>ESTADO: {cepUser.state}</Text>
        </View>
      )}
      
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 80
  },
  titulo:{
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50
  },
  textCep:{
    fontSize: 16,
    marginBottom: 10
  },
  input:{
    width: '90%',
    textAlign: 'center',
    color: '#000',
    marginBottom: 10,
    backgroundColor: '#FFFDD0',
    height: 50,
    borderRadius: 10,
    borderWidth: 1
  },
  areaBotao:{
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'space-between',
    marginBottom: 50
  },
  botao:{
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  textBotao:{
    fontSize: 16,
    color: '#FFF'
  },
  areaResultado:{
    alignItems: 'center',
    justifyContent: 'center'
  },
  textAreaResultado:{
    padding: 5,
  }
});