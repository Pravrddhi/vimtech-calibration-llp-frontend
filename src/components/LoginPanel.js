import React, { useState } from 'react';
import { ActivityIndicator, Pressable, Text, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { roles } from '../constants/content';
import styles from '../styles';
import RoleCard from './RoleCard';
import ThemePopup from './ThemePopup';
import { loginWithPassword } from '../services/auth';
import { saveSession } from '../services/sessionStorage';

export default function LoginPanel({ compact, onLoginSuccess }) {
  const [role, setRole] = useState('engineer');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onLogin = async () => {
    if (!role) return setPopupMessage('Please select your role to continue.');
    if (!username.trim() || !password) return setPopupMessage('Please enter your username and password.');

    setIsSubmitting(true);
    try {
      const result = await loginWithPassword(username.trim(), password, role);
      const nextSession = {
        user: result.user,
        access: result.access,
        refresh: result.refresh,
      };
      await saveSession(nextSession);
      setPassword('');
      onLoginSuccess(nextSession, result.message);
    } catch (error) {
      setPopupMessage(error instanceof Error ? error.message : 'Unable to log in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={[styles.loginPanel, compact && styles.loginPanelCompact]}>
      <Text style={[styles.panelHeading, compact && styles.panelHeadingCompact]}>
        Login to Laboratory Management System
      </Text>
      <View style={styles.headingUnderline} />
      <Text style={styles.panelSubheading}>Select your role to continue</Text>

      <View style={styles.rolesRow}>
        {roles.map((item) => (
          <RoleCard
            key={item.key}
            role={item}
            selected={role === item.key}
            onPress={() => setRole(item.key)}
            compact={compact}
          />
        ))}
      </View>

      <View style={styles.formDivider} />

      <View style={styles.inputRow}>
        <View style={styles.inputIcon}>
          <Feather name="user" size={24} color="#075b78" />
        </View>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Username / Employee ID"
          placeholderTextColor="#7b8da2"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.textInput}
          accessibilityLabel="Username or employee ID"
        />
      </View>

      <View style={styles.inputRow}>
        <View style={styles.inputIcon}>
          <Feather name="lock" size={23} color="#075b78" />
        </View>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#7b8da2"
          secureTextEntry={!showPassword}
          style={styles.textInput}
          accessibilityLabel="Password"
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
          onPress={() => setShowPassword((value) => !value)}
          style={styles.eyeButton}
        >
          <Feather name={showPassword ? 'eye-off' : 'eye'} size={22} color="#075b78" />
        </Pressable>
      </View>

      <View style={styles.optionsRow}>
        <Pressable onPress={() => setRemember((value) => !value)} style={styles.rememberWrap}>
          <View style={[styles.checkbox, remember && styles.checkboxChecked]}>
            {remember ? <Feather name="check" size={15} color="#fff" /> : null}
          </View>
          <Text style={styles.rememberText}>Remember me</Text>
        </Pressable>
        <Pressable onPress={() => setPopupMessage('Please contact your system administrator to reset your password.')}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </Pressable>
      </View>

      <Pressable
        onPress={onLogin}
        disabled={isSubmitting}
        style={({ pressed }) => [
          styles.loginButton,
          (pressed || isSubmitting) && styles.loginButtonPressed,
        ]}
      >
        <LinearGradient
          colors={['#28a4b6', '#0089a7']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.loginGradient}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Feather name="log-in" size={28} color="#fff" />
              <Text style={styles.loginButtonText}>Login</Text>
            </>
          )}
        </LinearGradient>
      </Pressable>
      <ThemePopup
        visible={Boolean(popupMessage)}
        message={popupMessage}
        onDismiss={() => setPopupMessage('')}
      />
    </View>
  );
}
