import {
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import React from "react";
import ChangePasswordDetails from "@/components/ChangePassword/ChangePasswordDetails";

export default function ChangePassword() {
  return (
    <SafeAreaView style={styles.container}>
        <ChangePasswordDetails/>
   
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
