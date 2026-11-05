import * as React from 'react';
import {Animated, StyleSheet} from 'react-native';
import {observer} from 'mobx-react';

import {ttsStore} from '../../store';

// Lorenzo's face (Cianci AI fork): Puerquísimo Chancho, chosen by Salvador.
// Bundled copy — the pal-card thumbnail is a separate file copied at seed
// time (see PalStore.seedLorenzoThumbnail); this one always works.
const LORENZO_IMAGE = require('../../assets/lorenzo/puerquisimo.jpg');

/**
 * Animated avatar for the built-in Lorenzo pal.
 *
 * Two states, both simple scale loops on the native driver:
 * - Idle: a slow, gentle "breathing" pulse so the avatar feels alive.
 * - Speaking (TTS playback or streaming in progress): a faster, wider
 *   pulse — a stand-in for a talking mouth. This is NOT lip-sync: it is
 *   driven only by the playback state, not by the audio content.
 */
export const LorenzoAvatar = observer(() => {
  const speaking = ttsStore.playbackState.mode !== 'idle';
  const scale = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    const peak = speaking ? 1.12 : 1.05;
    const halfCycle = speaking ? 220 : 1500;
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: peak,
          duration: halfCycle,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: halfCycle,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => {
      animation.stop();
      scale.setValue(1);
    };
  }, [scale, speaking]);

  return (
    <Animated.Image
      accessibilityRole="image"
      testID="lorenzo-avatar-image"
      resizeMode="cover"
      source={LORENZO_IMAGE}
      style={[styles.image, {transform: [{scale}]}]}
    />
  );
});

const styles = StyleSheet.create({
  image: {
    alignItems: 'center',
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    marginRight: 8,
    width: 32,
  },
});
