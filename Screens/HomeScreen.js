import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;
const HomeScreen = () => {
  const [userData, setUserData] = useState(null);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [flag, setFlag] = useState(false);

  const saveUserData = async () => {
    try {
      let data = await AsyncStorage.getItem("Users");
      if (data) {
        data = JSON.parse(data);
      }

      console.log("Existing data:", data);

      if (!data) {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        data = res.data.map(({ id, name, email }) => ({ id, name, email }));
        await AsyncStorage.setItem("Users", JSON.stringify(data));
      }

      if (data.length !== 0 && newUserName && newUserEmail) {
        const newUser = {
          id: data.length + 1,
          name: newUserName,
          email: newUserEmail,
        };

        data = [...data, newUser];
        console.log("newDta", data);

        setNewUserName("");
        setNewUserEmail("");

        await AsyncStorage.setItem("Users", JSON.stringify(data));
        console.log("New user added:", data);
      }

      getUserData();
      setUserData(data);
    } catch (error) {
      console.log("Error saving user data:", error.message);
    }
  };

  const getUserData = async () => {
    try {
      const result = await AsyncStorage.getItem("Users");
      const data = JSON.parse(result);
      console.log(data, "data");
      setUserData(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    saveUserData();
  }, []);

  const renderUserItem = ({ item }) => (
    <View style={styles.item}>
      <Text allowFontScaling={false} style={styles.content}>{item.id}. {item.name}</Text>
      <Text allowFontScaling={false} style={styles.content}>{item.email}</Text>
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        {userData !== null ? (
          <>
            <View
              style={styles.header}
            >
              <Text allowFontScaling={false} style={[styles.textHeading, { fontWeight: 700 }]}>
                Name
              </Text>
              <View
                style={{ height: "100%", width: 2, backgroundColor: "#fff" }}
              ></View>
              <Text allowFontScaling={false} style={[styles.textHeading, { fontWeight: 700 }]}>
                Email
              </Text>
            </View>
            <FlatList
              data={userData}
              keyExtractor={(item, index) =>
                item.id ? item.id.toString() : index.toString()
              }
              renderItem={renderUserItem}
            />
          </>
        ) : (
          <ActivityIndicator
            style={{ marginTop: 200, marginBottom: 420 }}
          ></ActivityIndicator>
        )}

        {flag ? (
            <View>
                     <Modal
              visible={flag}
              onRequestClose={() => setFlag(!flag)}
              animationType="slide"
          >
          <View style={{width:width,alignItems:"center",paddingTop:30}}>
          <Text allowFontScaling={false} 
                style={{
                  height: 1,
                  borderColor: "#ccc",
                  borderWidth: 2,
                  width: width,
                  marginBottom: 15,

                }}
              />
          <Text style={{textAlign:"center",fontWeight:700,fontSize:30}}>Add User</Text>
          <Text allowFontScaling={false} 
                style={{
                  height: 1,
                  borderColor: "#ccc",
                  borderWidth: 2,
                  marginTop: 15,
                  width: width,
                  marginBottom: 15,

                }}
              />
          
          </View>
           
              <View style={styles.modalContainer}>
                  <TextInput
                      style={styles.input}
                      placeholder="Name"
                      onChangeText={(text) => setNewUserName(text)}
                      value={newUserName}
                  />
                  <TextInput
                      style={styles.input}
                      placeholder="Email"
                      onChangeText={(text) => setNewUserEmail(text)}
                      value={newUserEmail}
                  />
                  <TouchableOpacity
                      style={styles.button}
                             onPress={() => {
                saveUserData();
                setFlag(!flag);
              }}
                  >
                      <Text style={styles.buttonText}>Submit</Text>
                  </TouchableOpacity>
              </View>
          </Modal>
                </View>
         
      
        ) : (
          <TouchableOpacity
            style={[
              styles.button,
              { marginTop: 15, width: 300, borderRadius: 20 },
            ]}
            onPress={() => setFlag(!flag)}
          >
            <Text allowFontScaling={false} style={styles.buttonText}>Add User</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    paddingBottom: 20,
  },
  header: {
    width: width,
    backgroundColor: "#70d6ff",
    flexDirection: "row",
    justifyContent: "space-around",
    height: 50,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 4,
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 25,
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    width: width,
    backgroundColor: "#f49cbb",
  },
  textHeading: {
    fontSize: 18,
    color: "#fff",
    marginTop: 10,
  },
  content: {
    color: "black",
    fontSize: 12,
  },
  inputContainer: {
    marginTop: 40,
    width: "80%",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 25,
    paddingLeft: 10,
  },
  button: {
    width: "100%",
    height: 45,
    backgroundColor: "#70d6ff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  modalContainer:{
    width:width,
    alignItems:"center",
    marginTop:80,
    padding:20
  }
});

export default HomeScreen;
