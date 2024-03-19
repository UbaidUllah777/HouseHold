import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

export default function FoodImage({ children }) {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingTop:10,
        paddingBottom:20
      }}
    >
            <View 
            
            style={{
                backgroundColor: "#fff",
                height: 190,
                width: 190,
                borderRadius: 30,
                justifyContent: "center",
                alignItems: "center",
                }}


            >
            {children ? (
                    children
                ) : (
                    <Image
                    source={require("../../assets/cocoloate.png")}
                    style={{ resizeMode: "contain", width: 100, height: 100 }}
                    />
                )}
            </View>
    </View>
  );
}

const styles = StyleSheet.create({});
