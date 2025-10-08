import CustomHeader from "@/components/CustomHeader/CustomHeader";
import { Stack } from "expo-router";
import { Platform, SafeAreaView, StatusBar, View } from "react-native";

const SafeHead = ({ title }: { title: string }) => (
  <SafeAreaView
    style={{
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      backgroundColor: "white",
      paddingHorizontal: 20,
    }}
  >
    <View>
      <CustomHeader title={title}/>
    </View>
  </SafeAreaView>
);

export default function Cryptolayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: ()=> <SafeHead title="Sell crypto" />,
        }}  
      />

      <Stack.Screen
        name="bitcoin"
        options={{
          header: ()=> <SafeHead title="Deposit BTC"/>,
        }}
      />

      <Stack.Screen
        name="ethereum"
        options={{
          header: ()=> <SafeHead title="Deposit Ethereum"/>,
        }}
      />

      <Stack.Screen
        name="usdt-erc"
        options={{
          header: ()=> <SafeHead title="Deposit Usdt(ERC)"/>,
        }}
      />

      <Stack.Screen
        name="usdt-trc"
        options={{
          header: () => <SafeHead title="Deposit Usdt(TRC)"/>,
        }}
      />
      
      <Stack.Screen
        name="usdt-bep"
        options={{
          header: () => <SafeHead title="Deposit Usdt(Bep)"/>,
        }}
      />
      
      <Stack.Screen
        name="tron"
        options={{
          header: () => <SafeHead title="Deposit TRON" />,
        }}
      />
    </Stack>
  );
}
