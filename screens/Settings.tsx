import React, { useState } from "react";
import { View, Text, Switch } from "react-native";

function SettingRow({ label, value, onChange }: { label: string, value: boolean, onChange: React.Dispatch<React.SetStateAction<boolean>>}) {
  return (
    <View className="flex-row justify-between items-center mb-3">
      <Text className="text-[15px] text-neutral-900">{label}</Text>
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
    <View className="flex-1 bg-sky-200 px-5 pt-20">
      <View className="flex-row justify-center mb-6">
        <Text className="text-[25px] font-bold text-neutral-900">
          SETTINGS
        </Text>
      </View>

      <View className="mb-6">
        <Text className="text-base font-bold mb-3 text-neutral-900">
          NOTIFICATIONS
        </Text>
        <SettingRow label="Push notifications" value={pushNoti} onChange={setPushNoti} />
        <SettingRow label="Email notifications" value={emailNoti} onChange={setEmailNoti} />
        <SettingRow label="In-app notifications" value={inAppNoti} onChange={setInAppNoti} />
      </View>

      <View className="mb-6">
        <Text className="text-base font-bold mb-3 text-neutral-900">
          ALERTS
        </Text>
        <SettingRow label="Flash flood warnings" value={floodAlert} onChange={setFloodAlert} />
        <SettingRow label="Heavy rain warnings" value={rainAlert} onChange={setRainAlert} />
        <SettingRow label="Alerts from PUB" value={pubAlert} onChange={setPubAlert} />
      </View>
    </View>
  );
}