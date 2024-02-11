/**
 * \file    game.js
 * \author  Robee Diaz
 * \date    2024-02-02
 * \brief   game page that displays the grid scores and bail button
 */

import { StatusBar } from 'expo-status-bar';
import { Image, Text, View, Pressable, TextInput } from 'react-native';
import { MaterialCommunityIcons, Feather, MaterialIcons,FontAwesome5,Ionicons, FontAwesome6 } from '@expo/vector-icons';
import { useState } from 'react';
import styles from './css/styleSheet';
import Modal from 'react-native-modal';

export default function App() {
  const [playerName, setPlayerName] = useState('');
  const [gameInstructions, showGameInstructions] = useState(false);

  const showInstructions = () => {
    showGameInstructions(true);
  }

  const hideInstructions = () => {
    showGameInstructions(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={{width:350,height: 80}} source={require('./assets/minesweptLogo.png')}/>
      </View>
      <View style={styles.homepage}>
        <View style={styles.homepageText}>
          <Text style={styles.modalTextStyle}>Player Name:   </Text>
          <TextInput
            placeholder='Rob'
            style={{borderWidth: 1,borderRadius: 10, padding: 10, fontSize: 25,width: 150,}}
            value={(text) => {setPlayerName(text)}}
            onChangeText={playerName}
          >
          </TextInput>
        </View>
        <Pressable 
        style={styles.homepageButton}
        onPress={showInstructions}
        >
          <Text style={styles.buttonText}>How to Play?</Text>
        </Pressable>
        <Pressable style={styles.homepageButton}>
          <Text style={styles.buttonText}>New Game</Text>
        </Pressable>
       </View>
       <View style={styles.gifContainer}>
        <Image style={{width:100,height: 100}} source={require('./assets/bombclip.gif')}/>
      </View>
       <Modal isVisible={gameInstructions}>
          <View style={styles.instructionModal}>
            <View style={{alignItems:'center'}}>
              <Text style={styles.instructionTitle}>Game Rules</Text>
            </View>
            <View style={styles.instructionIconText}>
              <Feather name="square" size={35} color="black" />
              <Text style={styles.instructionText}>Each tile will have a score or bomb</Text>
            </View>
            <View style={styles.instructionIconText}>
              <MaterialIcons name="numbers" size={35} color="black" />
              <Text style={styles.instructionText}>Player can set number of tiles and bomb</Text>
            </View>
            <View style={styles.instructionIconText}>
              <FontAwesome5 name="bomb" size={35} color="black" />
             <Text style={styles.instructionText}>More bombs will increase the score multiplier</Text>
            </View>
            <View style={styles.instructionIconText}>
              <MaterialIcons name="score" size={35} color="black" />
              <Text style={styles.instructionText}>Score is doubled when 50% of tiles is opened and tripled at 75%</Text>
            </View>
            <View style={styles.instructionIconText}>
              <Ionicons name="timer-outline" size={35} color="black" />
              <Text style={styles.instructionText}>Player have 5 seconds to choose the next tile</Text>
            </View>
            <View style={styles.instructionIconText}>
              <FontAwesome6 name="sad-cry" size={35} color="black" />
              <Text style={styles.instructionText}>You lose if a bomb is opened or timer runs out</Text>
            </View>
            <View style={styles.instructionIconText}>
              <MaterialCommunityIcons name="gesture-tap-button" size={35} color="black" />
              <Text style={styles.instructionText}>Player can click Bail to quit and get current Score</Text>
            </View>
            <View style={{alignItems:'center'}}>
              <Pressable
                onPress={hideInstructions}
                style={styles.homepageButton}
                >
                <Text style={styles.buttonText}>Close</Text>
              </Pressable>
            </View>
          </View>
       </Modal>
       <StatusBar style="auto" />
    </View>
  );
}
