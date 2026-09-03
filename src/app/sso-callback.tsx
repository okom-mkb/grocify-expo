import { ActivityIndicator, View } from "react-native";

export default function SSOCallback() {
  return (
    <View className="flex-1 items-center justify-center bg-background dark:bg-secondary">
      <ActivityIndicator size="large" color="#208AEF" />
    </View>
  );
}
