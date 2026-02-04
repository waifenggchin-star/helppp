import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, ChevronRight } from 'lucide-react-native';
import { scenarios } from '../data/scenarios';

export const CategoryScreen = ({ route, navigation }: any) => {
  const { categoryId, categoryName } = route.params;
  const { colors, typography, spacing } = useTheme();

  const filteredScenarios = scenarios.filter(s => s.category === categoryId);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.card,
        { 
          backgroundColor: colors.card,
          padding: spacing.padding,
          borderRadius: spacing.borderRadius,
          borderColor: colors.border,
        }
      ]}
      onPress={() => navigation.navigate('ScenarioDetail', { scenarioId: item.id })}
    >
      <View style={styles.cardContent}>
        <Text style={[styles.cardTitle, { color: colors.text, fontSize: typography.stepTitleSize }]}>
          {item.title}
        </Text>
        <Text style={[styles.cardDesc, { color: colors.subText, fontSize: typography.baseSize * 0.8 }]} numberOfLines={2}>
          {item.encouragement}
        </Text>
      </View>
      <ChevronRight color={colors.subText} size={24} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft color={colors.text} size={24} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text, fontSize: typography.titleSize }]}>
          {categoryName}
        </Text>
      </View>

      <FlatList
        data={filteredScenarios}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: spacing.padding, gap: spacing.gap }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={{ color: colors.subText, fontSize: typography.baseSize }}>
              暂无相关指南
            </Text>
          </View>
        }
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
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
    marginRight: 12,
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDesc: {
    opacity: 0.8,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
});
