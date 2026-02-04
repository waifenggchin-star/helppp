import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Send, Bot, User } from 'lucide-react-native';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
// IMPORTANT: In a real app, this should be in an environment variable (e.g. process.env.EXPO_PUBLIC_GEMINI_API_KEY)
// For this demo, we'll use a placeholder. User needs to replace this.
const API_KEY = 'AIzaSyD4DQaTaIDzBNAMGxrOUg7S5fUMEkk7leM'; 

export const ChatScreen = ({ navigation }: any) => {
  const { colors, typography, spacing } = useTheme();
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '你好！我是 Helppp 智能助手。有什么不懂的流程，随时问我！\n\n例如：\n“怎么申请国际驾照？”\n“护照丢了怎么办？”',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (inputText.trim().length === 0) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      // Initialize Gemini only when needed to prevent app crash on load
      const genAI = new GoogleGenerativeAI(API_KEY);
      // Use Gemini Pro model
      const model = genAI.getGenerativeModel({ model: "gemini-pro"});
      
      // Context prompt to ensure simplified, China-specific answers
      const prompt = `
        你是一个专门帮助中国国内人群（特别是老年人和认知水平较低者）的社会生存助手。
        请使用简体中文，语气亲切，将复杂的流程简化为 1, 2, 3 步。
        请熟悉中国国内的政务（如 12345 ）、医疗、交通系统。
        针对这个问题：${userMsg.text}
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: text,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "抱歉，我暂时连接不上大脑了。请检查网络或 API Key 设置。",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isBot = item.sender === 'bot';
    return (
      <View style={[
        styles.messageContainer, 
        isBot ? styles.botMessageContainer : styles.userMessageContainer
      ]}>
        {isBot && (
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <Bot size={20} color="#FFF" />
          </View>
        )}
        <View style={[
          styles.bubble, 
          isBot ? 
            { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border } : 
            { backgroundColor: colors.primary }
        ]}>
          <Text style={[
            styles.messageText, 
            { color: isBot ? colors.text : '#FFF', fontSize: typography.baseSize }
          ]}>
            {item.text}
          </Text>
        </View>
        {!isBot && (
          <View style={[styles.avatar, { backgroundColor: '#9ca3af', marginLeft: 8, marginRight: 0 }]}>
            <User size={20} color="#FFF" />
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft color={colors.text} size={24} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text, fontSize: typography.titleSize }]}>
          智能对话
        </Text>
      </View>

      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: spacing.padding }}
        style={{ flex: 1 }}
      />

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <View style={[styles.inputContainer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
          <TextInput
            style={[
              styles.input, 
              { 
                backgroundColor: colors.background, 
                color: colors.text,
                fontSize: typography.baseSize,
                borderRadius: spacing.borderRadius,
                borderColor: colors.border
              }
            ]}
            placeholder="请输入您的问题..."
            placeholderTextColor={colors.subText}
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <TouchableOpacity 
            style={[styles.sendButton, { backgroundColor: colors.primary }]} 
            onPress={sendMessage}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFF" size="small" />
            ) : (
              <Send size={20} color="#FFF" />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '100%',
  },
  botMessageContainer: {
    alignSelf: 'flex-start',
    marginRight: 40,
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    marginLeft: 40,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  bubble: {
    padding: 12,
    borderRadius: 16,
    maxWidth: '85%',
  },
  messageText: {
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'flex-end',
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    marginRight: 12,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
