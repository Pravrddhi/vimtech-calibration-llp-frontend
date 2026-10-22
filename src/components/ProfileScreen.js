import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import theme from '../constants/theme';
import dashboardStyles from '../styles/dashboardStyles';

const userFields = [
  ['id', 'User ID'],
  ['username', 'Username'],
  ['first_name', 'First name'],
  ['last_name', 'Last name'],
  ['email', 'Email'],
  ['user_type', 'User type'],
  ['is_staff', 'Staff'],
  ['is_active', 'Active'],
];

function formatValue(value) {
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return String(value);
}

export default function ProfileScreen({ session, isLoading, onBack }) {
  const rows = userFields
    .map(([key, label]) => [label, session?.user?.[key]])
    .filter(
      ([, value]) =>
        value !== undefined &&
        value !== null &&
        !(typeof value === 'string' && value.trim() === ''),
    );

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
        <Text style={dashboardStyles.screenTitle}>Profile</Text>
      </View>

      {isLoading ? (
        <View style={dashboardStyles.profileState}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={dashboardStyles.profileStateText}>Loading session…</Text>
        </View>
      ) : !session ? (
        <View style={dashboardStyles.profileState}>
          <Text style={dashboardStyles.profileStateText}>No active session found</Text>
        </View>
      ) : rows.length === 0 ? (
        <View style={dashboardStyles.profileState}>
          <Text style={dashboardStyles.profileStateText}>No user details are available.</Text>
        </View>
      ) : (
        <View style={dashboardStyles.profileCard}>
          <View style={dashboardStyles.sessionStatus}>
            <View style={dashboardStyles.sessionDot} />
            <Text style={dashboardStyles.sessionStatusText}>Active session</Text>
          </View>
          {rows.map(([label, value], index) => (
            <View
              key={label}
              style={[
                dashboardStyles.profileRow,
                index === rows.length - 1 && dashboardStyles.profileRowLast,
              ]}
            >
              <Text style={dashboardStyles.profileLabel}>{label}</Text>
              <Text selectable style={dashboardStyles.profileValue}>{formatValue(value)}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
