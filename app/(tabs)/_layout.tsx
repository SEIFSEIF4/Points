import React from "react";
import { Tabs } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import PlayerProvider from "@/hooks/player-context";
import SettingsProvider from "@/hooks/Settings-context";
import TimerProvider from "@/hooks/Timer-context";
import AlertProvider from "@/components/AlertProvider";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <PaperProvider>
      <SettingsProvider>
        <PlayerProvider>
          <TimerProvider>
            <AlertProvider>
              <Tabs
                screenOptions={{
                  tabBarActiveTintColor: Colors[colorScheme ?? "dark"].tint,
                  headerShown: false,
                  tabBarStyle: {
                    display: "none",
                  },
                }}
              />
            </AlertProvider>
          </TimerProvider>
        </PlayerProvider>
      </SettingsProvider>
    </PaperProvider>
  );
}
