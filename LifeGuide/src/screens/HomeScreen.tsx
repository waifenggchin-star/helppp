import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MessageSquare, ListTodo, FolderKanban, ChevronRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export const HomeScreen = ({ navigation }: any) => {

  const handleSmartChat = () => {
    Alert.alert("智能对话", "即将接入 AI 助手...");
  };

  const handleTaskList = () => {
    // 假设这是原来的“生活场景百科”入口
    Alert.alert("任务清单", "正在加载生活任务...");
  };

  const handleMyProjects = () => {
    Alert.alert("我的项目", "查看我的进度...");
  };

  const CardButton = ({ 
    title, 
    subtitle, 
    icon: Icon, 
    onPress, 
    color 
  }: { 
    title: string; 
    subtitle: string; 
    icon: any; 
    onPress: () => void; 
    color: string;
  }) => (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']}
        style={styles.cardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={[styles.iconBox, { backgroundColor: color }]}>
          <Icon size={28} color="#FFF" />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSubtitle}>{subtitle}</Text>
        </View>
        <ChevronRight size={24} color="rgba(255,255,255,0.4)" />
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        // 深蓝 (#0f172a) -> 紫色 (#581c87) -> 深黑 (#000000)
        colors={['#0f172a', '#3b0764', '#000000']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <Text style={styles.appTitle}>Helppp AI 助手</Text>
            <View style={styles.titleUnderline} />
            <Text style={styles.appSlogan}>你的全能生活向导</Text>
          </View>

          <View style={styles.cardContainer}>
            <CardButton 
              title="智能对话" 
              subtitle="有问题？随时问我"
              icon={MessageSquare}
              onPress={handleSmartChat}
              color="#8b5cf6" // Violet
            />
            
            <CardButton 
              title="任务清单" 
              subtitle="生活技能 Step-by-Step"
              icon={ListTodo}
              onPress={handleTaskList}
              color="#ec4899" // Pink
            />
            
            <CardButton 
              title="我的项目" 
              subtitle="查看学习与成长进度"
              icon={FolderKanban}
              onPress={handleMyProjects}
              color="#3b82f6" // Blue
            />
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>Powered by Trae & Gemini</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 40,
    marginBottom: 50,
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    // 发光效果
    textShadowColor: 'rgba(139, 92, 246, 0.8)', // 紫色光晕
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
    marginBottom: 8,
  },
  titleUnderline: {
    width: 60,
    height: 4,
    backgroundColor: '#8b5cf6',
    borderRadius: 2,
    marginBottom: 16,
  },
  appSlogan: {
    fontSize: 16,
    color: '#cbd5e1',
    letterSpacing: 1,
    opacity: 0.8,
  },
  cardContainer: {
    flex: 1,
    gap: 20,
  },
  card: {
    width: '100%',
    height: 100,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#cbd5e1',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: 12,
  },
});
