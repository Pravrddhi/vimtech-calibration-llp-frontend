import React from 'react';
import { Text, useWindowDimensions, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { features } from '../constants/content';
import styles from '../styles';

export default function FeatureStrip({ compact }) {
  const { width } = useWindowDimensions();
  const iconSize = compact ? Math.min(28, Math.max(18, Math.round(width * 0.07))) : 37;
  const compactCircleSize = width < 360 ? 38 : width < 420 ? 44 : 54;
  const compactTitleSize = Math.max(7, Math.min(10, width * 0.022));

  return (
    <View style={[styles.featureStrip, compact && styles.featureStripCompact]}>
      {features.map((feature, index) => (
        <React.Fragment key={feature.title}>
          <View style={[styles.featureItem, compact && styles.featureItemCompact]}>
            <View
              style={[
                styles.featureIconCircle,
                compact && styles.featureIconCircleCompact,
                compact && {
                  width: compactCircleSize,
                  height: compactCircleSize,
                  borderRadius: compactCircleSize / 2,
                },
              ]}
            >
              <MaterialCommunityIcons name={feature.icon} size={iconSize} color="#075b78" />
            </View>
            <Text
              numberOfLines={compact ? 1 : undefined}
              style={[
                styles.featureTitle,
                compact && styles.featureTitleCompact,
                compact && { fontSize: compactTitleSize },
              ]}
            >
              {feature.title}
            </Text>
          </View>
          {!compact && index < features.length - 1 && <View style={styles.featureSeparator} />}
        </React.Fragment>
      ))}
    </View>
  );
}
