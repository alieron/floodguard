import React, { useEffect, useState } from "react";
import { Image, View, ScrollView, Text, TouchableOpacity } from "react-native";
import MapView, { Callout, Marker, Region } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { recentDocuments } from "../utils/appwrite";

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
  const [reports, setReports] = useState<ReportProps[]>([]);

  const getReports = async () => {
    const toCardProps = (data: any) => {
      return {
        id: data.$id,
        description: data.description,
        reportedAt: data.reportedAt,
        location: JSON.parse(data.location),
        imageUrl: data.imageUrls[0]
      } as ReportProps;
    };

    const reps: ReportProps[] = [];
    reps.push(...(await recentDocuments("reports")).documents.map((data) => toCardProps(data)));
    reps.sort((a, b) => a.reportedAt - b.reportedAt);
    setReports(reps);
  };

  const handleRefresh = () => {
    getReports();
  }

  useEffect(() => {
    getReports();
  }, []);

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
      <MapView
        style={{ flex: 1 }}
        initialRegion={singaporeRegion}
        showsUserLocation
        showsMyLocationButton
      >
        {reports.map((report) => (
          <Marker
            key={report.id}
            coordinate={{
              latitude: report.location.latitude,
              longitude: report.location.longitude,
            }}
          >
            <Callout tooltip>
              <View className="bg-white p-2 rounded-xl w-52 shadow-md">
                <Image
                  src={report.imageUrl}
                  className="w-full h-40 rounded-md"
                  resizeMode="cover"
                  alt={report.description}
                />
              </View>
            </Callout>
          </Marker>
        ))}

        <TouchableOpacity
          className="absolute bottom-4 right-4 p-2 bg-blue-600 rounded-full"
          onPress={handleRefresh}
        >
          <Ionicons name="refresh" size={24} color="white" />
        </TouchableOpacity>
      </MapView>
    </View >
  );
}
