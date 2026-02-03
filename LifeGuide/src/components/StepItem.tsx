import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Step } from '../data/scenarios';
import { MessageCircleQuestion, Image as ImageIcon } from 'lucide-react-native';
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
            styles.helpBtn, 
            { 
              backgroundColor: theme.colors.primary,
              marginTop: theme.spacing.gap,
              padding: theme.spacing.padding / 1.5,
              borderRadius: theme.spacing.borderRadius
            }
          ]}
          onPress={() => setFlashCardVisible(true)}
        >
          <MessageCircleQuestion color="#FFF" size={24 * theme.typography.scale} />
          <Text style={[
            styles.helpBtnText, 
            { 
              fontSize: theme.typography.baseSize,
              marginLeft: 8
            }
          ]}>
            我该怎么问？
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
    width: '100%',
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
    color: '#FFF',
    fontWeight: 'bold',
  },
  title: {
    fontWeight: 'bold',
    flex: 1,
  },
  description: {
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
  },
  helpBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
