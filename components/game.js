/**
 * \file    game.js
 * \author  Robee Diaz
 * \date    2024-02-02
 * \brief   game page that displays the grid scores and bail button
 */

import { StatusBar } from 'expo-status-bar';
import { Button, Alert, Text, View, Pressable, TextInput } from 'react-native';
import { MyButton} from './button';
import { useState } from 'react';
import styles from '../css/styleSheet';
import Modal from 'react-native-modal'

export default function App() {

  const [gridSize, setGridSize] = useState('12')
  const [bombs, setBombs] = useState('5');
  const [buttons, setButtons] = useState([]);
  const [newGame, setNewGame] = useState(false);
  const [restartKey, setRestartKey] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  //start a new game
  const startGame = () => {
    setNewGame(true);
  }

  //shuffle contents
  const shuffle = () => {
    // set grid
    let buttonsGrid = {};
    // set bombs
  
    for (let b = 1; b <= bombs; b++) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * parseInt(gridSize * 6));
      } while (buttonsGrid[randomIndex] !== undefined);
  
      buttonsGrid[randomIndex] = true;
    }
    setButtons(buttonsGrid);
  };

  const handleModalSubmit = () => {
      setGridSize(parseInt(gridSize)*6);
      setBombs(parseInt(bombs));
      setNewGame(false);
      setRestartKey(restartKey + 1);
      setTotalScore(0);
      shuffle();
  }

const handleScoreUpdate = (buttonScore) => {

   buttonScore !=0 ? setTotalScore((prevTotalScore => prevTotalScore + buttonScore)) : setTotalScore(0);
}

const handleBail = () => {
  Alert.alert('Bailed out') //TODO add Bailed out option when clicked
}

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titleFont}>Score: {totalScore}</Text>
      </View>
      <View style={styles.gridRow}>
          {(() => {
            const buttonList = [];
            for (let i =0; i < parseInt(gridSize); i++) {
                buttonList.push(
                <MyButton 
                id={i} 
                isBomb={buttons[i]} 
                restart={restartKey}
                onScoreUpdate={handleScoreUpdate}
                />)
            }
            return buttonList;
          })()}
      </View>
      <Pressable 
      style={styles.gameButton}
      onPress={handleBail}>
          <Text style={styles.buttonText}>Bail</Text>
      </Pressable>
      <View style={styles.gameButton}>
        <Button 
          onPress={()=>{startGame()}}
          title='New Game'
        />
       </View>
      <Modal isVisible={newGame}>
        <View style={styles.newGameModal}>
          <Text style={{fontSize: 30}}>Game Settings</Text>
          <View style={styles.newGameModalTexts}>
            <Text style={styles.modalTextStyle}>Set number of grid rows: </Text>
            <TextInput
              placeholder='1, 2, 3'
              value={gridSize}
              onChangeText={(text) => {setGridSize(text)}}
              style={{borderWidth: 1, padding: 5, fontSize: 25,width: 100,}}
              keyboardType='numeric'
            />
          </View>
          <View style={styles.newGameModalTexts}>
            <Text style={styles.modalTextStyle}>Set number of bombs:   </Text>
            <TextInput
              placeholder='1, 2, 3'
              value={bombs}
              onChangeText={(text) => {setBombs(text)}}
              style={{borderWidth: 1, padding: 5, fontSize: 25,width: 100,}}
              keyboardType='numeric'
            />
          </View>
          <View style={styles.newGameButton}>
          <Button
            onPress={handleModalSubmit}
            title="Submit"
            />
          </View>
        </View>
      </Modal>
       <StatusBar style="auto" />
    </View>
  );
}
