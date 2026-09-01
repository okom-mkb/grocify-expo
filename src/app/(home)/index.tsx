import { SignOutButton } from "@/components/sign-out-button";
import { Show, useSession, useUser } from "@clerk/expo";
import { AuthView, UserButton, UserProfileView } from "@clerk/expo/native";
import { Link } from "expo-router";
import * as React from "react";
import { Pressable, StyleSheet, Text, View, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const { user } = useUser();
  const { session } = useSession();
  console.log(session?.currentTask);

  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  return (
    <>
      {/* Show the native AuthView login/signup directly on the home page when signed out */}
      <Show when="signed-out">
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          <AuthView mode="signInOrUp" />
        </SafeAreaView>
      </Show>

      {/* Show the protected user home dashboard when signed in */}
      <Show when="signed-in">
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>
            Welcome!
          </Text>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <UserButton />
            </View>
            <Text style={styles.greeting}>
              Hello {user?.emailAddresses[0]?.emailAddress}
            </Text>
          </View>

          <Pressable 
            className="bg-[#0a7ea4] active:opacity-70 py-3 px-6 rounded-lg items-center mt-2 w-full"
            onPress={() => setIsProfileOpen(true)}
          >
            <Text className="text-white font-semibold text-base">Manage Profile</Text>
          </Pressable>

          <SignOutButton />

          <Modal
            animationType="slide"
            visible={isProfileOpen}
            presentationStyle="pageSheet"
            onRequestClose={() => setIsProfileOpen(false)}
          >
            <UserProfileView onDismiss={() => setIsProfileOpen(false)} />
          </Modal>
        </SafeAreaView>
      </Show>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  greeting: {
    fontSize: 18,
    fontWeight: "500",
  },
});
