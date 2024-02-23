import { Dispatch, SetStateAction, useState } from "react";

type SettingsState = {
  maxPoints: number;
  rounds: number;
  time: number;
  isLoserOn: boolean;
  isWhoSTartOn: boolean;
  isChangePlacesOn: boolean;
};

type UseSettingHook = {
  state: SettingsState;
  reset: () => void;
  save: () => void;
  setState: Dispatch<SetStateAction<SettingsState>>;
};

const useSetting = (initialState: SettingsState): UseSettingHook => {
  const [state, setState] = useState<SettingsState>(initialState);

  const reset = () => {
    setState(initialState);
  };

  const save = () => {
    console.log("Max Points: ", state.maxPoints);
    console.log("Rounds: ", state.rounds);
    console.log("Time: ", state.time);
    console.log("isLoserOn: ", state.isLoserOn);
    console.log("isWhoSTartOn: ", state.isWhoSTartOn);
    console.log("isChangePlacesOn: ", state.isChangePlacesOn);
  };

  return { state, reset, save, setState };
};

export default useSetting;
