import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";

const TimerScreen = () => {
  const [time, setTimer] = useState(10 * 60); // 5 minutes in seconds
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let timerInterval: any;

    if (timerRunning) {
      timerInterval = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(timerInterval);
            setTimerRunning(false);
            // You can perform any action when the timer reaches 0 here
            return 0; // Add this line to ensure a number value is always returned
          }
        });
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }

    // Cleanup interval on component unmount
    return () => clearInterval(timerInterval);
  }, [timerRunning]);

  const startTimer = () => {
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
  };

  const formatTime = (seconds: any) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  {
    /* <Button title="Stop" onPress={stopTimer} /> */

    {
      /* <Button title="Start" onPress={startTimer} /> */
    }
  }

  return (
    <View className="px-5 py-3 ">
      <Text className="text-xl text-white">{formatTime(time)}</Text>
    </View>
  );
};

export default TimerScreen;
