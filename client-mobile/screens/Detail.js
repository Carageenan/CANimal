import { View, Text, SafeAreaView, StyleSheet, Image, ScrollView, TouchableHighlight } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_BY_ID } from "../config/queries";
import tw from "twrnc";

export default function Details({ route, navigation }) {
  const { id } = route.params;
  const { loading, error, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id },
  });

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const toHome = () => {
    navigation.navigate("Products");
  };

  console.log(data);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error!</Text>;

  return (
    <SafeAreaView style={style.container}>
      <View style={style.picture}>
        <TouchableHighlight underlayColor="#E4D1B9" onPress={() => toHome()}>
          <View on style={tw`flex flex-row justify-center`}>
            <Text style={tw`text-5xl text-center`}>CANimal</Text>
            <Image source={require("../data/paw.png")} style={tw`w-12 h-11 ml-2`} />
          </View>
        </TouchableHighlight>
        <ScrollView horizontal={true}>
          <Image style={tw`h-100 w-105`} source={{ uri: data && data.product.mainImg }} />
          {data &&
            data.product.Images.map((el) => {
              return <Image key={el.id} source={{ uri: el.imgUrl }} style={tw`h-100 w-105`} />;
            })}
        </ScrollView>
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
          }}
          horizontal={true}
        >
          <View style={tw``}>
            <Image
              style={{
                borderWidth: 1,
                borderColor: "#614124",
                height: 100,
                width: 100,
              }}
              source={{ uri: data.product.mainImg }}
            />
          </View>
          {data.product.Images.map((el) => {
            return (
              <Image
                key={el.id}
                source={{ uri: el.imgUrl }}
                style={{
                  borderWidth: 1,
                  borderColor: "#614124",
                  height: 100,
                  width: 100,
                }}
              />
            );
          })}
        </ScrollView>
        <Text
          style={{
            fontSize: 15,
          }}
        >
          Author: {data.product.author.username}
        </Text>
      </View>
      <View style={style.content}>
        <View style={{ marginTop: 5, flex: 1 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {data.product.name}
          </Text>
        </View>
        <View
          style={{
            flex: 5,
          }}
        >
          <View style={{ marginTop: 10, flex: 1 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              Price:
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontSize: 15,
              }}
            >
              {rupiah(data.product.price)}
            </Text>
          </View>
          <View style={{ marginTop: 20, flex: 3 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              Description:
            </Text>
            <Text
              style={{
                marginTop: 10,
              }}
            >
              {data.product.description}
            </Text>
          </View>
          <View style={{ marginTop: 10, flex: 1 }}>
            <View style={tw`flex flex-row justify-end`}>
              <TouchableHighlight style={{ borderRadius: 10, borderWidth: 2, margin: 1 }} underlayColor="black" onPress={() => toHome()}>
                <Text style={{ fontSize: 20, padding: 2, height: 30, width: 100, textAlign: "center" }}>Back</Text>
              </TouchableHighlight>
              <TouchableHighlight style={{ borderRadius: 10, borderWidth: 2, margin: 1 }} underlayColor="black" onPress={() => {}}>
                <Text style={{ fontSize: 20, padding: 2, height: 30, width: 100, textAlign: "center" }}>Buy Now!</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E4D1B9",
  },
  picture: {
    flex: 4,
  },
  content: {
    flex: 2,
    borderRadius: 10,
    borderWidth: 2,
    padding: 5,
    margin: 2,
  },
});
