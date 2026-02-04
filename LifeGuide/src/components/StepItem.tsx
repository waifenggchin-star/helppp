import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Step } from '../data/scenarios';
import { Image as ImageIcon } from 'lucide-react-native';

interface StepItemProps {
  step: Step;
  index: number;
}

export const StepItem: React.FC<StepItemProps> = ({ step, index }) => {
  const { theme } = useTheme();

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: theme.colors.card,
        borderRadius: theme.spacing.borderRadius,
        padding: theme.spacing.padding,
        marginBottom: theme.spacing.gap,
        borderWidth: 1,
        borderColor: theme.colors.border
      }
    ]}>
      <View style={styles.header}>
        <View style={[
          styles.badge, 
          { backgroundColor: theme.colors.primary + '20' }
        ]}>
          <Text style={[
            styles.stepNumber, 
            { color: theme.colors.primary, ...theme.typography.h3 }
          ]}>
            {index + 1}
          </Text>
        </View>
        <Text style={[
          styles.title, 
          { color: theme.colors.text, ...theme.typography.h3 }
        ]}>
          {step.action}
        </Text>
      </View>

      {step.description && (
        <Text style={[
          styles.description, 
          { color: theme.colors.textSecondary, ...theme.typography.body }
        ]}>
          {step.description}
        </Text>
      )}

      {/* Image placeholder */}
      <View style={[
        styles.imagePlaceholder, 
        { backgroundColor: theme.colors.background }
      ]}>
        <ImageIcon size={24} color={theme.colors.textSecondary} />
        <Text style={{ color: theme.colors.textSecondary, marginLeft: 8 }}>
          {step.imagePlaceholder}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumber: {
    fontWeight: 'bold',
  },
  title: {
    flex: 1,
    fontWeight: '600',
  },
  description: {
    marginBottom: 16,
    lineHeight: 24,
  },
  imagePlaceholder: {
    height: 120,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    borderStyle: 'dashed',
  },
});
