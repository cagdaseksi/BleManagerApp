import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';

const App = () => {
  const quizData = require('./src/assets/quizData.json');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);

  const handleAnswer = (isCorrect, answerId) => {
    setSelectedAnswerId(answerId);
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }

    setTimeout(() => {
      handleNext();
    }, 1000);
  };

  const handleNext = () => {
    setSelectedAnswerId(null);
    if (currentQuestion + 1 < quizData.questions.length) {
      setCurrentQuestion(prevQuestion => prevQuestion + 1);
    } else {
      handleFinish(); // Automatically finish the quiz when all questions are answered
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prevQuestion => prevQuestion - 1);
    }
  };

  const handleFinish = () => {
    // Calculate the percentage
    const percentage = (score / quizData.questions.length) * 100;

    // Display the result or navigate to a new screen
    console.log('Quiz completed. Your score:', score);
    console.log('Percentage:', percentage.toFixed(2), '%');
    setSelectedAnswerId(null);
    Alert.alert(
      'Quiz Completed',
      `Your score: ${score}/${
        quizData.questions.length
      }\nPercentage: ${percentage.toFixed(2)}%`,
      [{text: 'OK', onPress: () => console.log('Alert closed')}],
    );
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setScore(0);
  };

  const question = quizData.questions[currentQuestion];
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth - 40;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Fast Learn English</Text>
      <Text style={styles.counterText}>{`${currentQuestion + 1} / ${
        quizData.questions.length
      }`}</Text>
      <Image
        source={{uri: question.imageUrl}}
        style={[styles.image, {width: imageWidth}]}
        resizeMode="stretch"
      />

      <Text style={styles.questionText}>{question.questionText}</Text>
      {question.answers.map((answer, index) => (
        <TouchableOpacity
          key={answer.id}
          style={[
            styles.answerButton,
            selectedAnswerId === answer.id && answer.isCorrect
              ? styles.correctAnswer
              : selectedAnswerId === answer.id && !answer.isCorrect
              ? styles.wrongAnswer
              : null,
          ]}
          onPress={() => handleAnswer(answer.isCorrect, answer.id)}
          disabled={selectedAnswerId !== null}>
          <Text style={styles.answerButtonText}>{`${index + 1}. ${
            answer.text
          }`}</Text>
        </TouchableOpacity>
      ))}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={handlePrevious}
          disabled={currentQuestion === 0}>
          <Text style={styles.controlButtonText}>Previous</Text>
        </TouchableOpacity>
        {currentQuestion + 1 < quizData.questions.length ? (
          <TouchableOpacity style={styles.controlButton} onPress={handleNext}>
            <Text style={styles.controlButtonText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.controlButton} onPress={handleFinish}>
            <Text style={styles.controlButtonText}>Finish</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>Reset</Text>
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
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 0,
  },
  image: {
    height: 200,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  answerButton: {
    width: '100%',
    backgroundColor: 'lightgray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  answerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  counterText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  controlButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
  controlButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
  resetButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  correctAnswer: {
    backgroundColor: 'green',
  },
  wrongAnswer: {
    backgroundColor: 'red',
  },
});

export default App;
