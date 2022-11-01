import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

const Leaders = () => {
  const windowWidth = Dimensions.get("window").width;
  const blueHouse = [
    "lim_en_xuan_shannon@s2020.ssts.edu.sg ",
    "reeann_koh_rui_en@s2020.ssts.edu.sg",
  ];
  const blackHouse = [
    "faith_goh_ren_ying@s2020.ssts.edu.sg  ",
    "yap_su_hui_anastasia@s2020.ssts.edu.sg",
  ];
  const greenHouse = [
    "tan_kai_yang_samuel@s2020.ssts.edu.sg  ",
    "ang_shaal_josh@s2020.ssts.edu.sg",
  ];
  const redHouse = [
    "nathanael_aditya_wirawan@s2020.ssts.edu.sg  ",
    " wong_xin_ern_corie@s2020.ssts.edu.sg",
  ];
  const yellowHouse = [
    "ong_xuan_kai@s2020.ssts.edu.sg  ",
    "ridha_fathima_nowshad@s2020.ssts.edu.sg",
  ];

  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 15,
        width: windowWidth - 10,
        alignItems: "center",
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 30, marginTop: 20 }}>
        BlueHouse:{" "}
      </Text>

      <Text style={{ fontSize: 20 }}>{blueHouse}</Text>
      <Text style={{ fontWeight: "bold", fontSize: 30, marginTop: 20 }}>
        BlackHouse:{" "}
      </Text>

      <Text style={{ fontSize: 20 }}>{blackHouse}</Text>
      <Text style={{ fontWeight: "bold", fontSize: 30, marginTop: 20 }}>
        GreenHouse:{" "}
      </Text>

      <Text style={{ fontSize: 20 }}>{greenHouse}</Text>
      <Text style={{ fontWeight: "bold", fontSize: 30, marginTop: 20 }}>
        RedHouse:{" "}
      </Text>

      <Text style={{ fontSize: 20 }}>{redHouse}</Text>
      <Text style={{ fontWeight: "bold", fontSize: 30, marginTop: 20 }}>
        YellowHouse:{" "}
      </Text>
      <Text style={{ fontSize: 20 }}>{yellowHouse}</Text>
    </View>
  );
};

export default Leaders;

const styles = StyleSheet.create({});
