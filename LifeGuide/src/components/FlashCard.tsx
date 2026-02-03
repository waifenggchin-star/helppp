import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { X } from 'lucide-react-native';

interface FlashCardProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export const FlashCard: React.FC<FlashCardProps> = ({ visible, onClose, title, content }) => {
  const { theme } = useTheme();

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={[styles.container, { backgroundColor: 'rgba(0,0,0,0.8)' }]}>
        <View style={[
            styles.card, 
            { 
              backgroundColor: theme.colors.flashCardBg,
              padding: theme.spacing.padding * 1.5,
              borderRadius: theme.spacing.borderRadius
            }
          ]}>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <X size={32} color={theme.colors.flashCardText} />
          </TouchableOpacity>
          
          <Text style={[
            styles.title, 
            { 
              color: theme.colors.flashCardText,
              fontSize: theme.typography.titleSize,
              marginBottom: theme.spacing.gap
            }
          ]}>
            {title}
          </Text>
          
          <View style={styles.contentContainer}>
             <Text style={[
              styles.content, 
              { 
                color: theme.colors.flashCardText,
                fontSize: theme.typography.flashCardSize,
                lineHeight: theme.typography.flashCardSize * 1.4
              }
            ]}>
              {content}
            </Text>
          </View>
          
          <Text style={[
            styles.hint, 
            { 
              color: theme.colors.flashCardText,
              fontSize: theme.typography.baseSize,
              opacity: 0.7,
              marginTop: theme.spacing.gap * 2
            }
          ]}>
            请直接展示此屏幕给工作人员
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    minHeight: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  closeBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    zIndex: 1,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  content: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  hint: {
    textAlign: 'center',
  },
});
