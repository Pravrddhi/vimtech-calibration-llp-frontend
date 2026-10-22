import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../styles';

export default function Brand({ compact, narrow }) {
  return (
    <View style={[styles.brandRow, compact && styles.brandRowCompact]}>
      <View style={[styles.logoMark, compact && styles.logoMarkCompact, narrow && styles.logoMarkNarrow]}>
        <MaterialCommunityIcons name="cog" size={compact ? 54 : 82} color="#0799b4" />
        <View style={styles.logoInner}>
          <MaterialCommunityIcons name="human-handsup" size={compact ? 25 : 38} color="#0799b4" />
        </View>
      </View>
      <View style={styles.brandTextWrap}>
        <View style={[styles.brandTitleRow, compact && styles.brandTitleRowCompact]}>
          <Text style={[styles.brandName, compact && styles.brandNameCompact]}>VIMTECH</Text>
          <Text style={[styles.brandSuffix, compact && styles.brandSuffixCompact]}>CALIBRATION LLP</Text>
        </View>
        <View style={styles.brandRule} />
        <Text style={[styles.tagline, compact && styles.taglineCompact, narrow && styles.taglineNarrow]}>
          LABORATORY MANAGEMENT SYSTEM
        </Text>
      </View>
    </View>
  );
}
