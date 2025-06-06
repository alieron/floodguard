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

const formatDate = (ms: number) => {
	const date = new Date(ms);
	return date.toLocaleString(undefined, {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
};

const formatTime = (ms: number) => {
	const date = new Date(ms);
	return date.toLocaleString(undefined, {
		hour: "numeric",
		minute: "2-digit",
	});
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
    reps.sort((a, b) => b.reportedAt - a.reportedAt);
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
          <ScrollView className="bg-white max-h-36 px-3 rounded-b-lg">
            {reports.map((report, index) => (
              <View key={report.id} className={`py-3 ${index === reports.length - 1 ? "" : "border-b"}`}>
                <Text className="font-bold text-sm mb-1.5">{formatDate(report.reportedAt)}</Text>
                <Text className="text-sm mb-1.5">
                  {report.description.length<=45 ? report.description : `${report.description.slice(0, 45).split(" ").slice(0, 8).join(" ")}...`}
                </Text>
                <Text className="text-xs text-gray-500 text-right">{formatTime(report.reportedAt)}</Text>
              </View>

            )
            )}
          </ScrollView>
        )}
      </View>
      <MapView
        style={{ flex: 1 }}
        initialRegion={singaporeRegion}
        showsUserLocation
        showsMyLocationButton
        onMapReady={() => getReports()}
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
