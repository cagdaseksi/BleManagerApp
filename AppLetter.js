import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const targetWord = [
  {id: 1, en: 'some', tr: 'bazı'},
  {id: 2, en: 'go', tr: 'gitmek'},
  {id: 3, en: 'any', tr: 'hiç'},
  {id: 4, en: 'stay', tr: 'kalmak'},
  {id: 5, en: 'however', tr: 'ancak'},
  {id: 6, en: 'body', tr: 'gövde'},
];

const getExtraLetters = (word, count) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const extraLetters = [];
  while (extraLetters.length < count) {
    const index = Math.floor(Math.random() * alphabet.length);
    const letter = alphabet[index];
    if (!word.includes(letter)) {
      extraLetters.push(letter);
    }
  }
  return extraLetters;
};

const AppLetter = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [userAnswers, setUserAnswers] = useState(
    Array(targetWord.length).fill(''),
  );

  const currentTargetWord = targetWord[currentQuestion].en;
  const extraLetters = getExtraLetters(currentTargetWord, 3);
  const correctLettersCount = currentTargetWord.length;

  const shuffledLetters = currentTargetWord
    .split('')
    .concat(extraLetters)
    .sort(() => Math.random() - 0.5);

  useEffect(() => {
    const initialSelectedLetters = Array(correctLettersCount).fill('');
    setSelectedLetters(initialSelectedLetters.join(''));
  }, [currentQuestion]);

  const handleLetterClick = letter => {
    setSelectedLetters(selectedLetters + letter);
  };

  const handleClearClick = () => {
    setSelectedLetters('');
  };

  const handleNextClick = () => {
    setShowFeedback(false);
    const isCorrect = selectedLetters === currentTargetWord;
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = isCorrect ? 'correct' : 'wrong';
    setUserAnswers(updatedAnswers);

    setTimeout(() => {
      if (selectedLetters.length === correctLettersCount) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedLetters('');
      }
    }, 1000);
  };

  useEffect(() => {
    if (currentQuestion === targetWord.length) {
      // Quiz finished, show results
      console.log('Quiz Finished', userAnswers);
    }
  }, [currentQuestion, userAnswers]);

  return (
    <View style={styles.container}>
      <Text>
        {currentQuestion + 1}/{targetWord.length}
      </Text>
      <Text>{targetWord[currentQuestion].tr}</Text>
      <View style={styles.letterContainer}>
        {currentTargetWord.split('').map((_, index) => (
          <View key={index} style={styles.selectedLetter}>
            <Text>{selectedLetters[index] || '_'}</Text>
          </View>
        ))}
      </View>
      <View style={styles.alphabetContainer}>
        {[...shuffledLetters].map((letter, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.letterButton,
              showFeedback && currentTargetWord.includes(letter)
                ? selectedLetters.includes(letter)
                  ? styles.correctButton
                  : styles.wrongButton
                : '',
            ]}
            onPress={() => handleLetterClick(letter)}
            disabled={showFeedback}>
            <Text style={styles.letterText}>{letter}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleClearClick}>
          <Text>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleNextClick}
          disabled={!selectedLetters}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  selectedLetter: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  emptyLetter: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  alphabetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  letterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'lightgray',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  correctButton: {
    backgroundColor: 'green',
  },
  wrongButton: {
    backgroundColor: 'red',
  },
  letterText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'blue',
    borderRadius: 10,
    marginHorizontal: 10,
  },
});

export default AppLetter;
