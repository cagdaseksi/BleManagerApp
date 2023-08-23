import React, {useState, useEffect} from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const AppTest2 = () => {
  const quizData = [
    {
      question: 'How much ___ that shirt cost?',
      options: ['is', 'do', 'does'],
      answer: 'does',
    },
    {
      question: 'I ___ in a small town.',
      options: ['lives', 'live', 'does'],
      answer: 'live',
    },
    {
      question: '____ you know how to cook pizza?',
      options: ['do', 'does', 'doesn’t'],
      answer: 'do',
    },
    {
      question: 'He ___ a book every night.',
      options: ['read', 'reads', 'write'],
      answer: 'reads',
    },
    {
      question: '___ your sister play any sports?',
      options: ['do', 'does', 'is'],
      answer: 'does',
    },
    {
      question: 'We ___ movies on weekends.',
      options: ['watch', 'watches', 'plays'],
      answer: 'watch',
    },
    {
      question: 'The shop ___ at 9 in the morning.',
      options: ['open', 'opens', 'close'],
      answer: 'opens',
    },
    {
      question: 'She ___ as a teacher at that school.',
      options: ['work', 'works', 'is'],
      answer: 'works',
    },
    {
      question: 'Jack ___ to do a marathon next year.',
      options: ['want', 'wants', 'does'],
      answer: 'wants',
    },
    {
      question: 'What time ___ the movie start?',
      options: ['do', 'does', 'is'],
      answer: 'does',
    },
    {
      question: 'They ___ playing soccer.',
      options: ['enjoy', 'enjoys', 'does'],
      answer: 'enjoy',
    },
    {
      question: 'Why ___ he seem so upset today?',
      options: ['do', 'does', 'is'],
      answer: 'does',
    },
    {
      question: '___ you play any musical instruments?',
      options: ['are', 'do', 'does'],
      answer: 'do',
    },
    {
      question: 'She ___ in helping others.',
      options: ['believe', 'believes', 'does'],
      answer: 'believes',
    },
    {
      question: 'My parents ___ us often.',
      options: ['visit', 'visits', 'sees'],
      answer: 'visit',
    },
    {
      question: 'I ___ my parents every Tuesday.',
      options: ['visit', 'visits', 'am'],
      answer: 'visit',
    },
    {
      question: 'Why ___ you do your homework now?',
      options: ['aren’t', 'don’t', 'doesn’t'],
      answer: 'don’t',
    },
    {
      question: 'He ___ the guitar beautifully.',
      options: ['play', 'plays', 'is'],
      answer: 'plays',
    },
    {
      question: 'The train ___ at 7 PM.',
      options: ['plays', 'arrives', 'travel'],
      answer: 'arrives',
    },
    {
      question: 'We eat breakfast together.',
      options: ['eat', 'eats', 'are'],
      answer: 'eat',
    },
    {
      question: '___ he listen to music while working?',
      options: ['do', 'does', 'is'],
      answer: 'does',
    },
    {
      question: 'He ___ his dog every morning.',
      options: ['walk', 'walks', 'play'],
      answer: 'walks',
    },
    {
      question: 'She ___ three languages.',
      options: ['speak', 'speaks', 'write'],
      answer: 'speaks',
    },
    {
      question: 'I ___ to do my laundry today.',
      options: ['need', 'needs', 'do'],
      answer: 'need',
    },
    {
      question: 'They ___ chess every evening.',
      options: ['play', 'plays', 'do'],
      answer: 'play',
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

  const handleNextOrFinish = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowFeedback(false);
    } else {
      setShowResults(true);
    }
  };

  return (
    <LinearGradient
      colors={['#F29727', '#F29727', '#F29727']}
      style={styles.container}>
      {showResults ? (
        <View>
          <Text>
            Your Score: {score} / {quizData.length}
          </Text>
          <Button title="Restart Quiz" onPress={handleRestart} />
        </View>
      ) : (
        <View style={styles.content}>
          <Text style={styles.questionCounter}>
            {currentQuestion + 1}/{quizData.length}
          </Text>
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
            {/* <Button title="Next" onPress={handleNext} disabled={showFeedback} /> */}
            <Button
              title={
                currentQuestion === quizData.length - 1 ? 'Finish' : 'Next'
              }
              onPress={handleNextOrFinish}
              disabled={showFeedback}
            />
          </View>
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    paddingHorizontal: 20,
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

export default AppTest2;
