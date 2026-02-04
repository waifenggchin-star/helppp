import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Step } from '../data/scenarios';
import { Image as ImageIcon } from 'lucide-react-native';
import { FlashCard } from './FlashCard';

interface StepItemProps {
  step: Step;
  index: number;
}

export const StepItem: React.FC<StepItemProps> = ({ step, index }) => {
  const { theme } = useTheme();
  const [flashCardVisible, setFlashCardVisible] = useState(false);

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
          { 
            backgroundColor: theme.colors.primary,
            width: 32 * theme.typography.scale,
            height: 32 * theme.typography.scale,
            borderRadius: 16 * theme.typography.scale
          }
        ]}>
          <Text style={[styles.badgeText, { fontSize: theme.typography.baseSize }]}>{index + 1}</Text>
        </View>
        <Text style={[styles.title, { color: theme.colors.text, fontSize: theme.typography.stepTitleSize }]}>
          {step.action}
        </Text>
      </View>

      {step.description && (
        <Text style={[
          styles.description, 
          { 
            color: theme.colors.subText, 
            fontSize: theme.typography.baseSize,
            marginTop: theme.spacing.gap / 2,
            lineHeight: theme.typography.baseSize * 1.5
          }
        ]}>
          {step.description}
        </Text>
      )}

      <View style={[
        styles.imagePlaceholder, 
        { 
          backgroundColor: theme.colors.background,
          height: 150 * theme.typography.scale,
          marginTop: theme.spacing.gap,
          borderRadius: theme.spacing.borderRadius / 2,
          borderColor: theme.colors.border
        }
      ]}>
        <ImageIcon size={32 * theme.typography.scale} color={theme.colors.subText} />
        <Text style={{ 
          color: theme.colors.subText, 
          marginTop: 8,
          fontSize: theme.typography.baseSize * 0.8,
          textAlign: 'center',
          paddingHorizontal: 10
        }}>
          {step.imagePlaceholder}
        </Text>
      </View>

      {step.flashCard && (
        <TouchableOpacity 
          style={[
            styles.flashCardButton,
            { 
              marginTop: theme.spacing.gap,
              backgroundColor: theme.colors.secondary + '20', // 20% opacity
              padding: 10,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: theme.colors.secondary
            }
          ]}
          onPress={() => setFlashCardVisible(true)}
        >
          <Text style={{ color: theme.colors.secondary, fontWeight: 'bold', textAlign: 'center', fontSize: theme.typography.baseSize }}>
            {theme.mode === 'elder' ? '点我看：求助小抄' : '查看求助话术'}
          </Text>
        </TouchableOpacity>
      )}

      {step.flashCard && (
        <FlashCard
          visible={flashCardVisible}
          onClose={() => setFlashCardVisible(false)}
          title={step.flashCard.title}
          content={step.flashCard.content}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    fontWeight: 'bold',
    flex: 1,
  },
  speakButton: {
    padding: 8,
  },
  description: {
    // Styling handled in render
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  flashCardButton: {
    // Styling handled in render
  }
});
