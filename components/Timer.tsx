import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import TimerDialog from "./TimerDialog";
import { useTimer } from "@/hooks/Timer-context";

const TimerScreen = () => {
  const { timeValue, formatTime } = useTimer();
  const [visible, setVisible] = useState(false);

  return (
    // <View className="flex flex-col w-[25%] h-[50%] justify-around   ">
    //   <Text className="text-xl text-white">{formatTime(time)}</Text>
    //   <Button title="Start" onPress={startTimer} />
    //   <Button title="Stop" onPress={stopTimer} />
    //   <Button title="Restart" onPress={restartTimer} />
    //   <Button title="Add 3 min" onPress={() => addExtraTime(3)} />
    //   <Button title="Add 5 min" onPress={() => addExtraTime(5)} />
    //   <Button title="stop Sound" onPress={StopSound} />
    //   <Button title="Play Sound" onPress={playSound} />
    //   {timerRunning === false && (
    //     <Text className="text-xl text-white">Time is up</Text>
    //   )}
    // </View>
    <>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Text
          className={
            "text-2xl text-white text-center  px-1 rounded-md " +
            (timeValue < 30 ? "text-red-500" : "")
          }
        >
          {formatTime(timeValue)}
        </Text>
      </TouchableOpacity>
      <TimerDialog visible={visible} setVisible={setVisible} />
    </>
  );
};

export default TimerScreen;
