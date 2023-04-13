import React, {useState} from "react";
import { StyleSheet, Text, View, Button, Touchable} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { auth } from "../../firebase";
import { Input } from 'react-native-elements';
import { db } from '../../firebase';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const Admin = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{headerShown: false}} />
      <Tab.Screen name="Points" component={PointsScreen} options={{headerShown: false}}/>
    </Tab.Navigator>
  );
};

const DashboardScreen = () => {
    const [header, setHeader] = useState('');
    const [text, setText] = useState('');
  
    const handleAddItem = () => {
      db.collection('Announcements').add({
        header,
        text,
      })
        .then(() => {
          console.log('Item added successfully!');
          setHeader('');
          setText('');
        })
        .catch((error) => {
          console.error('Error adding item: ', error);
        });
    };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Console</Text>
      <Text style={styles.subtitle}>Welcome, Admin!</Text>
      <Input
        label="Header"
        value={header}
        onChangeText={setHeader}
        placeholder="Enter header..."
      />
      <Input
        label="Text"
        value={text}
        onChangeText={setText}
        placeholder="Enter text..."
      />
      <View style={{alignSelf: 'center'}}>
      <TouchableOpacity
    onPress={handleAddItem}
    style={{ backgroundColor: "#DB5461", borderRadius: 10, alignSelf: 'center' }}
    >
        <Text style={{color: 'white', fontWeight: 'bold', padding: 10, fontSize: 17}}>Add Announcements</Text>
    </TouchableOpacity>
      </View>
    </View>
  );
};

const PointsScreen = () => {
    const handleLogout = () => {
        auth.signOut().then(() => {
          navigation.reset({ index: 0, routes: [{ name: "Login" }] });
        });
      };
      const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Points</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        backgroundColor: "#fff",
        padding: 20,
        paddingTop: 100,
      },
      title: {
        fontSize: 35,
        fontWeight: "bold",
        marginBottom: 10,
      },
      subtitle: {
        fontSize: 25,
        marginBottom: 30,
      },
});

export default Admin;


  