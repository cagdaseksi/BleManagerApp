import React, {useState, useEffect} from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';

const AppTest = () => {
  const quizData = [
    {
      question: 'I ___ a student.',
      options: ['am', 'is', 'are'],
      answer: 'am',
    },
    {
      question: 'She ___ a teacher.',
      options: ['am', 'is', 'are'],
      answer: 'is',
    },
    {
      question: 'He ___ not tall.',
      options: ['am', 'is', 'are'],
      answer: 'is',
    },
    {
      question: '___ they friends?',
      options: ['am', 'is', 'are'],
      answer: 'are',
    },
    {
      question: 'The sky ___ blue.',
      options: ['am', 'is', 'are'],
      answer: 'is',
    },
    {
      question: 'They ___ not siblings.',
      options: ['am', 'is', 'are'],
      answer: 'are',
    },
    {
      question: 'I ___ a stranger here.',
      options: ['am', 'is', 'are'],
      answer: 'am',
    },
    {
      question: 'The book ___ not on the table.',
      options: ['am', 'is', 'are'],
      answer: 'is',
    },
    {
      question: '___ they at the park?',
      options: ['am', 'is', 'are'],
      answer: 'are',
    },
    {
      question: 'You ___ my best friend.',
      options: ['am', 'is', 'are'],
      answer: 'are',
    },
    {
      question: 'The flowers ___ beautiful.',
      options: ['am', 'is', 'are'],
      answer: 'are',
    },
    {
      question: '___ this movie interesting?',
      options: ['am', 'is', 'are'],
      answer: 'is',
    },
    {
      question: 'No, I ___ not at home right now.',
      options: ['am', 'is', 'are'],
      answer: 'am',
    },
    {
      question: 'The cats ___ under the table.',
      options: ['am', 'is', 'are'],
      answer: 'are',
    },
    {
      question: 'The meeting ___ at 3 PM.',
      options: ['am', 'is', 'are'],
      answer: 'is',
    },
    {
      question: '___ we on the same team?',
      options: ['am', 'is', 'are'],
      answer: 'are',
    },
    {
      question: 'I ___ a big fan of this sports team.',
      options: ['am', 'is', 'are'],
      answer: 'am',
    },
    {
      question: 'The museum ___ closed on Sundays.',
      options: ['am', 'is', 'are'],
      answer: 'is',
    },
    {
      question: 'The coffee ___ hot.',
      options: ['am', 'is', 'are'],
      answer: 'is',
    },
    {
      question: 'The mountains ___ high.',
      options: ['am', 'is', 'are'],
      answer: 'are',
    },
    {
      question: 'The keys ___ on the table.',
      options: ['am', 'is', 'are'],
      answer: 'are',
    },
    {
      question: 'We ___ not on vacation.',
      options: ['am', 'is', 'are'],
      answer: 'are',
    },
    {
      question: '___ I in the correct room?',
      options: ['am', 'is', 'are'],
      answer: 'am',
    },
    {
      question: 'The weather ___ nice today.',
      options: ['am', 'is', 'are'],
      answer: 'is',
    },
    {
      question: '___ it Monday today?',
      options: ['am', 'is', 'are'],
      answer: 'is',
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(
    Array(quizData.length).fill(''),
  );
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = answer => {
    if (!showFeedback) {
      const newAnswers = [...userAnswers];
      newAnswers[currentQuestion] = answer;
      setUserAnswers(newAnswers);

      if (answer === quizData[currentQuestion].answer) {
        setScore(score + 1);
      }

      setShowFeedback(true);

      setTimeout(() => {
        if (currentQuestion < quizData.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          setShowResults(true);
        }
        setShowFeedback(false);
      }, 2000);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowFeedback(false);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowFeedback(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setUserAnswers(Array(quizData.length).fill(''));
    setScore(0);
    setShowResults(false);
    setShowFeedback(false);
  };

  return (
    <View style={styles.container}>
      {showResults ? (
        <View>
          <Text>
            Your Score: {score} / {quizData.length}
          </Text>
          <Button title="Restart Quiz" onPress={handleRestart} />
        </View>
      ) : (
        <View>
          <Text>{quizData[currentQuestion].question}</Text>
          {quizData[currentQuestion].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                showFeedback &&
                  (userAnswers[currentQuestion] === option
                    ? option === quizData[currentQuestion].answer
                      ? styles.correctButton
                      : styles.wrongButton
                    : ''),
              ]}
              onPress={() => handleAnswer(option)}>
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
          <View style={styles.buttonContainer}>
            <Button
              title="Back"
              onPress={handleBack}
              disabled={currentQuestion === 0}
            />
            <Button title="Next" onPress={handleNext} disabled={showFeedback} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#DDDDDD',
  },
  correctButton: {
    backgroundColor: 'green',
  },
  wrongButton: {
    backgroundColor: 'red',
  },
});

export default AppTest;
