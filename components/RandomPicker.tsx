import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

type RandomPickerProps = {
  items: string[];
  duration?: number;
  delay?: number;
  showControls?: boolean;
  autoStart?: boolean;
  initialChoice?: string;
};

type RandomPickerControlsProps = {
  isRunning: boolean;
  hasChoice: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
};

type RandomPickerChoiceProps = {
  choice: string;
};

const RandomPicker: React.FC<RandomPickerProps> = ({
  items,
  duration = 1000,
  delay = 25,
  showControls = false,
  autoStart = true,
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentChoice, setCurrentChoice] = useState("");

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    clearInterval(intervalRef.current!);
    intervalRef.current = setInterval(setChoice, delay);
    setIsRunning(true);

    timeoutRef.current = setTimeout(() => {
      stop();
      timeoutRef.current = null;
    }, duration);
  };

  const stop = () => {
    clearInterval(intervalRef.current!);
    setIsRunning(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Clear the timeout if it exists
    }
  };

  const reset = () => {
    clearInterval(intervalRef.current!);
    setIsRunning(false);
    setCurrentChoice("");
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Clear the timeout if it exists
    }
  };

  const pickChoice = () => {
    const choice = items[Math.floor(Math.random() * items.length)];
    return choice;
  };

  const setChoice = () => {
    setCurrentChoice(pickChoice());
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (autoStart) {
      start();
    }
  }, [autoStart]);

  return (
    <View>
      <RandomPickerChoice choice={currentChoice} />
      {showControls && (
        <RandomPickerControls
          isRunning={isRunning}
          hasChoice={currentChoice.trim().length > 0}
          start={start}
          stop={stop}
          reset={reset}
        />
      )}
    </View>
  );
};

RandomPicker.propTypes = {
  items: PropTypes.array.isRequired,
  duration: PropTypes.number,
  delay: PropTypes.number,
};

const RandomPickerChoice: React.FC<RandomPickerChoiceProps> = ({ choice }) => {
  const content = choice.trim().length > 0 ? choice : "?";

  return (
    <View style={{ marginVertical: 20 }}>
      <Text className="text-5xl text-white">{content}</Text>
    </View>
  );
};

const RandomPickerControls: React.FC<RandomPickerControlsProps> = ({
  isRunning,
  start,
  stop,
  reset,
}) => {
  return (
    <View style={{ flexDirection: "row", marginTop: 20 }}>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: isRunning ? "red" : "green",
          marginRight: 10,
        }}
        onPress={isRunning ? stop : start}
      >
        <Text style={{ color: "white" }}>{isRunning ? "Stop" : "Start"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ padding: 10, backgroundColor: "blue" }}
        onPress={reset}
      >
        <Text style={{ color: "white" }}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RandomPicker;
