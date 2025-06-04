import { Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import React, { useState } from "react";
import ReportFormBox from "../components/ReportFormBox";

export default function SubmitReport() {
  return (
    <View className="flex-1 px-5 pt-20 items-center bg-blue-300">
      <View className="flex-row justify-center gap-3 mb-6">
        <Text className="text-center text-black text-3xl">SUBMIT A REPORT</Text>
      </View>

      <View>
      <ReportFormBox
        headerText="Step 1: Upload Image"
        subtitle="Take a picture or choose from your library."
      >
        <View className="flex-row justify-center items-center">
          <TouchableOpacity className="justify-center items-center mr-10">
            <Ionicons name="camera-outline" size={50} />
            <Text>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity className="justify-center items-center ml-10">
            <Ionicons name="image-outline" size={50} />
            <Text>Gallery</Text>
          </TouchableOpacity>
        </View>
      </ReportFormBox>

      <ReportFormBox
        headerText="Step 2: Select Location"
        subtitle="Use current location or select location."
      >
        <View className="justify-center items-center">
          <TouchableOpacity className="bg-blue-600 rounded p-2">
            <Text className="text-white">Detect location</Text> {/* how... */}
          </TouchableOpacity>
          {/* another option of manually searching your location? */}
        </View>
      </ReportFormBox>

      <TouchableOpacity className="bg-blue-600 rounded-2xl p-2 m-5">
        <Text className="text-white text-center text-3xl">SUBMIT</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}
