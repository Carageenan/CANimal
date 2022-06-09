import { Text, StyleSheet, ImageBackground, View, Button } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

export default function GettingStarted({ navigation }) {
  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1595876102398-e9260821d768?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZG9nJTIwaW4lMjBuYXR1cmV8ZW58MHx8MHx8&w=1000&q=80",
      }}
      resizeMode="cover"
      style={styles.image}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text
            style={{
              textAlign: "center",
              color: "silver",
              fontWeight: "bold",
              backgroundColor: "rgba(52, 52, 52, 0.8)",
              marginTop: 170,
              fontSize: 20,
            }}
          >
            CANimal is an app that will offering you with best products for your lovely pet!
          </Text>
        </View>
        <View style={styles.bottom}>
          {/* <Text>Hallo Uti happy kiyowo!!💐💕</Text> */}
          <Button title="Get Started" onPress={() => navigation.navigate("Products")} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    flex: 4,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  bottom: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
  },
});
