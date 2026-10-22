import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useFonts } from 'expo-font';
import { Audiowide_400Regular } from '@expo-google-fonts/audiowide/400Regular';
import { LeagueSpartan_900Black } from '@expo-google-fonts/league-spartan/900Black';
import { Montserrat_500Medium } from '@expo-google-fonts/montserrat/500Medium';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import Brand from './components/Brand';
import DashboardScreen from './components/DashboardScreen';
import FeatureStrip from './components/FeatureStrip';
import LoginPanel from './components/LoginPanel';
import ProfileScreen from './components/ProfileScreen';
import RoleScreen from './components/RoleScreen';
import ThemePopup from './components/ThemePopup';
import { clearSession, loadSession } from './services/sessionStorage';
import styles from './styles';
import dashboardStyles from './styles/dashboardStyles';

const labImage = require('../assets/laboratory-scene.jpg');

export default function App() {
  const { width } = useWindowDimensions();
  const compact = width < 1024;
  const narrow = width < 420;
  const [fontsLoaded, fontError] = useFonts({
    Audiowide: Audiowide_400Regular,
    LeagueSpartan: LeagueSpartan_900Black,
    Montserrat: Montserrat_500Medium,
  });
  const [session, setSession] = useState(null);
  const [isRestoringSession, setIsRestoringSession] = useState(true);
  const [screen, setScreen] = useState('login');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    loadSession()
      .then((savedSession) => {
        if (!isMounted) return;
        setSession(savedSession);
        if (savedSession) setScreen('dashboard');
      })
      .catch((error) => {
        if (isMounted) setPopupMessage(error.message);
      })
      .finally(() => {
        if (isMounted) setIsRestoringSession(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (fontError) throw fontError;
  if (!fontsLoaded) return null;

  const onLoginSuccess = (nextSession) => {
    setSession(nextSession);
    setScreen('dashboard');
  };

  const onLogout = async () => {
    setIsLoggingOut(true);
    try {
      await clearSession();
      setSession(null);
      setScreen('login');
      setPopupMessage('You have been logged out.');
    } catch (error) {
      setPopupMessage(error instanceof Error ? error.message : 'Unable to clear the login session.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const screenTitles = {
    technical: 'Technical Manager',
    engineer: 'Calibration Engineer',
    admin: 'Administration Executive',
  };

  let currentScreen;
  if (isRestoringSession) {
    currentScreen = (
      <View style={dashboardStyles.profileState}>
        <ActivityIndicator size="large" color="#0785A5" />
        <Text style={dashboardStyles.profileStateText}>Restoring session…</Text>
      </View>
    );
  } else if (screen === 'login' || !session) {
    currentScreen = <LoginPanel compact={narrow} onLoginSuccess={onLoginSuccess} />;
  } else if (screen === 'dashboard') {
    currentScreen = (
      <DashboardScreen
        user={session.user}
        onNavigate={setScreen}
        onLogout={onLogout}
        isLoggingOut={isLoggingOut}
      />
    );
  } else if (screen === 'profile') {
    currentScreen = (
      <ProfileScreen
        session={session}
        isLoading={isRestoringSession}
        onBack={() => setScreen('dashboard')}
      />
    );
  } else {
    currentScreen = (
      <RoleScreen
        title={screenTitles[screen] || 'Dashboard'}
        onBack={() => setScreen('dashboard')}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.pageFrame, compact && styles.pageFrameCompact]}>
          <View style={[styles.header, compact && styles.headerCompact]}>
            <Brand compact={compact} narrow={narrow} />
          </View>

          {screen === 'login' && !session && !isRestoringSession ? (
            <View style={[styles.mainContent, compact && styles.mainContentCompact]}>
              <View style={[styles.visualPanel, compact && styles.visualPanelCompact]}>
                <ImageBackground
                  source={labImage}
                  resizeMode="cover"
                  style={[styles.labImage, compact && styles.labImageCompact]}
                >
                  <LinearGradient
                    colors={['rgba(0,70,100,0.02)', 'rgba(0,70,100,0.13)']}
                    style={styles.imageTint}
                  />
                  {compact && (
                    <View style={styles.mobileImageLabel}>
                      <Text style={styles.mobileImageLabelTitle}>Precision. Trust. Traceability.</Text>
                      <Text style={styles.mobileImageLabelSub}>VIMTECH Calibration LLP</Text>
                    </View>
                  )}
                </ImageBackground>
              </View>
              <View style={[styles.formPanelWrap, compact && styles.formPanelWrapCompact]}>
                {currentScreen}
              </View>
            </View>
          ) : (
            <View style={[styles.mainContent, compact && styles.mainContentCompact]}>
              {currentScreen}
            </View>
          )}

          {screen === 'login' && !session && !isRestoringSession ? <FeatureStrip compact={compact} /> : null}
        </View>
      </ScrollView>
      <ThemePopup
        visible={Boolean(popupMessage)}
        message={popupMessage}
        onDismiss={() => setPopupMessage('')}
      />
    </SafeAreaView>
  );
}
