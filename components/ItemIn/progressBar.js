import React, {useEffect, useRef} from "react";
import {View, Text, StyleSheet, Animated} from 'react-native';

export default function ProgressBar(progressVal) {
    // Init the anim using ref
    const animateVal = useRef(new Animated.Value(0)).current;
    // Use a ref to store the progress
    const progressBarRef = useRef(null);

    // Calculate progress width based on progress raw val
    const calculateWidth = (progressVal) => {
        const totalWidth = progressBarRef.current.offsetWidth;
        return (progressVal / 100) * totalWidth;
    };

    useEffect(() => {
        Animated.timing(animateVal, {
            toValue: progressVal,
            duration: 300,
        })
    }, [progressVal])

    return (
        <View style={styles.progressBarContainer}>
        <Animated.View
            ref={progressBarRef}
            style={[styles.progressBar, { width: animateVal.interpolate({ inputRange: [0, 100], outputRange: [0, calculateWidth(progressVal)] }) }]}
        >
            <Text style={styles.progressText}>{progressVal}%</Text>
        </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    progressBarContainer: {
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      height: 20,
      overflow: 'hidden',
    },
    progressBar: {
      backgroundColor: 'blue',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    progressText: {
      color: 'white',
      fontSize: 12,
    },
})