/**
 * \file    Button.js
 * \author  Robee Diaz
 * \date    2024-02-02
 * \brief   button that contains a mine or not
 */

import { StyleSheet, Button, View, Alert, Pressable,Text } from "react-native"
import { FontAwesome6 } from '@expo/vector-icons';
import { useState, useEffect } from "react";

export const MyButton = ({id, isBomb}, restart) => {


  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false); // Reset the visibility when the key changes
  }, [restart]);

  const show = () => {
    setIsVisible(true);
  }
  
  return (
    <Pressable
        style={styles.btn}
        onPress={show}
    >
      {isVisible ? (
         isBomb ? (<FontAwesome6 name="bomb" size={24} color="black" />) : (<Text> {Math.floor(Math.random()*1000)} </Text>)
      ) :  (
          <Text>B</Text>
      )}

    </Pressable>

  );
}

const styles = StyleSheet.create({
  btn: {
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

});
