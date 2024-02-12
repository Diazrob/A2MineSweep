/**
 * \file    game.js
 * \author  Robee Diaz
 * \date    2024-02-02
 * \brief   game page that displays the grid scores and bail button
 */

import { Button, Alert, Text, View, Pressable, TextInput } from 'react-native';
import { MyButton} from './button';
import { useState, useEffect, useCallback } from 'react';
import styles from '../css/styleSheet';
import Modal from 'react-native-modal'

export default function Game({navigation, route}) {

  const [gridSize, setGridSize] = useState('0')
  const [bombs, setBombs] = useState('0');
  const [buttons, setButtons] = useState([]);
  const [newGame, setNewGame] = useState(false);
  const [playAgain, setPlayAgain] = useState(false);
  const [restartKey, setRestartKey] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerResetKey, setTimerResetKey] = useState(0);
  const playerName = route.params.playerName;

  //start a new game
  const startGame = useCallback( () => {
    setNewGame(true);
  }, []);

  useEffect(() => {
    startGame();

  },[])


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

  const bombMultiplier = 1 + (bombs * 0.10);

  useEffect(() => {
    if (timerRunning && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    } else if (timerRunning && timeLeft === 0) {
      handleTimesUp();
      setTimerRunning(false);
    }
  }, [timerRunning, timeLeft, timerResetKey]);

  const handleTimesUp= () => {
    console.log("times up");
  }

  const handleButtonPress = () => {
    setTimerResetKey(timerResetKey + 1);
  }

  const handleModalSubmit = () => {
      setGridSize(parseInt(gridSize)*6);
      setBombs(parseInt(bombs));
      setNewGame(false);
      setRestartKey(restartKey + 1);
      setTotalScore(0);
      setTimerRunning(true);
      shuffle();
  }

const handleScoreUpdate = (buttonScore) => {

   buttonScore !=0 ? setTotalScore((prevTotalScore => prevTotalScore + buttonScore)) : setTotalScore(0);
   
}

const handleBombClick = () => {
  setPlayAgain(true);
};

const handleOkClick = () => {
    navigation.navigate('Leaderboard', {
      playerName: playerName,
      totalScore: totalScore
    });
  setPlayAgain(false);
};
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titleFont}>Score: {totalScore}</Text>
        <Text style={styles.titleFont}>Time Left: {timeLeft}s</Text>
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
                onBombClick={handleBombClick}
                bMultiplier={bombMultiplier}
                onButtonPress={handleButtonPress}
                />)
            }
            return buttonList;
          })()}
      </View>
      <Pressable 
      style={styles.gameButton}
      onPress={handleOkClick}>
          <Text style={styles.buttonText}>Bail</Text>
      </Pressable>
      <View style={styles.gameButton}>
        <Button 
          onPress={()=>{startGame()}}
          title='New Game'
        />
       </View>
       <Modal isVisible={playAgain}>
            <View style={styles.newGameModal}>
              <Text style={styles.instructionTitle}>Game Over!, You clicked a bomb!</Text>
            <Pressable 
            style={styles.gameButton}
            onPress={handleOkClick}>
              <Text style={styles.buttonText}>Ok</Text>
            </Pressable>
            </View>
       </Modal>
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
          <Pressable 
          style={styles.gameButton}
          onPress={handleModalSubmit}>
              <Text style={styles.buttonText}>Set</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}