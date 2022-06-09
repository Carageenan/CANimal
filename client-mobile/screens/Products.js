import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, FlatList, Image, ScrollView, Button, TouchableHighlight } from "react-native";
import { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_ALL_CATEGORIES, GET_ALL_PRODUCTS } from "../config/queries";
import tw from "twrnc";

export default function Products({ navigation }) {
  const { loading, error, data, refetch } = useQuery(GET_ALL_PRODUCTS);
  const { loading: loading2, error: error2, data: dataCategories } = useQuery(GET_ALL_CATEGORIES);

  console.log(data);
  const listProducts = () => {
    if (loading)
      return (
        <View style={{ marginHorizontal: 134, marginVertical: 160 }}>
          <Text style={{ fontSize: 30 }}>Loading...</Text>
        </View>
      );
    if (error)
      return (
        <View style={{ marginHorizontal: 134, marginVertical: 160 }}>
          <Text style={{ fontSize: 30 }}>Error.</Text>
        </View>
      );
    if (data && data.products.length === 0) {
      return (
        <View style={{ marginHorizontal: 134, marginVertical: 160 }}>
          <Text style={{ fontSize: 30 }}>No Product</Text>
        </View>
      );
    } else {
      return (
        <FlatList
          horizontal={true}
          data={data && data.products}
          renderItem={({ item }) => {
            return (
              <View style={tw`flex w-104 h-90 shadow-lg pt-10 border-2`}>
                <Image style={tw`w-45 h-35 mx-auto`} source={{ uri: item.mainImg }} alt="Products" />
                <View style={tw`px-1 pt-5`}>
                  <View>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.name}</Text>
                  </View>
                </View>
                <View style={tw`px-1 pt-5 pb-1`}>
                  <Text
                    style={{
                      fontSize: 15,
                    }}
                  >
                    Price:
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      borderRadius: 10,
                      borderWidth: 1,
                      backgroundColor: "#614124",
                      padding: 5,
                      color: "white",
                    }}
                  >
                    {rupiah(item.price)}
                  </Text>
                </View>
                <View style={{ paddingTop: 20 }}>
                  <Button
                    onPress={() =>
                      navigation.navigate("Details", {
                        id: item.id,
                      })
                    }
                    color={"#614124"}
                    title="Details"
                  />
                </View>
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      );
    }
  };

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  if (loading) return <Text>Loading...</Text>;

  if (error) return <Text>Error!</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={tw`flex flex-row justify-center`}>
          <Text style={tw`text-5xl text-center`}>CANimal</Text>
          <Image source={require("../data/paw.png")} style={tw`w-12 h-11 ml-2`} />
        </View>
        <ScrollView horizontal={true}>
          <View>
            <Image
              source={{ uri: "https://asset.kompas.com/crops/4rd6Do4P0raXCBV_R9iKiIF0nJ8=/0x0:6250x4167/750x500/data/photo/2020/12/11/5fd376d715d1f.jpg" }}
              style={{ height: 300, width: 415 }}
            />
          </View>
          <View>
            <Image source={{ uri: "https://www.whiskas.me/areas/en/assets/img/products/pListKitten-xs.jpg" }} style={{ height: 300, width: 415 }} />
          </View>
          <View>
            <Image
              source={{
                uri: "https://rsvzprod.pspcdn.com/-/media/images/psp/brands/brand-landing/royal-canin-brand-page-puppy-and-kitten-2020-02.jpg?h=449&iar=0&w=639&rev=1584c032c0dc4883af742c35c1019310&hash=5FD5577EA49742DDBC36A249D2AB02B5",
              }}
              style={{ height: 300, width: 415 }}
            />
          </View>
          <View>
            <Image
              source={{
                uri: "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/12/21/2334e559-5c03-4938-9b8e-46ddd545d43c.png",
              }}
              style={{ height: 300, width: 415 }}
            />
          </View>
        </ScrollView>
      </View>
      <View style={styles.product}>
        <View style={{ paddingTop: 5 }}>
          <Text style={tw`text-2xl`}>Categories</Text>
          <ScrollView
            style={{
              paddingTop: 0,
            }}
            horizontal={true}
          >
            <TouchableHighlight
              style={{
                borderRadius: 10,
              }}
              underlayColor="black"
              onPress={() => {
                refetch({ page: "1", size: "10", filter: "" });
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  borderColor: "black",
                  borderRadius: 10,
                  borderStyle: "dashed",
                  borderWidth: 2,
                  height: 30,
                  width: 110,
                  textAlign: "center",
                  margin: 1,
                  padding: 1,
                }}
              >
                allProducts
              </Text>
            </TouchableHighlight>
            {dataCategories &&
              dataCategories.categories.map((item) => {
                return (
                  <TouchableHighlight
                    key={item.id}
                    style={{
                      borderRadius: 10,
                    }}
                    underlayColor="black"
                    onPress={() => {
                      refetch({ page: "1", size: "10", filter: item.id });
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        borderColor: "black",
                        borderRadius: 10,
                        borderStyle: "dashed",
                        borderWidth: 2,
                        height: 30,
                        width: 110,
                        textAlign: "center",
                        margin: 1,
                        padding: 1,
                      }}
                    >
                      {item.name}
                    </Text>
                  </TouchableHighlight>
                );
              })}
          </ScrollView>
        </View>
        <View style={styles.productByCategoryList}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {"Products"}
          </Text>
          {listProducts()}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E4D1B9",
  },
  header: {
    flex: 2.5,
  },
  product: {
    flex: 3.5,
  },
  productByCategoryList: {
    flex: 1,
    paddingTop: 20,
  },
});
