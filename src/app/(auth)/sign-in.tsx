import { AuthView, useAuthViewState } from "@clerk/expo/native";
import { Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const { isLoaded, isAuthFlowComplete } = useAuthViewState();

  if (!isLoaded) {
    return null;
  }

  if (isAuthFlowComplete) {
    return <Redirect href="/" />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <AuthView mode="signInOrUp" />
    </SafeAreaView>
  );
}
