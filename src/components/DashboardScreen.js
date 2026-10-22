import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import theme from '../constants/theme';
import dashboardStyles from '../styles/dashboardStyles';

const tiles = [
  { key: 'profile', title: 'Profile', icon: 'user', screen: 'profile' },
  { key: 'register-user', title: 'Register User', icon: 'user-plus', screen: 'register-user' },
];

function DashboardTile({ tile, onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onPress(tile.screen)}
      style={({ pressed }) => [
        dashboardStyles.tile,
        pressed && dashboardStyles.tilePressed,
      ]}
    >
      <View style={dashboardStyles.tileIcon}>
        <Feather name={tile.icon} size={34} color={theme.colors.primary} />
      </View>
      <Text style={dashboardStyles.tileTitle}>{tile.title}</Text>
    </Pressable>
  );
}

export default function DashboardScreen({ user, onNavigate, onLogout, isLoggingOut }) {
  return (
    <View style={dashboardStyles.screen}>
      <View style={dashboardStyles.dashboardHeading}>
        <Text style={dashboardStyles.screenTitle}>Dashboard</Text>
        {user?.username ? (
          <Text style={dashboardStyles.welcome}>Welcome, {user.username}</Text>
        ) : null}
      </View>
      <View style={dashboardStyles.tileGrid}>
        {tiles.map((tile) => (
          <DashboardTile key={tile.key} tile={tile} onPress={onNavigate} />
        ))}
      </View>
      <Pressable
        accessibilityRole="button"
        onPress={onLogout}
        disabled={isLoggingOut}
        style={({ pressed }) => [
          dashboardStyles.logoutButton,
          pressed && dashboardStyles.tilePressed,
        ]}
      >
        {isLoggingOut ? (
          <ActivityIndicator color={theme.colors.primaryDark} />
        ) : (
          <>
            <Feather name="log-out" size={18} color={theme.colors.primaryDark} />
            <Text style={dashboardStyles.logoutText}>Logout</Text>
          </>
        )}
      </Pressable>
    </View>
  );
}
