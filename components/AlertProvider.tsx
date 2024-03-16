import { AlertNotificationRoot } from "react-native-alert-notification";
import { SafeAreaView } from "react-native-safe-area-context";

const AlertProvider = ({ children }: any) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AlertNotificationRoot theme="dark">{children}</AlertNotificationRoot>
    </SafeAreaView>
  );
};

export default AlertProvider;
