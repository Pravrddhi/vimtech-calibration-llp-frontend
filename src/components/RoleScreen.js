import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import theme from '../constants/theme';
import dashboardStyles from '../styles/dashboardStyles';

export default function RoleScreen({ title, onBack }) {
  return (
    <View style={dashboardStyles.screen}>
      <View style={dashboardStyles.screenHeader}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back to dashboard"
          onPress={onBack}
          style={dashboardStyles.backButton}
        >
          <Feather name="arrow-left" size={22} color={theme.colors.primaryDark} />
        </Pressable>
        <Text style={dashboardStyles.screenTitle}>{title}</Text>
      </View>
    </View>
  );
}
