import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from "react-native";

function SettingRow({ label, value, onChange }) {
  return (
    <View style={styles.settingRow}>
      <Text style={styles.settingText}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onChange}
        thumbColor="white"
        trackColor={{ true: "#0B64F0", false: "#ccc" }}
      />
    </View>
  );
}

export default function Settings() {
  const [pushNoti, setPushNoti] = useState(true);
  const [emailNoti, setEmailNoti] = useState(true);
  const [inAppNoti, setInAppNoti] = useState(true);
  const [floodAlert, setFloodAlert] = useState(true);
  const [rainAlert, setRainAlert] = useState(true);
  const [pubAlert, setPubAlert] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SETTINGS</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>NOTIFICATIONS</Text>
        <SettingRow label="Push notifications" value={pushNoti} onChange={setPushNoti} />
        <SettingRow label="Email notifications" value={emailNoti} onChange={setEmailNoti} />
        <SettingRow label="In-app notifications" value={inAppNoti} onChange={setInAppNoti} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ALERTS</Text>
        <SettingRow label="Flash flood warnings" value={floodAlert} onChange={setFloodAlert} />
        <SettingRow label="Heavy rain warnings" value={rainAlert} onChange={setRainAlert} />
        <SettingRow label="Alerts from PUB" value={pubAlert} onChange={setPubAlert} />
      </View>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a3d9ff",
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginBottom: 24,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#1A1A1A",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  settingText: {
    fontSize: 15,
    color: "#1A1A1A",
  },
});