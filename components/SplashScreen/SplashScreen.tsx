import { StatusBar, StyleSheet, View } from "react-native";
import Animated, { BounceInDown, BounceInRight, } from "react-native-reanimated";

export default function CustomSplashScreen() {
  return ( 
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor='#0000cd'/>
      <View>
        <Animated.Image entering={BounceInDown}
          style={styles.img}
          source={require("../../assets/images/salary.png")}
        />

        <Animated.Text entering={BounceInRight}
         style={styles.text}>Josh Exchange</Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0000cd",
  },

  img: {
    alignSelf: "center",
    width: 250,
    height: 250,
    resizeMode: "contain",
  },

  text: {
    marginTop: 10,
    textAlign: "center",
    color: "white",
    fontFamily: "Bold",
    fontSize: 30,
  },
});
