import React from 'react';
import {
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
import FeatureStrip from './components/FeatureStrip';
import LoginPanel from './components/LoginPanel';
import styles from './styles';

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

  if (fontError) throw fontError;
  if (!fontsLoaded) return null;

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
              <LoginPanel compact={narrow} />
            </View>
          </View>

          <FeatureStrip compact={compact} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
