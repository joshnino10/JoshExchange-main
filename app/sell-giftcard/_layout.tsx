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
      <CustomHeader title={title} />
    </View>
  </SafeAreaView>
);

export default function GiftCardlayout() {
  return (
    <Stack>
      <Stack.Screen
        name = 'index'
        options={{
          header: () => <SafeHead title="Sell Gift Card" />,
        }}
      />

      <Stack.Screen
         name = 'apple'
        options={{
          header: () => <SafeHead title="Sell Gift Card" />,
        }}
      />

      <Stack.Screen
         name = 'google'
        options={{
          header: () => <SafeHead title="Sell Gift Card" />,
        }}
      />

      <Stack.Screen
         name = 'steam'
        options={{
          header: () => <SafeHead title="Sell Gift Card" />,
        }}
      />
      <Stack.Screen
         name = 'ebay'
        options={{
          header: () => <SafeHead title="Sell Gift Card" />,
        }}
      />
      <Stack.Screen
         name = 'sephora'
        options={{
          header: () => <SafeHead title="Sell Gift Card" />,
        }}
      />
      <Stack.Screen
         name = 'razergold'
        options={{
          header: () => <SafeHead title="Sell Gift Card" />,
        }}
      />

     

    </Stack>
  );
}
