import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MessageSquare, Stethoscope, TrainFront, FileText, HeartHandshake, Phone, Settings } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

export const HomeScreen = ({ navigation }: any) => {
  const { colors, typography, spacing, mode, setMode } = useTheme();

  const handleWhatsApp = () => {
    Linking.openURL('https://wa.me/60123456789'); // Replace with actual number
  };

  const categories = [
    { id: 'medical', name: '医院挂号', icon: Stethoscope, color: '#ec4899' },
    { id: 'transport', name: '交通出行', icon: TrainFront, color: '#3b82f6' },
    { id: 'docs', name: '办事指南', icon: FileText, color: '#f59e0b' },
    { id: 'daily', name: '社服求助', icon: HeartHandshake, color: '#10b981' },
  ];

  const CategoryCard = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        { 
          backgroundColor: colors.card,
          borderRadius: spacing.borderRadius,
          borderColor: colors.border,
          borderWidth: 1,
          width: (width - spacing.padding * 3) / 2,
          height: mode === 'elder' ? 180 : 140,
        }
      ]}
      onPress={() => navigation.navigate('Category', { categoryId: item.id, categoryName: item.name })}
      activeOpacity={0.8}
    >
      <View style={[styles.iconBox, { backgroundColor: item.color + '20' }]}>
        <item.icon size={mode === 'elder' ? 48 : 32} color={item.color} />
      </View>
      <Text style={[
        styles.categoryTitle, 
        { 
          color: colors.text, 
          fontSize: typography.stepTitleSize,
          marginTop: spacing.gap 
        }
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={mode === 'default' ? ['#0f172a', '#3b0764'] : [colors.background, colors.background]}
        style={styles.background}
      >
        <SafeAreaView style={styles.safeArea}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={[styles.appTitle, { color: colors.text, fontSize: typography.titleSize }]}>
                Helppp 助手
              </Text>
              <Text style={[styles.subtitle, { color: colors.subText, fontSize: typography.baseSize }]}>
                您的社会生存指南
              </Text>
            </View>
            <TouchableOpacity onPress={() => setMode(mode === 'default' ? 'elder' : 'default')}>
              <Settings size={28} color={colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
            {/* Quick Actions Grid */}
            <View style={[styles.grid, { gap: spacing.gap, padding: spacing.padding }]}>
              {categories.map(item => (
                <CategoryCard key={item.id} item={item} />
              ))}
            </View>

            {/* Smart Chat Button */}
            <TouchableOpacity
              style={[
                styles.actionButton,
                { 
                  backgroundColor: colors.primary,
                  marginHorizontal: spacing.padding,
                  borderRadius: spacing.borderRadius,
                  padding: spacing.padding
                }
              ]}
              onPress={() => navigation.navigate('Chat')}
            >
              <MessageSquare size={32} color="#FFF" />
              <View style={styles.actionTextContainer}>
                <Text style={[styles.actionTitle, { fontSize: typography.stepTitleSize }]}>
                  智能对话
                </Text>
                <Text style={[styles.actionSubtitle, { fontSize: typography.baseSize * 0.8 }]}>
                  不懂就问 AI，随时为您解答
                </Text>
              </View>
            </TouchableOpacity>

            {/* Human Help Button */}
            <TouchableOpacity
              style={[
                styles.humanButton,
                { 
                  marginTop: spacing.gap,
                  marginHorizontal: spacing.padding,
                  borderRadius: spacing.borderRadius,
                  padding: spacing.padding,
                  borderColor: colors.border
                }
              ]}
              onPress={handleWhatsApp}
            >
              <Phone size={24} color={colors.subText} />
              <Text style={[styles.humanButtonText, { color: colors.subText, fontSize: typography.baseSize }]}>
                人工求助 (WhatsApp)
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1 },
  safeArea: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  appTitle: { fontWeight: 'bold' },
  subtitle: { opacity: 0.8 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryCard: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconBox: {
    padding: 16,
    borderRadius: 50,
  },
  categoryTitle: {
    fontWeight: '600',
    textAlign: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  actionTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  actionTitle: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  actionSubtitle: {
    color: 'rgba(255,255,255,0.8)',
  },
  humanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  humanButtonText: {
    marginLeft: 8,
    fontWeight: '600',
  },
});
