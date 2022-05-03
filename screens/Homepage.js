import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native'
import React, { useState, useEffect } from 'react'
//import DATA from '../data/data'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Entypo } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import moment from 'moment'
import { FAB } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const Homepage = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [title, settitle] = useState('')
  const [content, setcontent] = useState('')
  const [image, setImage] = useState('')
  const [items, setitems] = useState([])
  const [todos, settodos] = useState([])
  const navigation = useNavigation()
  const [logIn, setlogIn] = useState('')

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    console.log(result)

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  const colorPicker = () => {
    let random1 = Math.round(Math.random() * 256)
    let random2 = Math.round(Math.random() * 256)
    let random3 = Math.round(Math.random() * 256)
    let alpha = 0.3

    return `rgba(${random1},${random2},${random3},${alpha})`
  }

  useEffect(() => {
    const getData = async () => {
      try {
        var value = await AsyncStorage.getItem('Key')
        if (value !== null) {
          // value previously stored
          const real = JSON.parse(value)
          settodos(real)
        }
      } catch (e) {
        // error reading value
      }
    }
    getData()
    colorPicker()
  }, [items])

  const addItem = async () => {
    const random = (Math.random() * 100).toString()
    setitems([
      ...items,
      {
        id: random,
        title,
        content,
        image,
        time: Date.now(),
      },
    ])

    try {
      let valueContent = JSON.stringify(items)
      await AsyncStorage.setItem('Key', valueContent)
    } catch (e) {
      // saving error
    }
    settitle('')
    setcontent('')
    setImage('')
  }

  function handleDeleteClick(id) {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id
    })
    settodos(removeItem)
  }

  const logMeOut = () => {
    navigation.replace('Login')
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colorPicker() }}>
      <TouchableOpacity
        style={{
          backgroundColor: colorPicker(),
          padding: 10,
          paddingleft: 15,
          paddingright: 15,
          justifyContent: 'center',
          alignItems: 'center',
          width: '86%',
          borderRadius: 8,
          marginLeft: 25,
          marginBottom: 10,
          marginTop: 60,
        }}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          {' '}
          Add a new note{' '}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
          setModalVisible(!modalVisible)
        }}
      >
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.addView3}
            >
              <Text> Back </Text>
            </TouchableOpacity>
            {title && content ? (
              <TouchableOpacity onPress={addItem} style={styles.addView}>
                <Text style={styles.addText}>Add</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.addView2}>
                <Text style={styles.addText}>Add</Text>
              </View>
            )}
          </View>

          <TextInput
            style={styles.input}
            onChangeText={(text) => settitle(text)}
            value={title}
            placeholder="Title"
          />

          <TextInput
            style={styles.input2}
            onChangeText={(text) => setcontent(text)}
            value={content}
            numberOfLines={4}
            placeholder="Write something down"
          />
          <View style={styles.picture}>
            {image ? (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            ) : (
              <FontAwesome name="image" size={200} color="silver" />
            )}
          </View>
          <View>
            <TouchableOpacity
              style={{
                marginLeft: 140,
                padding: 10,
                borderWidth: 1,
                borderColor: 'red',
                backgroundColor: 'pink',
                width: 100,
                borderRadius: 10,
                alignItems: 'center',
              }}
              onPress={() => AsyncStorage.clear()}
            >
              <Text>Delete All</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity style={styles.icon} onPress={pickImage}>
              <Entypo name="image" size={24} color="black" />
              <Text>Pick Image</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
      <FlatList
        data={todos}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                width: '90%',
                marginLeft: 20,
                marginBottom: 30,
                borderWidth: 1,
                borderColor: '#20232a',
                borderRadius: 6,
                paddingBottom: 5,
                backgroundColor: colorPicker(),
              }}
            >
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                  }}
                >
                  {' '}
                  {item.title}{' '}
                </Text>
              </View>
              <View style={{ paddingBottom: 20 }}>
                <Text style={{ marginLeft: 10 }}>{item.content}</Text>
              </View>
              <View>
                {item.image ? (
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: '100%', height: 200, marginBottom: 10 }}
                  />
                ) : null}
              </View>
              <View
                style={{
                  marginTop: 10,
                  marginLeft: 10,
                }}
              >
                <Text style={{ color: 'white', fontSize: 10 }}>
                  {moment(item.time).fromNow()}{' '}
                </Text>
              </View>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: colorPicker(),
                      borderRadius: 5,
                      padding: 5,
                    }}
                    onPress={() => handleDeleteClick(item.id)}
                  >
                    <Text style={{ color: 'white' }}>DELETE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )
        }}
        keyExtractor={(item) => item.id}
      />
      <View>
        <FAB
          style={styles.fab}
          //small
          icon="logout"
          onPress={logMeOut}
        />
      </View>
    </SafeAreaView>
  )
}

export default Homepage

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
  },
  input2: {
    height: 60,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
  },
  icon: {
    alignItems: 'center',
    marginTop: 200,
  },
  picture: {
    width: '100%',
    alignItems: 'center',
  },
  addText: {
    color: 'white',
  },
  addView: {
    width: 100,
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 10,
    marginLeft: 140,
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addView2: {
    width: 100,
    backgroundColor: 'silver',
    padding: 12,
    borderRadius: 10,
    marginLeft: 140,
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addView3: {
    width: 100,
    backgroundColor: 'pink',
    padding: 12,
    borderRadius: 10,
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})
