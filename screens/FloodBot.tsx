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
  TouchableWithoutFeedback,
} from "react-native";
import { Dialogflow_V2 } from "react-native-dialogflow";

import {
  DIALOGFLOW_SERVICE_ACC,
  DIALOGFLOW_PRIVATE_KEY,
  DIALOGFLOW_PROJECT_ID
} from '@env';

Dialogflow_V2.setConfiguration(
  DIALOGFLOW_SERVICE_ACC,
  DIALOGFLOW_PRIVATE_KEY,
  Dialogflow_V2.LANG_ENGLISH,
  DIALOGFLOW_PROJECT_ID,
);

type Message = {
  text: string;
  from: "user" | "bot";
};

export default function FloodBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = (text: string) => {
    const userMessage: Message = { text, from: "user" };
    // const botMessage: Message = { text: "Echo: " + text, from: "bot" }; // Simulated
    setMessages((prev) => [userMessage, ...prev]);
    setInput("");
    Dialogflow_V2.requestQuery(
      text,
      (result: any) => {
        // Handle chatbot response
        const res = result;
        console.log(result);
        const chatbotResponse = res.queryResult.fulfillmentText as string;
        // Add the chatbot's response to the chat interface
        const botMessage: Message = {
          text: chatbotResponse,
          from: "bot",
        };
        setMessages((prev) => [botMessage, ...prev]);
      },
      error => {
        // Handle errors
        console.error('DialogFlow error:', error);
      }
    );
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      className={`my-1 px-3 py-2 mx-3 rounded-2xl ${
        item.from === "user" ? "bg-blue-500 self-end" : "bg-gray-200 self-start"
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
              onSubmitEditing={() => input && sendMessage(input)}
            />
            {/* <TouchableOpacity
              className="bg-blue-500 px-4 py-2 rounded-full"
              onPress={() => input && sendMessage(input)}
            >
              <Text className="text-white">Send</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}