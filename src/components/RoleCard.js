import React from 'react';
import { Pressable, View, Text } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Line, Path } from 'react-native-svg';
import styles from '../styles';

function TechnicalManagerIcon({ size = 76 }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <MaterialCommunityIcons name="cog" size={size} color="#0785A5" />
      <View
        style={{
          position: 'absolute',
          width: size * 0.43,
          height: size * 0.43,
          borderRadius: size,
          backgroundColor: '#E6F8FC',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Feather name="check" size={size * 0.3} color="#0785A5" strokeWidth={4} />
      </View>
    </View>
  );
}

function CalibrationEngineerIcon({ size = 76 }) {
  const color = '#087B9A';

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <Path d="M12 79 L20 61 L63 18 L72 27 L29 70 Z" fill={color} />
      <Path d="M12 79 L20 61 L25 66 L18 77 Z" fill={color} />
      <Path
        d="M27 64 L61 30"
        stroke="#E6F8FC"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <Path d="M31 83 L39 66 L73 32 L81 40 L47 75 Z" fill={color} />
      <Path d="M64 18 L72 10 L88 26 L80 34 Z" fill={color} />
      <Line
        x1="57"
        y1="24"
        x2="76"
        y2="43"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <Line
        x1="75"
        y1="12"
        x2="59"
        y2="29"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default function RoleCard({ role, selected, onPress, compact }) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.roleOption,
        compact && styles.roleOptionCompact,
        selected && styles.roleOptionSelected,
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.roleIconWrap, selected && styles.roleIconWrapSelected]}>
        {role.key === 'engineer' ? (
          <CalibrationEngineerIcon size={compact ? 42 : 76} />
        ) : role.key === 'technical' ? (
          <TechnicalManagerIcon size={compact ? 42 : 76} />
        ) : (
          <MaterialCommunityIcons
            name={role.icon}
            size={compact ? 34 : 43}
            color="#087b9a"
          />
        )}
      </View>
      <Text style={[styles.roleTitle, compact && styles.roleTitleCompact]}>{role.title}</Text>
      <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
        {selected ? <View style={styles.radioInner} /> : null}
      </View>
    </Pressable>
  );
}
