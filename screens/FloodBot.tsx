import { Text, View } from 'react-native';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import React, { useCallback, useState } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

import {
  DIALOGFLOW_SERVICE_ACC,
  DIALOGFLOW_PRIVATE_KEY,
  DIALOGFLOW_PROJECT_ID
} from '@env';

Dialogflow_V2.setConfiguration(
  DIALOGFLOW_SERVICE_ACC,
  DIALOGFLOW_PRIVATE_KEY,
  'en',
  DIALOGFLOW_PROJECT_ID,
);

interface DialogflowResult {
  queryResult: {
    fulfillmentText: string;
  };
}

function FloodBot() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const onSend = (newMessages: IMessage[] = []) => {
    setMessages(prev => GiftedChat.append(prev, newMessages));
    const userMessage = newMessages[0].text;
    Dialogflow_V2.requestQuery(
      userMessage,
      (result: object) => {
        // Handle chatbot response
        const res = result as DialogflowResult;
        const chatbotResponse = res.queryResult.fulfillmentText;
        // Add the chatbot's response to the chat interface
        const botMessage = {
          _id: Math.random().toString(36).substring(7),
          text: chatbotResponse,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Floodbot',
            avatar: 'https://imgur.com/7k12EPD' //Can replace this with FloodGuard image
          },
        };
        setMessages(previousMessages => GiftedChat.append(previousMessages, [botMessage]));
      },
      error => {
        // Handle errors
        console.error('DialogFlow error:', error);
      }
    );
  };
  return (
    <GiftedChat
      messages={messages}
      onSend={newMessages => onSend(newMessages)}
      user={{
        _id: 1,
      }}
    />
  );
}

export default FloodBot();