import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, UserMode } from '../context/ThemeContext';
import { scenarios } from '../data/scenarios';
import { ScenarioCard } from '../components/ScenarioCard';
import { Settings } from 'lucide-react-native';

export const HomeScreen = ({ navigation }: any) => {
  const { theme, mode, setMode } = useTheme();
  const [filter, setFilter] = useState('all');

  const categories = [
    { id: 'all', label: '全部' },
    { id: 'transport', label: '出行' },
    { id: 'medical', label: '医疗' },
    { id: 'docs', label: '证件' },
    { id: 'daily', label: '日常' },
  ];

  const filteredScenarios = filter === 'all' 
    ? scenarios 
    : scenarios.filter(s => s.category === filter);

  const ModeButton = ({ targetMode, label }: { targetMode: UserMode, label: string }) => (
    <TouchableOpacity 
      style={[
        styles.modeBtn, 
        { 
          backgroundColor: mode === targetMode ? theme.colors.primary : theme.colors.card,
          borderColor: theme.colors.border,
          borderWidth: 1,
          paddingVertical: 10 * theme.typography.scale
        }
      ]}
      onPress={() => setMode(targetMode)}
    >
      <Text style={{ 
        color: mode === targetMode ? '#FFF' : theme.colors.text,
        fontWeight: 'bold',
        fontSize: theme.typography.baseSize
      }}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { padding: theme.spacing.padding }]}>
        <View style={{flex: 1}}>
          <Text style={[styles.appName, { color: theme.colors.primary, fontSize: theme.typography.titleSize }]}>
            生活百科通
          </Text>
          <Text style={[styles.slogan, { color: theme.colors.subText, fontSize: theme.typography.baseSize }]}>
            你的生活生存指南
          </Text>
        </View>
        <Settings size={24 * theme.typography.scale} color={theme.colors.text} />
      </View>

      <View style={[styles.modeSelector, { paddingHorizontal: theme.spacing.padding }]}>
        <ModeButton targetMode="default" label="标准" />
        <ModeButton targetMode="elder" label="长辈" />
        <ModeButton targetMode="accessibility" label="无障碍" />
      </View>

      <View style={{ height: 60 * theme.typography.scale, marginVertical: theme.spacing.gap }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: theme.spacing.padding }}>
          {categories.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryChip,
                {
                  backgroundColor: filter === cat.id ? theme.colors.primary : theme.colors.card,
                  marginRight: theme.spacing.gap,
                  paddingVertical: 8 * theme.typography.scale,
                  paddingHorizontal: 16 * theme.typography.scale,
                  borderRadius: 20 * theme.typography.scale,
                  borderColor: theme.colors.border
                }
              ]}
              onPress={() => setFilter(cat.id)}
            >
              <Text style={{ 
                color: filter === cat.id ? '#FFF' : theme.colors.text,
                fontSize: theme.typography.baseSize
              }}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredScenarios}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: theme.spacing.padding, paddingBottom: 40 }}
        renderItem={({ item }) => (
          <ScenarioCard 
            scenario={item} 
            onPress={() => navigation.navigate('ScenarioDetail', { scenarioId: item.id })} 
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appName: {
    fontWeight: 'bold',
  },
  slogan: {
    marginTop: 4,
  },
  modeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  modeBtn: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
    borderRadius: 8,
  },
  categoryChip: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
});
