import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Alert, TextInput } from 'react-native';
import { MyButton} from './components/button';
import { useState } from 'react';
import Modal from 'react-native-modal'

export default function App() {

  const [gridSize, setGridSize] = useState('6')
  const [bombs, setBombs] = useState('3');
  const [buttons, setButtons] = useState([]);
  const [newGame, setNewGame] = useState(false);
  const [restartKey, setRestartKey] = useState(0);

  const startGame = () => {
    setNewGame(true);
  }

  const shuffle = () => {

    let buttonsGrid = [];
    for (let b = 0; b < bombs; b++) {
      buttonsGrid[Math.floor(Math.random()*parseInt(gridSize*6))] = true;
    }
    setButtons(buttonsGrid);
  }

  const handleModalSubmit = () => {
      setGridSize(parseInt(gridSize)*6);
      setBombs(parseInt(bombs));
      setNewGame(false);
      setRestartKey(restartKey + 1);
      shuffle();
  }

  return (
    <View style={styles.container}>
      <View style={styles.gridRow}>
          {(() => {
            const buttonList = [];
            for (let i =0; i < parseInt(gridSize); i++) {
                buttonList.push(<MyButton id={i} isBomb={buttons[i]} restart={restartKey}/>)
            }
            return buttonList;
          })()}
      </View>
      <View style={styles.newGameButton}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'space-evenly',
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:'center',
    alignItems: 'center',
    padding: 30,
  },
  newGameButton: {
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 10,
  },
  newGameModal: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 10,
    height: 300,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  newGameModalTexts: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalTextStyle: {
    fontSize: 25,
  }
  
});
