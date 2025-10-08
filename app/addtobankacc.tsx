import AddToBankSettings from "@/components/AddToBank/AddToBankSettings";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddtoBankAccount() {
  const router = useRouter()

  const goback = () => {
    router.back()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
         <TouchableOpacity onPress={goback}>
           <Ionicons name="chevron-back" size={24} color="black" />
         </TouchableOpacity>
         <Text style={styles.text}>Add New Bank</Text>
      </View>
      <AddToBankSettings/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    paddingHorizontal: 16,
    flexDirection: "row", 
    alignItems: "center", 
    gap: "26%"
  },
  text: {
    fontFamily: "Bold",
    fontSize: 20,
    color: "#1F2937",
  },
});
