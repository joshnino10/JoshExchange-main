import {
    Text,
    View,
    StyleSheet,
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Platform,
    StatusBar,
    Pressable,
    Alert,
  } from "react-native";
  import Ionicons from "@expo/vector-icons/Ionicons";
  import { useState } from "react";
  import { useRouter } from "expo-router";
  import Animated, {
    FadeInDown,
    FadeInLeft,
    FadeInRight,
    FadeInUp,
  } from "react-native-reanimated";
  import { useGlobal } from "@/context/GloabalContext";
  
  export default function ForgotPassword() {
    const router = useRouter();
    const {email, setEmail} = useGlobal()
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isEmailSent, setIsEmailSent] = useState(false);
  
    const handleSendResetEmail = async () => {
      setErrorMessage("");
      setIsLoading(true);
  
      // Validate email input
      if (!email) {
        setErrorMessage("Please enter your email address");
        setIsLoading(false);
        return;
      }
  
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErrorMessage("Please enter a valid email address");
        setIsLoading(false);
        return;
      }
  
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));
  
        // Here you would make your actual API call to send reset email
        // const response = await resetPasswordAPI(email);
        
        setIsEmailSent(true);
        setIsLoading(false);
        
        Alert.alert(
          "Reset Email Sent",
          "If an account with this email exists, you will receive password reset instructions shortly.",
          [{ text: "OK" }]
        );
      } catch (error) {
        setErrorMessage("Something went wrong. Please try again.");
        setIsLoading(false);
      }
    };
  
    const goBackToLogin = () => {
      router.back();
    };
  
    const resendEmail = () => {
      setIsEmailSent(false);
      handleSendResetEmail();
    };
  
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
          style={styles.contents}
        >
          <ScrollView
            contentContainerStyle={{ justifyContent: "center" }}
            showsVerticalScrollIndicator={false}
            style={styles.scrollContent}
          >
            {/* Back Button */}
            <Animated.View 
              entering={FadeInLeft.duration(400)}
              style={styles.backButtonContainer}
            >
              <TouchableOpacity onPress={goBackToLogin} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#0000cd" />
                <Text style={styles.backButtonText}>Back to Login</Text>
              </TouchableOpacity>
            </Animated.View>
  
            <Animated.Image
              entering={FadeInUp.duration(600)}
              style={{
                height: 250,
                width: "100%",
                alignSelf: "center",
                resizeMode: "contain",
                marginTop: 20,
              }}
              source={require("../assets/images/forgotpasswordicon.jpg")}
            />
  
            <Animated.Text
              entering={FadeInDown.duration(600)}
              style={styles.title}
            >
              Forgot Password?
            </Animated.Text>
  
            <Animated.Text
              entering={FadeInLeft.delay(300).springify()}
              style={styles.titleDesc}
            >
              {isEmailSent 
                ? "A code has been sent to your mail" 
                : "Enter your email address to receive password reset instructions"
              }
            </Animated.Text>
  
            {!isEmailSent ? (
              <>
                <View style={styles.inputContents}>
                  {/* Error message display */}
                  {errorMessage ? (
                    <Animated.View entering={FadeInDown.duration(300)}>
                      <Text style={styles.errorText}>{errorMessage}</Text>
                    </Animated.View>
                  ) : null}
  
                  <Animated.View
                    entering={FadeInLeft.duration(700)}
                    style={styles.inputContainer}
                  >
                    <Ionicons name="mail-outline" size={20} color="black" />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your email address"
                      placeholderTextColor="gray"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      editable={!isLoading}
                    />
                  </Animated.View>
                </View>
  
                <Animated.View entering={FadeInUp.duration(700)}>
                  <TouchableOpacity 
                    onPress={handleSendResetEmail} 
                    style={[styles.btn, isLoading && styles.btnDisabled]}
                    disabled={isLoading}
                  >
                    <Text style={styles.btnText}>
                      {isLoading ? "Sending..." : "Send Reset Email"}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              </>
            ) : (
              <Animated.View 
                entering={FadeInUp.duration(600)}
                style={styles.successContainer}
              >
                <View style={styles.successIconContainer}>
                  <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
                </View>
                
                <Text style={styles.successTitle}>Email Sent!</Text>
                <Text style={styles.successDesc}>
                  We've sent password reset instructions to{"\n"}
                  <Text style={styles.emailText}>{email}</Text>
                </Text>
  
                <View style={styles.instructionsContainer}>
                  <Text style={styles.instructionsTitle}>What's next?</Text>
                  <View style={styles.instructionItem}>
                    <Ionicons name="mail" size={16} color="#666" />
                    <Text style={styles.instructionText}>Check your email inbox</Text>
                  </View>
                  <View style={styles.instructionItem}>
                    <Ionicons name="link" size={16} color="#666" />
                    <Text style={styles.instructionText}>Click the reset link</Text>
                  </View>
                  <View style={styles.instructionItem}>
                    <Ionicons name="lock-closed" size={16} color="#666" />
                    <Text style={styles.instructionText}>Create a new password</Text>
                  </View>
                </View>
  
                <TouchableOpacity onPress={resendEmail} style={styles.resendButton}>
                  <Text style={styles.resendButtonText}>Resend Email</Text>
                </TouchableOpacity>
              </Animated.View>
            )}
  
            {/* Login Link */}
            <View style={styles.loginContent}>
              <Text style={styles.loginText}>Remember your password?</Text>
              <Pressable onPress={goBackToLogin}>
                <Text
                  style={[
                    styles.loginText,
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
    backButtonContainer: {
      marginTop: 10,
      marginBottom: 20,
    },
    backButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    backButtonText: {
      color: "#0000cd",
      fontSize: 16,
      fontFamily: "semiBold",
    },
    title: {
      color: "#4682B4",
      fontSize: 32,
      fontFamily: "Bold",
      fontWeight: "bold",
      textAlign: "center",
      marginTop: 20,
    },
    titleDesc: {
      fontSize: 14,
      fontFamily: "Medium",
      color: "gray",
      textAlign: "center",
      marginTop: 10,
      marginBottom: 10,
      lineHeight: 20,
      paddingHorizontal: 20,
    },
    inputContents: {
      marginTop: 30,
    },
    errorText: {
      fontSize: 13,
      fontFamily: "Medium",
      color: "red",
      textAlign: "center",
      marginBottom: 15,
      paddingHorizontal: 10,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      height: 55,
      backgroundColor: "#f5f5f5",
      borderRadius: 20,
      gap: 10,
      marginVertical: 10,
      paddingHorizontal: 15,
      borderWidth: 1,
      borderColor: "#e0e0e0",
    },
    input: {
      flex: 1,
      fontWeight: "500",
      fontSize: 16,
    },
    btn: {
      marginTop: 25,
      width: "100%",
      padding: 15,
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
    btnDisabled: {
      backgroundColor: "#9999cd",
    },
    btnText: {
      color: "white",
      fontFamily: "Bold",
      fontSize: 18,
    },
    successContainer: {
      alignItems: "center",
      marginTop: 20,
    },
    successIconContainer: {
      marginBottom: 20,
    },
    successTitle: {
      fontSize: 28,
      fontFamily: "Bold",
      color: "#4CAF50",
      marginBottom: 15,
    },
    successDesc: {
      fontSize: 16,
      fontFamily: "Medium",
      color: "gray",
      textAlign: "center",
      lineHeight: 22,
      marginBottom: 30,
    },
    emailText: {
      color: "#0000cd",
      fontWeight: "600",
    },
    instructionsContainer: {
      backgroundColor: "#f8f9fa",
      borderRadius: 15,
      padding: 20,
      marginBottom: 25,
      width: "100%",
    },
    instructionsTitle: {
      fontSize: 18,
      fontFamily: "Bold",
      color: "#333",
      marginBottom: 15,
      textAlign: "center",
    },
    instructionItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginBottom: 12,
    },
    instructionText: {
      fontSize: 14,
      fontFamily: "Medium",
      color: "#666",
      flex: 1,
    },
    resendButton: {
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderWidth: 2,
      borderColor: "#0000cd",
      borderRadius: 20,
      marginBottom: 20,
    },
    resendButtonText: {
      color: "white",
      fontFamily: "Bold", 
      fontSize: 18,
    },
    loginContent: {
      marginTop: 20,
      justifyContent: "center",
      flexDirection: "row",
      alignItems: "center",
    },
    loginText: {
      fontSize: 15,
      color: "gray",
      fontFamily: "Medium",
      textAlign: "center",
    },
  });