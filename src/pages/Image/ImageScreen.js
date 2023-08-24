import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ImageScreen = () => {
  const quizData = [
    {
      question: 'The books are on their heads.',
      options: [
        require('../../assets/images/1a.jpg'),
        require('../../assets/images/1b.jpg'),
        require('../../assets/images/1c.jpg'),
        require('../../assets/images/1d.jpg'),
      ],
      answer: require('../../assets/images/1b.jpg'),
    },
    {
      question: 'The girls have robots.',
      options: [
        require('../../assets/images/2a.jpg'),
        require('../../assets/images/2b.jpg'),
        require('../../assets/images/2c.jpg'),
        require('../../assets/images/2d.jpg'),
      ],
      answer: require('../../assets/images/2b.jpg'),
    },
    {
      question: 'She is in her office.',
      options: [
        require('../../assets/images/3a.jpg'),
        require('../../assets/images/3b.jpg'),
        require('../../assets/images/3c.jpg'),
        require('../../assets/images/3d.jpg'),
      ],
      answer: require('../../assets/images/3b.jpg'),
    },
    {
      question: 'She is at work.',
      options: [
        require('../../assets/images/4a.jpg'),
        require('../../assets/images/4b.jpg'),
        require('../../assets/images/4c.jpg'),
        require('../../assets/images/4d.jpg'),
      ],
      answer: require('../../assets/images/4d.jpg'),
    },
    {
      question: 'She listens to music.',
      options: [
        require('../../assets/images/5a.jpg'),
        require('../../assets/images/5b.jpg'),
        require('../../assets/images/5c.jpg'),
        require('../../assets/images/5d.jpg'),
      ],
      answer: require('../../assets/images/5a.jpg'),
    },
    {
      question: 'The teacher is in the classroom.',
      options: [
        require('../../assets/images/6a.jpg'),
        require('../../assets/images/6b.jpg'),
        require('../../assets/images/6c.jpg'),
        require('../../assets/images/6d.jpg'),
      ],
      answer: require('../../assets/images/6c.jpg'),
    },
    {
      question: 'The girls play at the sports hall.',
      options: [
        require('../../assets/images/7a.jpg'),
        require('../../assets/images/7b.jpg'),
        require('../../assets/images/7c.jpg'),
        require('../../assets/images/7d.jpg'),
      ],
      answer: require('../../assets/images/7a.jpg'),
    },
    {
      question: 'I am in my class.',
      options: [
        require('../../assets/images/8a.jpg'),
        require('../../assets/images/8b.jpg'),
        require('../../assets/images/8c.jpg'),
        require('../../assets/images/8d.jpg'),
      ],
      answer: require('../../assets/images/8d.jpg'),
    },
    {
      question: 'She looks for a book.',
      options: [
        require('../../assets/images/9a.jpg'),
        require('../../assets/images/9b.jpg'),
        require('../../assets/images/9c.jpg'),
        require('../../assets/images/9d.jpg'),
      ],
      answer: require('../../assets/images/9a.jpg'),
    },
    {
      question: 'The men are on the boat.',
      options: [
        require('../../assets/images/10a.jpg'),
        require('../../assets/images/10b.jpg'),
        require('../../assets/images/10c.jpg'),
        require('../../assets/images/10d.jpg'),
      ],
      answer: require('../../assets/images/10c.jpg'),
    },
    {
      question: 'The students are at a festival.',
      options: [
        require('../../assets/images/11a.jpg'),
        require('../../assets/images/11b.jpg'),
        require('../../assets/images/11c.jpg'),
        require('../../assets/images/11d.jpg'),
      ],
      answer: require('../../assets/images/11b.jpg'),
    },
    {
      question: 'They walk out of the subway.',
      options: [
        require('../../assets/images/12a.jpg'),
        require('../../assets/images/12b.jpg'),
        require('../../assets/images/12c.jpg'),
        require('../../assets/images/12d.jpg'),
      ],
      answer: require('../../assets/images/12c.jpg'),
    },
    {
      question: 'The apples are on the tree.',
      options: [
        require('../../assets/images/13a.jpg'),
        require('../../assets/images/13b.jpg'),
        require('../../assets/images/13c.jpg'),
        require('../../assets/images/13d.jpg'),
      ],
      answer: require('../../assets/images/13d.jpg'),
    },
    {
      question: 'There is no one at the dentist.',
      options: [
        require('../../assets/images/14a.jpg'),
        require('../../assets/images/14b.jpg'),
        require('../../assets/images/14c.jpg'),
        require('../../assets/images/14d.jpg'),
      ],
      answer: require('../../assets/images/14c.jpg'),
    },
    {
      question: 'She writes on the board.',
      options: [
        require('../../assets/images/15a.jpg'),
        require('../../assets/images/15b.jpg'),
        require('../../assets/images/15c.jpg'),
        require('../../assets/images/15d.jpg'),
      ],
      answer: require('../../assets/images/15a.jpg'),
    },
    {
      question: 'They look at the board.',
      options: [
        require('../../assets/images/16a.jpg'),
        require('../../assets/images/16b.jpg'),
        require('../../assets/images/16c.jpg'),
        require('../../assets/images/16d.jpg'),
      ],
      answer: require('../../assets/images/16d.jpg'),
    },
    {
      question: 'The boy learns about the world.',
      options: [
        require('../../assets/images/14a.jpg'),
        require('../../assets/images/17b.jpg'),
        require('../../assets/images/14c.jpg'),
        require('../../assets/images/14d.jpg'),
      ],
      answer: require('../../assets/images/17b.jpg'),
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
          setShowFeedback(false);
        } else {
          setShowResults(true);
        }
      }, 1000);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (!showFeedback) {
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true);
      }
      setShowFeedback(false);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setUserAnswers(Array(quizData.length).fill(''));
    setScore(0);
    setShowResults(false);
    setShowFeedback(false);
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
          <Button title="Restart Quiz" onPress={handleReset} />
        </View>
      ) : (
        <View>
          <Text style={styles.progressText}>
            {currentQuestion + 1}/{quizData.length}
          </Text>
          <Text style={styles.questionText}>
            {quizData[currentQuestion].question}
          </Text>
          <View style={styles.imageContainer}>
            {quizData[currentQuestion].options.map((option, index) => (
              <View
                key={index}
                style={[
                  styles.imageWrapper,
                  showFeedback &&
                    (userAnswers[currentQuestion] === option
                      ? option === quizData[currentQuestion].answer
                        ? styles.correctImage
                        : styles.wrongImage
                      : ''),
                ]}>
                <TouchableOpacity
                  onPress={() => handleAnswer(option)}
                  style={styles.touchable}>
                  <Image source={option} style={[styles.image]} />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Previous"
              onPress={handlePrevious}
              disabled={currentQuestion === 0 || showFeedback}
            />
            <Button
              title={
                currentQuestion === quizData.length - 1 ? 'Finish' : 'Next'
              }
              onPress={handleNext}
              disabled={showFeedback || userAnswers[currentQuestion] === ''}
            />
          </View>
        </View>
      )}
    </LinearGradient>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
  progressText: {
    marginTop: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  imageWrapper: {
    margin: 5,
  },
  correctImage: {
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 10,
  },
  wrongImage: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 10,
  },
  touchable: {
    alignItems: 'center', // Center the content horizontally
  },
  image: {
    width: (windowWidth - 20) * 0.45,
    height: windowHeight * 0.2,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  questionText: {
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
});

export default ImageScreen;
