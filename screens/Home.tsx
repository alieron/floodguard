import React, { useEffect, useState } from "react";
import { Image, View, ScrollView, Text, TouchableOpacity } from "react-native";
import MapView, { Callout, Marker, Region } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

const singaporeRegion: Region = {
  latitude: 1.3521,
  longitude: 103.8198,
  latitudeDelta: 0.08,
  longitudeDelta: 0.08,
};

interface ReportProps {
  id: string,
  description: string,
  reportedAt: number,
  location: { latitude: number, longitude: number },
  imageUrl: string,
};

export default function Home() {
  const [expanded, setExpanded] = useState(false);
  const [addedPin, setAddedPin] = useState(false);
  const [visible, setVisible] = useState(false);
  const handleRefresh = () => {
  }

  return (
    <View className="flex-1 mb-20">
      <View className="absolute top-12 self-center w-[90%] z-10">
        <TouchableOpacity
          className={`bg-blue-600 px-4 py-3 flex-row justify-center items-center ${expanded ? "rounded-t-lg" : "rounded-lg"}`}
          onPress={() => setExpanded(!expanded)}
        >
          <Text className="text-white font-bold text-base">ALERTS</Text>
          <Ionicons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={20}
            color="white"
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>

        {expanded && (
          <View className="bg-white p-3 rounded-b-lg">
            <Text className="font-bold text-sm mb-1.5">Flash flood at King's Road</Text>
            <Text className="text-xs mb-1.5">
              Flash flood occurred at King's Road (from Prince Road to Lutheran
              Road). Please avoid the area. PUB officers have been deployed to
              render assistance.
            </Text>
            <Text className="text-[11px] text-gray-500 text-right">Issued at 1:03</Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        className="absolute top-[450px] left-[160px] w-[50px] h-[55px] bg-transparent"
        onPress={() => setVisible(true)}
      />

      {visible && (
        <View className="absolute top-[150px] self-center w-[85%] bg-white rounded-lg z-10 shadow-md pb-2">
          <View className="bg-blue-600 p-2 rounded-t-lg items-end">
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Text className="text-white text-lg px-1.5">✕</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={require("../assets/FloodImageExample.png")}
            className="w-full h-[200px]"
            resizeMode="cover"
          />
          <Text className="text-xs text-right mt-1 mr-2 text-gray-500">Uploaded at 14:10</Text>
        </View>
      )}
      <MapView
        style={{ flex: 1 }}
        initialRegion={singaporeRegion}
        showsUserLocation
        showsMyLocationButton
      >
      </MapView>
    </View >
  );
}
