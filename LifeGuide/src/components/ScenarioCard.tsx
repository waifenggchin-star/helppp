import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Scenario } from '../data/scenarios';
import { Train, Stethoscope, CreditCard, IdCard, ChevronRight } from 'lucide-react-native';

interface ScenarioCardProps {
  scenario: Scenario;
  onPress: () => void;
}

const IconMap: Record<string, any> = {
  'train': Train,
  'stethoscope': Stethoscope,
  'credit-card': CreditCard,
  'id-card': IdCard,
};

export const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario, onPress }) => {
  const { theme } = useTheme();
  const IconComponent = IconMap[scenario.icon] || Train;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.card,
          padding: theme.spacing.padding,
          borderRadius: theme.spacing.borderRadius,
          marginBottom: theme.spacing.gap,
          borderWidth: 1,
          borderColor: theme.colors.border
        }
      ]}
      onPress={onPress}
    >
      <View style={[
        styles.iconContainer, 
        { 
          backgroundColor: theme.colors.background,
          width: 60 * theme.typography.scale,
          height: 60 * theme.typography.scale,
          borderRadius: 30 * theme.typography.scale
        }
      ]}>
        <IconComponent size={32 * theme.typography.scale} color={theme.colors.primary} />
      </View>
      
      <View style={styles.content}>
        <Text style={[
          styles.title, 
          { 
            color: theme.colors.text,
            fontSize: theme.typography.titleSize
          }
        ]}>
          {scenario.title}
        </Text>
        <Text style={[
          styles.category, 
          { 
            color: theme.colors.subText,
            fontSize: theme.typography.baseSize * 0.9,
            marginTop: 4
          }
        ]}>
          {scenario.encouragement.substring(0, 15)}...
        </Text>
      </View>
      
      <ChevronRight size={24 * theme.typography.scale} color={theme.colors.subText} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
  },
  category: {
  },
});
