import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import { GoogleGenAI } from "@google/genai";

import {
  GEMINI_API_KEY
} from '@env';


type Message = {
  text: string;
  from: "user" | "bot";
};

export default function FloodBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  const sendMessage = async (text: string) => {
    const userMessage: Message = { text, from: "user" };
    // const botMessage: Message = { text: "Echo: " + text, from: "bot" }; // Simulated
    setMessages((prev) => [userMessage, ...prev]);
    setInput("");

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: text,
      config: {
        systemInstruction: "You are Floodbot, a flood assistant, users from Singapore may ask you questions when encoutering floods, help them by providing advice on how to remain safe. In Singapore, 995 is the number for the SCDF."
      }
    });
    const outText = response.text as string;
    console.log(outText)
    setMessages((prev) => [{ text: outText, from: "bot" }, ...prev])
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      className={`my-1 px-3 py-2 mx-3 rounded-2xl ${item.from === "user" ? "bg-blue-500 self-end" : "bg-gray-200 self-start"
        }`}
    >
      <Text className={item.from === "user" ? "text-white" : "text-black"}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white mb-20"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90} // Adjusted for keyboard height
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1">
          <FlatList
            className="flex-1"
            data={messages}
            renderItem={renderItem}
            keyExtractor={(_, i) => i.toString()}
            inverted
            contentContainerStyle={{ paddingBottom: 20 }}
          />
          <View className="flex-row items-center border-t border-gray-300 px-3 py-2 bg-white">
            <TextInput
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 mr-2"
              value={input}
              onChangeText={setInput}
              placeholder="Type your message..."
              returnKeyType="send"
              onSubmitEditing={() => input !== "" && sendMessage(input)}
            />
            <TouchableOpacity
              className="bg-blue-600 px-4 py-2 rounded-full"
              onPress={() => input && sendMessage(input)}
            >
              <Text className="text-white">Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}