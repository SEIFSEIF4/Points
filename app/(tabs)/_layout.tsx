import React from "react";
import { Tabs } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import PlayerProvider from "@/hooks/player-context";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <PaperProvider>
      <PlayerProvider>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? "dark"].tint,
            headerShown: false,
            tabBarStyle: {
              display: "none",
            },
          }}
        />
      </PlayerProvider>
    </PaperProvider>
  );
}
