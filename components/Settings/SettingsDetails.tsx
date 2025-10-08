import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SettingSDetails() {
  const [isEnable, setIsEnable] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleSwitch = () => setIsEnable((prev) => !prev);


    const handleChangePin = () => {
      router.push('/changepin')
    }

    const handleChangePassword = () => {
      router.push('/changepassword')
    }

    const handleAddtoBank = () => {
      router.push('/addtobankacc')
    }

  const onPressDelete = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?  This action cannot be undone.",
      [
        {
          text: "Cancle",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            router.replace('/')
          },
        },
      ]
    );
  };

  return (
    <View>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.settingsContainer}>
        <View>
          <Text style={styles.label}>Bank Accounts</Text>
          <TouchableOpacity onPress={handleAddtoBank} style={styles.Btn}>
            <Text style={styles.BtnText}>+ Add bank account</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.box}>
          <Text style={styles.label}>Transaction Pin</Text>
          <TouchableOpacity onPress={handleChangePin} style={styles.Btn}>
            <Text style={styles.BtnText}>Change Pin</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.changepasswordbox}>
          <Pressable
            style={styles.changepasswordbtn}
            onPress={handleChangePassword}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                justifyContent: "center",
              }}
            >
              <Ionicons name="lock-closed" size={20} color="gray" />
              <Text style={styles.passwordText}>Change Password</Text>
            </View>
            <Feather name="chevron-right" size={20} color="gray" />
          </Pressable>
        </View>

        <View style={styles.biometricBox}>
          <Pressable style={styles.biometricbtn}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                justifyContent: "center",
              }}
            >
              <Image
                style={{ width: 25, height: 25 }}
                source={require("../../assets/images/face-id.png")}
              />
              <Text style={styles.biometric}>Biometric</Text>
            </View>
            <Switch
              value={isEnable}
              onValueChange={toggleSwitch}
              trackColor={{ false: "gray", true: "#0000cd" }}
            />
          </Pressable>
        </View>

        <View style={styles.deletebox}>
          <Pressable style={styles.DeleteBtn} onPress={onPressDelete}>
            <Text style={styles.deleteText}>Delete my Account</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  settingsContainer: {
    marginTop: 40,
  },
  label: {
    fontFamily: "semiBold",
    fontSize: 16,
  },

  box: {
    marginTop: 40,
  },

  Btn: {
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "#4682B4",
    marginHorizontal: 25,
    padding: 15,
    borderRadius: 10,
  },
  BtnText: {
    color: "white",
    fontFamily: "Regular",
    fontSize: 15,
  },

  title: {
    fontFamily: "Bold",
    fontSize: 25,
    letterSpacing: 0.5,
    textAlign: "center",
  },

  changepasswordbox: {
    marginTop: 40,
  },
  changepasswordbtn: {
    borderRadius: 15,
    padding: 20,
    backgroundColor: "#f5f5f5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  passwordText: {
    fontSize: 15,
    fontFamily: "semiBold",
    color: "gray",
  },

  biometricBox: {
    marginTop: 20,
  },

  biometricbtn: {
    borderRadius: 15,
    padding: Platform.OS === "ios" ? 15 : 9,
    backgroundColor: "#f5f5f5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  biometric: {
    fontSize: 15,
    fontFamily: "semiBold",
    color: "gray",
  },
  deletebox: {
    marginTop: 50,
  },

  DeleteBtn: {
    backgroundColor: "#f5f5f5",
    padding: Platform.OS === "ios" ? 15 : 9,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },

  deleteText: {
    fontSize: 15,
    fontFamily: "Bold",
    color: "red",
  },
});
