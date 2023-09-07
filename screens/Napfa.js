import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
const renderItem = ({ item }) => (
  <View style={styles.item}>
    <View style={styles.column}>
      <Text style={styles.name}>{item.name}</Text>
    </View>
    <View style={styles.column}>
      <Text style={styles.class}>{item.class}</Text>
    </View>
    <View style={styles.column}>
      <Text style={styles.result}>{item.result}</Text>
    </View>
  </View>
);
const studentData2023 = [
  { id: "1", name: "Caleb Han", class: "S3-01", result: 100 },
  { id: "2", name: "Felix", class: "S3-03", result: 90 },
  { id: "3", name: "Aravind", class: "S3-01", result: 78 },
];
const studentData2024 = [
  { id: "1", name: "Caleb Han", class: "S3-01", result: 100 },
  { id: "2", name: "Felix", class: "S3-03", result: 90 },
  { id: "3", name: "Aravind", class: "S3-01", result: 78 },
];

const Napfa2023 = () => {
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <FlatList
        data={studentData2023}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerText}>Student</Text>
            <Text style={styles.headerText}>Class</Text>
            <Text style={styles.headerText}>Result</Text>
          </View>
        )}
      />
    </View>
  );
};

const Napfa2024 = () => {
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <FlatList
        data={studentData2024}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerText}>Student</Text>
            <Text style={styles.headerText}>Class</Text>
            <Text style={styles.headerText}>Result</Text>
          </View>
        )}
      />
    </View>
  );
};

const Tab = createMaterialTopTabNavigator();

export default function NapfaTabs() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Text
        style={{
          fontSize: 39,
          fontWeight: "bold",
          padding: 10,
          marginTop: 5,
        }}
      >
        NAPFA
      </Text>
      <Text style={styles.subTitle}>Leaderboards</Text>
      <Tab.Navigator>
        <Tab.Screen name="NAPFA 2023" component={Napfa2023} />
        <Tab.Screen name="NAPFA 2024" component={Napfa2024} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "white",
  },
  column: {
    flex: 1,
  },
  name: {
    textAlign: "left",
  },
  class: {
    flex: 1,
  },
  result: {},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 2,
    borderColor: "#333",
    backgroundColor: "#FFFFFF",
  },
  headerText: {
    flex: 1,
    fontWeight: "bold",
  },
  subTitle: {
    padding: 10,
    marginTop: -15,
    color: "#C1CAD6",
  },
});
