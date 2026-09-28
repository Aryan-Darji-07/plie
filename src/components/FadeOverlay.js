import React from 'react';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';
import {fill} from '../theme';

export default function FadeOverlay({stops, style}) {
  return (
    <Svg style={[fill, style]} pointerEvents="none">
      <Defs>
        <LinearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
          {stops.map((stop, i) => (
            <Stop
              key={i}
              offset={stop.offset}
              stopColor={stop.color || '#FFFFFF'}
              stopOpacity={stop.opacity}
            />
          ))}
        </LinearGradient>
      </Defs>
      <Rect x="0" y="0" width="100%" height="100%" fill="url(#fade)" />
    </Svg>
  );
}
