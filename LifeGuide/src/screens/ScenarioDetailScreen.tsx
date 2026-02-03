import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { scenarios } from '../data/scenarios';
import { StepItem } from '../components/StepItem';
import { ChevronLeft, HeartHandshake } from 'lucide-react-native';

export const ScenarioDetailScreen = ({ route, navigation }: any) => {
  const { scenarioId } = route.params;
  const { theme } = useTheme();
  
  const scenario = scenarios.find(s => s.id === scenarioId);

  if (!scenario) {
    return (
      <View style={styles.center}>
        <Text>Scenario not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { padding: theme.spacing.padding }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={28 * theme.typography.scale} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text, fontSize: theme.typography.titleSize }]}>
          {scenario.title}
        </Text>
        <View style={{ width: 28 }} /> 
      </View>

      <ScrollView contentContainerStyle={{ padding: theme.spacing.padding }}>
        {/* 心理按摩 */}
        <View style={[
          styles.encouragementCard, 
          { 
            backgroundColor: theme.mode === 'accessibility' ? '#333' : theme.colors.primary + '15', // Hex transparency hack might need adjust for actual hex
            padding: theme.spacing.padding,
            borderRadius: theme.spacing.borderRadius,
            marginBottom: theme.spacing.gap * 2,
            borderLeftWidth: 4,
            borderLeftColor: theme.colors.primary
          }
        ]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <HeartHandshake size={24 * theme.typography.scale} color={theme.colors.primary} />
            <Text style={{ 
              marginLeft: 8, 
              color: theme.colors.primary, 
              fontWeight: 'bold', 
              fontSize: theme.typography.baseSize 
            }}>
              别担心
            </Text>
          </View>
          <Text style={{ 
            color: theme.colors.text, 
            fontSize: theme.typography.baseSize,
            lineHeight: theme.typography.baseSize * 1.5
          }}>
            {scenario.encouragement}
          </Text>
        </View>

        <Text style={[
          styles.stepsHeader, 
          { 
            color: theme.colors.text, 
            fontSize: theme.typography.titleSize,
            marginBottom: theme.spacing.gap
          }
        ]}>
          操作步骤
        </Text>

        {scenario.steps.map((step, index) => (
          <StepItem key={step.id} step={step} index={index} />
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  encouragementCard: {
  },
  stepsHeader: {
    fontWeight: 'bold',
  },
});
