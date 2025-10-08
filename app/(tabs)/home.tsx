import AccountBalance from "@/components/AccountDetails/AccountDetails";
import SelectActions from "@/components/Actions/SelectActions";
import Header from "@/components/Header/Header";
import TransactionDetails from "@/components/Transactions/TransactionDetails";
import React from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <View style={styles.page}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollContent}
          >
            <Header/>
            <AccountBalance/>
            <SelectActions/>
            <TransactionDetails/>
          </ScrollView>
        </View>
    </SafeAreaView>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  page: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
 