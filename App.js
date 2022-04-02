import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';


let timer = null;
let ss = 0;
let mm = 0;
let hh = 0;


export default function App() {

  const [numero, setNumero] = useState('00:00');
  const [botao, setBotao] = useState('Iniciar');
  const [ultimo, setUltimo] = useState(null);

  function iniciar() {

    if (timer !== null) {
      // pausar cronometro
      clearInterval(timer);
      timer = null;
      setBotao('Iniciar');
    } else {
      //iniciar o cronometro
      timer = setInterval(() => {
        ss++;

        if (ss == 60) {
          ss = 0;
          mm++;
        }
        if (mm == 60) {
          mm = 0;
          hh++;
        }

        let format =
          (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);

        setNumero(format);

      }, 1000);

      setBotao('Pausar');
    }

  }

  function limpar() {
    // zerar cronometro
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }

    setUltimo(numero);
    setNumero('00:00');
    ss = 0;
    mm = 0;
    hh = 0;

    setBotao('Iniciar');

  }


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Image
        source={require('./src/cronom.png')}
        style={styles.img}
      />

      <Text style={styles.timer}> {numero} </Text>

      <View style={styles.btnarea}>

        <TouchableOpacity style={styles.btn} onPress={iniciar}>
          <Text style={styles.text}>{botao}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={limpar}>
          <Text style={styles.text}>Zerar</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.ultimaview}>
        <Text style={styles.textult}>
          {ultimo ? 'Ultimo Tempo Cronometro ' + ultimo : ''}
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#20b2aa'
  },
  img: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
  },
  timer: {
    marginTop: '-50%',
    fontSize: 30,
    fontWeight: 'bold'
  },
  btnarea: {
    flexDirection: 'row',
    marginTop: '30%',
    height: 40
  },
  btn: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    margin: 25,
    borderRadius: 10
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#20b2aa'
  },
  ultimaview: {
    marginTop: '15%'
  },
  textult: {
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'italic'
  }

});
