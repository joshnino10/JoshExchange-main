import { useGlobal } from "@/context/GloabalContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
} from "react-native-reanimated";

export default function Index() {
  const router = useRouter();
  const {
    username,
    setUserName,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword
  } = useGlobal();

  const [isSecure, setIsSecure] = useState(true);
  const [isSecure2, setIsSecure2] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const showPassword = () => {
    setIsSecure(!isSecure);
  };
  
  const showConfirmPassword = () => {
    setIsSecure2(!isSecure2);
  };

  const handleSignUp = () => {
    setErrorMessage('');
    
    // Validate input - Fixed early return issue
    if (!username || !firstName || !lastName || !email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields');
      return; // Added missing return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    // Password validation
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long");
      return;
    }

    // Confirm password
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match"); 
      return;
    }
    
    // Make an API call to Register
    Alert.alert(
      "Sign Up Successful", // Fixed typo
      `Account created for ${firstName} ${lastName}`,
      [
        {
          text: 'Ok',
          onPress:()=>{
            router.replace('/')
          }
        }
      ]
    );
};

  const gotoLogin = () => { // Renamed function for clarity
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 50}
        style={styles.contents}
      >
        <ScrollView
          contentContainerStyle={{ justifyContent: "center" }}
          showsVerticalScrollIndicator={false}
          style={styles.scrollContent}
        >
          <Animated.Image
            entering={FadeInUp.duration(400).springify()}
            style={{
              height: 300,
              width: "100%",
              alignSelf: "center",
              resizeMode: "contain",
            }}
            source={require("../assets/images/signupicon.jpg")}
          />
          <Animated.Text
            entering={FadeInDown.duration(600)}
            style={styles.title}
          >
            Register
          </Animated.Text>

          <Animated.Text
            entering={FadeInLeft.delay(300).springify()}
            style={styles.titleDesc}
          >
            Please register to continue
          </Animated.Text>

          <View style={styles.inputContents}>
            {/* Error message display - moved to better position */}
            {errorMessage ? (
              <Animated.View entering={FadeInDown.duration(300)}>
                <Text style={styles.errorText}>{errorMessage}</Text>
              </Animated.View>
            ) : null}

            <Animated.View
              entering={FadeInLeft.duration(400)}
              style={styles.inputContainer}
            >
              <Ionicons name="person-outline" size={20} color="black" />
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="gray"
                value={username}
                onChangeText={setUserName}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Animated.View>

            <Animated.View
              entering={FadeInLeft.duration(500)}
              style={styles.inputContainer}
            >
             <Ionicons name="accessibility-outline" size={20} color="black" />
              <TextInput
                style={styles.input}
                placeholder="First name"
                placeholderTextColor="gray"
                value={firstName}
                onChangeText={setFirstName}
                autoCapitalize="words"
              />
            </Animated.View>

            <Animated.View
              entering={FadeInRight.duration(600)}
              style={styles.inputContainer}
            >
             <Ionicons name="accessibility-outline" size={20} color="black" />
              <TextInput
                style={styles.input}
                placeholder="Last name"
                placeholderTextColor="gray"
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="words"
              />
            </Animated.View>

            <Animated.View
              entering={FadeInLeft.duration(700)}
              style={styles.inputContainer}
            >
              <Ionicons name="mail-outline" size={20} color="black" />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="gray"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Animated.View>

            <Animated.View
              entering={FadeInLeft.duration(800)}
              style={styles.inputContainer}
            >
              <Ionicons name="lock-closed-outline" size={20} color="black" />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="gray"
                secureTextEntry={isSecure}
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
              />
                <TouchableOpacity onPress={showPassword}>
                <Ionicons
                  name={isSecure ? "eye-outline" : "eye-off-outline"}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </Animated.View>

            <Animated.View
              entering={FadeInLeft.duration(900)}
              style={styles.inputContainer}
            >
              <Ionicons name="lock-closed-outline" size={20} color="black" />
              <TextInput
                style={styles.input}
                placeholder="Confirm password"
                placeholderTextColor="gray"
                secureTextEntry= {isSecure2}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                autoCapitalize="none"
              />
                <TouchableOpacity onPress={showConfirmPassword}>
                <Ionicons
                  name={isSecure2 ? "eye-outline" : "eye-off-outline"}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </Animated.View>
          </View>

          <Animated.View entering={FadeInUp.duration(700)}>
            <TouchableOpacity onPress={handleSignUp} style={styles.btn}>
              <Text style={styles.btnText}>Sign Up</Text>
            </TouchableOpacity>
          </Animated.View>

          <View style={styles.signupContent}>
            <Text style={styles.signup}>Already have an account?</Text>
            <Pressable onPress={gotoLogin}>
              <Text
                style={[
                  styles.signup,
                  {
                    color: "#0000cd",
                    fontWeight: "600",
                    fontFamily: "semiBold",
                  },
                ]}
              >
                {" "}
                Login
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    flexGrow: 1,
  },
  contents: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 35,
    fontFamily: "Bold",
    color: "#4682B4", // Changed from "cerulean" to actual color value
    textAlign: "center",
  },
  titleDesc: {
    fontSize: 13,
    color: "gray",
    fontFamily: "semiBold",
    textAlign: "center",
    marginBottom: 10,
  },
  inputContents: {
    marginTop: 20,
  },
  errorText: {
    fontSize: 13,
    fontFamily: "Medium",
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    backgroundColor: "#f5f5f5", // Slightly better color than "lightgray"
    borderRadius: 20,
    gap: 5,
    marginVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  input: {
    flex: 1,
    fontWeight: "500", // Reduced from 700 for better readability
    fontSize: 16,
  },
  btn: {
    marginTop: 20,
    width: "100%",
    padding: Platform.OS === 'ios'? 15:9, 
    backgroundColor: "#0000cd",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Bold",
  },
  signupContent: { 
    marginTop: 20,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  signup: {
    fontSize: 15,
    color: "gray",
    fontFamily: "Medium",
    textAlign: "center",
  },
});