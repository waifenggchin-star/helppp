import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Send, Bot, User } from 'lucide-react-native';

// MOCK DATA ONLY - NO API CALLS
const MOCK_RESPONSE = "这是测试模式。你的问题我已经收到，但我现在没有连接大脑（API已移除）。请在后续版本中恢复 API 连接。";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const ChatScreen = ({ navigation }: any) => {
  const { colors, typography, spacing } = useTheme();
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '你好！我是 Helppp 智能助手（离线版）。\n\n目前我只能进行简单的回应测试。',
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

    // Simulate network delay
    setTimeout(() => {
        const botMsg: Message = {
            id: (Date.now() + 1).toString(),
            text: MOCK_RESPONSE,
            sender: 'bot',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, botMsg]);
        setIsLoading(false);
    }, 1000);
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
          isBot ? { backgroundColor: colors.card, borderTopLeftRadius: 4 } : { backgroundColor: colors.primary, borderTopRightRadius: 4 },
          { padding: spacing.padding }
        ]}>
          <Text style={[
            styles.messageText, 
            { fontSize: typography.baseSize },
            isBot ? { color: colors.text } : { color: '#FFF' }
          ]}>
            {item.text}
          </Text>
        </View>
        {!isBot && (
          <View style={[styles.avatar, { backgroundColor: colors.secondary, marginLeft: 8, marginRight: 0 }]}>
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
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text, fontSize: typography.headerSize }]}>
          智能助手 (离线测试)
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={[styles.listContent, { padding: spacing.padding }]}
        inverted={false}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        style={[styles.inputContainer, { borderTopColor: colors.border, backgroundColor: colors.card }]}
      >
        <TextInput
          style={[
            styles.input, 
            { 
              backgroundColor: colors.background, 
              color: colors.text,
              fontSize: typography.baseSize,
              padding: spacing.padding,
              borderRadius: spacing.borderRadius
            }
          ]}
          value={inputText}
          onChangeText={setInputText}
          placeholder="请输入问题..."
          placeholderTextColor={colors.subText}
          multiline
        />
        <TouchableOpacity 
          onPress={sendMessage} 
          disabled={isLoading || inputText.trim().length === 0}
          style={[
            styles.sendButton, 
            { 
              backgroundColor: colors.primary,
              opacity: (isLoading || inputText.trim().length === 0) ? 0.5 : 1
            }
          ]}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFF" size="small" />
          ) : (
            <Send size={24} color="#FFF" />
          )}
        </TouchableOpacity>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '100%',
  },
  botMessageContainer: {
    justifyContent: 'flex-start',
    paddingRight: 40,
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
    paddingLeft: 40,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  bubble: {
    borderRadius: 16,
    maxWidth: '100%',
  },
  messageText: {
    lineHeight: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    marginRight: 12,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
