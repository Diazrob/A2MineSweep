/**
 * \file    styleSheet.js
 * \author  Robee Diaz
 * \date    2024-02-02
 * \brief   css external file that contains the styles of components
 */
import { StyleSheet } from "react-native";

export default StyleSheet.create ({

  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent:'space-evenly',
  },
  titleFont: {
    fontSize: 40,
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:'center',
    alignItems: 'center',
    padding: 30,
  },
 gameButton: {
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 10,
    width:150,
    backgroundColor: '#0369a1',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color:'white',
    fontSize:20,
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
  },

btn: {
  borderWidth: 1,
  borderColor: 'black',
  borderStyle: 'solid',
  height: 60,
  width: 60,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#cbd5e1'
},

});