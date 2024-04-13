import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import XImage from './assets/x.png';
import OImage from './assets/o.png';

const EMPTY = null;
const X = 1;
const O = 2;

const App = () => {
  const [board, setBoard] = useState<number[]>(Array(9).fill(EMPTY));
  const [player, setPlayer] = useState<number>(X);
  const [winner, setWinner] = useState<number | null>(EMPTY);

  const checkWinner = (board: number[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];
  
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }
  
    // Check for draw
    if (board.every(cell => cell !== EMPTY)) {
      setWinner(EMPTY);
      return;
    }
  };
  
  

  const handlePress = (index: number) => {
    if (board[index] === EMPTY && !winner) {
      const newBoard = [...board];
      newBoard[index] = player;
      setBoard(newBoard);
      checkWinner(newBoard); // Check for winner immediately after updating board
      if (!winner) {
        setPlayer(player === X ? O : X);
      }
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(EMPTY));
    setPlayer(X);
    setWinner(EMPTY);
  };

  const renderCell = (index: number) => {
    let imageSource;
    if (board[index] === X) {
      imageSource = XImage;
    } else if (board[index] === O) {
      imageSource = OImage;
    }

    return (
      <TouchableOpacity style={styles.cell} onPress={() => handlePress(index)}>
        {imageSource && <Image source={imageSource} style={styles.image} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>X Mix Drix</Text>
      <View style={styles.board}>
        <View style={styles.row}>
          {renderCell(0)}
          <View style={styles.verticalBorder} />
          {renderCell(1)}
          <View style={styles.verticalBorder} />
          {renderCell(2)}
        </View>
        <View style={styles.horizontalBorder} />
        <View style={styles.row}>
          {renderCell(3)}
          <View style={styles.verticalBorder} />
          {renderCell(4)}
          <View style={styles.verticalBorder} />
          {renderCell(5)}
        </View>
        <View style={styles.horizontalBorder} />
        <View style={styles.row}>
          {renderCell(6)}
          <View style={styles.verticalBorder} />
          {renderCell(7)}
          <View style={styles.verticalBorder} />
          {renderCell(8)}
        </View>
      </View>
      <Text style={styles.message}>
        {winner === X && 'The winner is X!'}
        {winner === O && 'The winner is O!'}
        {winner === EMPTY && board.every(cell => cell !== EMPTY) && 'Tie!'}
      </Text>
      <TouchableOpacity style={styles.button} onPress={resetGame}>
        <Text style={styles.buttonText}>New Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  board: {
    borderWidth: 0,
    borderColor: '#000',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
  },
  verticalBorder: {
    borderLeftWidth: 4,
    borderLeftColor: '#000',
    height: '100%',
  },
  horizontalBorder: {
    borderBottomWidth: 4,
    borderBottomColor: '#000',
  },
  message: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;