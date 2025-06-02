import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';

export default function Home() {
  const [expanded, setExpanded] = useState(false);
  const [addedPin, setAddedPin] = useState(false);
  const [visible, setVisible] = useState(false);

  return (
    <ImageBackground
      source={
        addedPin
          ? require("../assets/FloodMapAfter.png")
          : require("../assets/FloodMapBefore.png")
      }
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.header}
          onPress={() => setExpanded(!expanded)}
        >
          <Text style={styles.headerText}>ALERTS</Text>
          <FontAwesome
            name={expanded ? "chevron-up" : "chevron-down"}
            size={16}
            color="white"
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>

        {expanded && (
          <View style={styles.alertBox}>
            <Text style={styles.title}>Flash flood at King's Road</Text>
            <Text style={styles.message}>
              Flash flood occurred at King's Road (from Prince Road to Lutheran
              Road). Please avoid the area. PUB officers have been deployed to
              render assistance.
            </Text>
            <Text style={styles.time}>Issued at 1:03</Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={styles.pinsButton}
        onPress={() => setVisible(true)}
      />

      {visible && (
        <View style={styles.popup}>
          <View style={styles.popupHeader}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={require("../assets/FloodImageExample.png")}  // 🔥 Hardcoded here
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.timestamp}>Uploaded at 14:10</Text>
        </View>
      )}

      <TouchableOpacity 
        style={styles.refreshButton}
        onPress={() => setAddedPin(!addedPin)}
      >
        <FontAwesome name="refresh" size={24} color="black" />
      </TouchableOpacity>
       

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 80,
    alignSelf: "center",
    width: "90%",
    zIndex: 10,
  },
  header: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  alertBox: {
    backgroundColor: "white",
    padding: 12,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 4,
  },
  message: {
    fontSize: 13,
    marginBottom: 6,
  },
  time: {
    fontSize: 11,
    color: "gray",
    textAlign: "right",
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  refreshButton: {
    position: "absolute",
    bottom: 100,
    right: 30,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 999,
  },
  pinsButton: {
    position: "absolute",
    top: 450,      // adjust vertically
    left: 160,     // adjust horizontally
    width: 50,     // touch area width
    height: 55,    // touch area height
    backgroundColor: "transparent", // or "rgba(0,0,0,0.2)" for testing
  },
  popup: {
    position: "absolute",
    top: 150,
    alignSelf: "center",
    width: "85%",
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    zIndex: 10,
    paddingBottom: 10,
  },
  popupHeader: {
    backgroundColor: "#007BFF",
    padding: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "flex-end",
  },
  closeButton: {
    color: "white",
    fontSize: 18,
    paddingHorizontal: 5,
  },
  image: {
    width: "100%",
    height: 200,
  },
  timestamp: {
    fontSize: 12,
    textAlign: "right",
    marginTop: 4,
    marginRight: 10,
    color: "gray",
  },
})