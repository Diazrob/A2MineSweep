/**
 * \file    Button.js
 * \author  Robee Diaz
 * \date    2024-02-02
 * \brief   button that contains a mine or not and passess the value to game.js
 */

import { StyleSheet, Button, View, Alert, Pressable,Text } from "react-native"
import { FontAwesome6 } from '@expo/vector-icons';
import { useState, useEffect } from "react";
import styles from '../css/styleSheet';

export const MyButton = ({id, isBomb, restart, onScoreUpdate}) => {


  const [isVisible, setIsVisible] = useState(false);
  const [score, setScore] = useState(0);
  const [buttonScore, setButtonScore] = useState(0);

  useEffect(() => {
    setIsVisible(false); // Reset the visibility when the key changes ///set to false on production
  }, [restart]);

  
  useEffect(() => {
    if(!isBomb) {
      setButtonScore(Math.round(Math.ceil(Math.random() * (500 - Number.EPSILON) / 100) * 100));
    }
  },[isBomb, restart]);

  const show = () => {
    setIsVisible(true);
    if (!isBomb) {
      setScore((prevScore) => prevScore + buttonScore);
      onScoreUpdate(buttonScore);
    } else {
      Alert.alert("Game Over!, You clicked on a bomb!"); 
      setScore(0); //TODO  add Game over option when bomb is clicked
      onScoreUpdate(0);
    }
  }; 
  
  return (
    <Pressable
        style={styles.btn}
        onPress={show}
        disabled={isVisible}
    >
      {isVisible ? (
         isBomb ? (<FontAwesome6 name="bomb" size={24} color="black" />) : (<Text style={{fontSize:20}}>{buttonScore}</Text>)
      ) :  (
          <Text></Text>
      )}
    </Pressable>

  );
}
