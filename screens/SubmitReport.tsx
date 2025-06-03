import { Text, View, TouchableOpacity, Alert, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import React, { useState } from "react";
import ReportFormBox from "../components/ReportFormBox";

export default function SubmitReport() {
  return (
    <View className="flex-1 justify-center items-center bg-blue-300">
      <Text className="text-center text-black text-lg text-3xl">
        SUBMIT A REPORT
      </Text>
      
      <ReportFormBox
        headerText="Step 1: Upload Image"
        subtitle="Take a picture or choose from your library."
      >
        <View className="w-full h-full flex-row justify-center items-center">
          <TouchableOpacity>
            <Ionicons name="camera-outline" size={50} margin={20} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="image-outline" size={50} margin={20} />
          </TouchableOpacity>
        </View>
      </ReportFormBox>

      <View className="bg-white w-10/12 h-1/5 rounded-2xl m-5">
        <Text className="text-3xl bg-blue-600 rounded-t-2xl p-2 text-center text-white">
          Step 2: Select Location
        </Text>
        <View className="items-center h-full w-full">
          <Text className="p-2">Select location or use current location.</Text>
          <View className="rounded-2xl ring-black ring-2 w-11/12 h-1/2 justify-center items-center flex-row"></View>
        </View>
      </View>

      <View className="bg-white w-10/12 h-1/5 rounded-2xl m-5">
        <Text className="text-3xl bg-blue-600 rounded-t-2xl p-2 text-center text-white">
          Step 2: Select Location
        </Text>
        <View className="items-center h-full w-full">
          <Text className="p-2">
            Take a picture or choose from your library.
          </Text>
          <View className="rounded-2xl ring-black ring-2 w-11/12 h-1/2 justify-center items-center flex-row">
            <TouchableOpacity>
              <Ionicons name="camera-outline" size={50} margin={20} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="image-outline" size={50} margin={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
