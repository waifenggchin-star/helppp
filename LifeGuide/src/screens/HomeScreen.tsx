import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Settings, BarChart3 } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';

export const HomeScreen = ({ navigation }: any) => {
  const { theme } = useTheme();

  const handleStartTask = () => {
    // 暂时先跳转到之前的列表页，或者根据需求调整
    // 这里我们假设原来的列表就是"开始任务"的入口
    // 如果没有专门的任务列表页，可以暂时弹窗或不做操作
    // 但为了体验，我们尝试复用现有的逻辑，或者展示原来的分类列表
    // 鉴于之前的布局是直接展示列表，这里我们可以把"开始任务"定义为展示分类选择
    // 为了简单起见，暂时保留当前页面的列表逻辑，或者创建一个新页面。
    // 但用户要求"改成...首页"，说明原来的列表可能要移到别处。
    // 既然用户只说了首页 UI，那点击"开始任务"我让它显示原来的场景列表吧。
    // 但是这里我没有创建新页面，所以只能在当前页面通过状态控制，或者假设有一个 'TaskSelection' 页面。
    // 为了不报错，我先只打印 log 或 Alert。
    Alert.alert("提示", "功能开发中...");
  };

  const handleSettings = () => {
    Alert.alert("设置", "设置中心开发中...");
  };

  const handleProgress = () => {
    Alert.alert("进度", "查看进度功能开发中...");
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        // 深色渐变：从深蓝/紫到黑色
        colors={['#1e3c72', '#2a5298', '#000000']}
        style={styles.background}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.contentContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.welcomeText}>Helppp 助手</Text>
              <Text style={styles.subText}>你的生活生存指南</Text>
            </View>

            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.actionButton} onPress={handleStartTask}>
                <View style={styles.iconCircle}>
                  <Play size={32} color="#FFF" fill="#FFF" />
                </View>
                <Text style={styles.buttonText}>开始任务</Text>
              </TouchableOpacity>

              <View style={styles.rowButtons}>
                <TouchableOpacity style={[styles.smallButton, { marginRight: 15 }]} onPress={handleSettings}>
                  <Settings size={24} color="#FFF" />
                  <Text style={styles.smallButtonText}>设置中心</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.smallButton} onPress={handleProgress}>
                  <BarChart3 size={24} color="#FFF" />
                  <Text style={styles.smallButtonText}>查看进度</Text>
                </TouchableOpacity>
              </View>
            </View>
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
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subText: {
    fontSize: 18,
    color: '#E0E0E0',
    opacity: 0.8,
  },
  buttonGroup: {
    width: '100%',
    paddingBottom: 40,
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4facfe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    shadowColor: '#4facfe',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallButton: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  smallButtonText: {
    color: '#FFFFFF',
    marginTop: 8,
    fontWeight: '600',
    fontSize: 14,
  },
});
