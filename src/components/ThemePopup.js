import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import popupStyles from '../styles/popupStyles';
import theme from '../constants/theme';

export default function ThemePopup({
  visible,
  title,
  message,
  actionLabel = 'Got it',
  onDismiss,
}) {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onDismiss}
      statusBarTranslucent
    >
      <View style={popupStyles.overlay}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close popup"
          onPress={onDismiss}
          style={popupStyles.backdrop}
        />
        <View
          accessibilityViewIsModal
          accessibilityRole="alert"
          style={popupStyles.card}
        >
          <View style={popupStyles.accent} />
          <View style={popupStyles.content}>
            <View style={popupStyles.iconCircle}>
              <Feather name="info" size={28} color={theme.colors.primary} />
            </View>
            {title ? <Text accessibilityRole="header" style={popupStyles.title}>{title}</Text> : null}
            <Text style={popupStyles.message}>{message}</Text>
            <Pressable
              accessibilityRole="button"
              onPress={onDismiss}
              style={({ pressed }) => [popupStyles.button, pressed && popupStyles.pressed]}
            >
              <LinearGradient
                colors={[theme.colors.secondary, theme.colors.primary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={popupStyles.buttonGradient}
              >
                <Text style={popupStyles.buttonText}>{actionLabel}</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
