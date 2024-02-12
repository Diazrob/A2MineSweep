import { Button, Alert, Text, View, Pressable, TextInput } from 'react-native';
import { MyButton} from './button';
import { useState, useEffect } from 'react';
import styles from '../css/styleSheet';
import Modal from 'react-native-modal'
import React from 'react'

export default function LeaderBoard ({navigation, route}) {

  const playerName = route.params.playerName || 'Unknown Player';
  const totalScore = route.params.totalScore || 0;

  const handlePlayAgain = () => {
    navigation.navigate('Game',{playerName});
  };
  return (
   <View style={styles.container}>
    <View style={styles.instructionModal}>
      <Text style={styles.instructionTitle}>Game Over</Text>
      <View style={styles.instructionIconText}>
        <Text style={styles.leaderboardText}>{playerName} score is: </Text>
        <Text style={styles.leaderboardText}>{totalScore}</Text>
      </View>
    </View>
    <Pressable 
    style={styles.gameButton}
    onPress={handlePlayAgain}
    >
      <Text style={styles.buttonText}> Play Again?</Text>
    </Pressable>
   </View>
  )
}