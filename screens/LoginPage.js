import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const navigation = useNavigation()

  const logInUser = async () => {
    navigation.replace('Home')
  }

  const colorPicker = () => {
    let random1 = Math.round(Math.random() * 256)
    let random2 = Math.round(Math.random() * 256)
    let random3 = Math.round(Math.random() * 256)
    let alpha = 0.3

    return `rgba(${random1},${random2},${random3},${alpha})`
  }

  return (
    <View
      style={{
        backgroundColor: colorPicker(),
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 36,
            color: 'white',
            marginTop: -45,
            marginBottom: 30,
            fontWeight: 'bold',
          }}
        >
          BEST OF LUCK
        </Text>
      </View>
      <Text
        style={{
          fontSize: 10,
          fontWeight: 'bold',
          marginBottom: 5,
          color: 'white',
        }}
      >
        Its the people we love, not the money and toys that makes us rich
      </Text>
      <Image style={styles.image} source={require('../assets/ug.jpg')} />

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Secrete key..."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      {password ? (
        <TouchableOpacity style={styles.loginBtn} onPress={logInUser}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.loginBtn2}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},

  image: {
    marginBottom: 40,
    height: 110,
    width: 110,
    borderRadius: 60,
  },

  inputView: {
    backgroundColor: '#FFC0CB',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,

    alignItems: 'center',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
    fontSize: 12,
  },
  forgot_button2: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#FF1493',
  },
  loginBtn2: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: 'silver',
  },
})
