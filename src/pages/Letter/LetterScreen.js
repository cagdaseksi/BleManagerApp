import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

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

const LetterScreen = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState('');
  const [quizFinished, setQuizFinished] = useState(false);
  const [shuffledLetters, setShuffledLetters] = useState([]);
  const [clickedLetterIndex, setClickedLetterIndex] = useState(null);

  const [userAnswers, setUserAnswers] = useState(
    Array(targetWord.length).fill(''),
  );

  const currentTargetWord = targetWord[currentQuestion].en;
  const extraLetters = getExtraLetters(currentTargetWord, 3);
  const correctLettersCount = currentTargetWord.length;

  useEffect(() => {
    const extraLetters = getExtraLetters(currentTargetWord, 3);
    const shuffled = currentTargetWord
      .split('')
      .concat(extraLetters)
      .sort(() => Math.random() - 0.5);
    setShuffledLetters(shuffled);
  }, [currentTargetWord]);

  useEffect(() => {
    const initialSelectedLetters = Array(correctLettersCount).fill('');
    setSelectedLetters(initialSelectedLetters.join(''));
  }, [currentQuestion]);

  useEffect(() => {
    if (currentQuestion === targetWord.length) {
      // Quiz finished, show results
      console.log('Quiz Finished', userAnswers);
    }
  }, [currentQuestion, userAnswers]);

  const handleLetterClick = letter => {
    if (selectedLetters.length < currentTargetWord.length) {
      const currentIndex = selectedLetters.length;

      if (currentTargetWord[currentIndex] === letter) {
        const updatedLetters = selectedLetters + letter;
        setSelectedLetters(updatedLetters);

        const letterIndex = shuffledLetters.indexOf(letter);
        setClickedLetterIndex(letterIndex); // Set the clicked letter index

        // After a short duration, reset the clickedLetterIndex
        setTimeout(() => {
          setClickedLetterIndex(null);
        }, 300);

        if (updatedLetters.length === currentTargetWord.length) {
          if (currentQuestion === targetWord.length - 1) {
            // Check if it's the last question
            setQuizFinished(true); // Set quiz to finished
          } else {
            setTimeout(() => {
              setCurrentQuestion(prevQuestion => prevQuestion + 1);
              setSelectedLetters('');
            }, 1000);
          }
        }
      }
    }
  };

  const handleClearClick = () => {
    setSelectedLetters('');
  };

  const handleNextClick = () => {
    if (currentQuestion < targetWord.length - 1) {
      setCurrentQuestion(prevQuestion => prevQuestion + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prevQuestion => prevQuestion - 1);
    }
  };

  const handleFinishClick = () => {
    setQuizFinished(true);
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedLetters('');
  };

  if (quizFinished) {
    return (
      <View style={styles.container}>
        <Text style={styles.resultText}>Quiz Finished!</Text>
        <TouchableOpacity style={styles.restartButton} onPress={handleReset}>
          <Text>Restart Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#F29727', '#F29727', '#F29727']}
      style={styles.container}>
      <Text>
        {currentQuestion + 1}/{targetWord.length}
      </Text>
      <Text style={styles.questionText}>{targetWord[currentQuestion].tr}</Text>
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
              clickedLetterIndex === index ? styles.correctButton : null,
            ]}
            onPress={() => handleLetterClick(letter)}>
            <Text style={styles.letterText}>{letter}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handlePrevClick}
          disabled={currentQuestion === 0}>
          <Text>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleNextClick}
          disabled={currentQuestion === targetWord.length - 1}>
          <Text>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleFinishClick}>
          <Text>Finish</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleClearClick}>
          <Text>Clear</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text>Reset</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
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
  questionText: {
    width: '90%',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    backgroundColor: '#22A699',
    color: '#FFFFFF',
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
  },
  restartButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'blue',
    borderRadius: 10,
    marginHorizontal: 10,
  },
});

export default LetterScreen;
