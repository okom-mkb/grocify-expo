import { SignOutButton } from "@/components/sign-out-button";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Show, useSession, useUser } from "@clerk/expo";
import { UserButton, UserProfileView } from "@clerk/expo/native";
import { Link } from "expo-router";
import * as React from "react";
import { Pressable, StyleSheet, Text, View, Modal } from "react-native";

export default function Page() {
  const { user } = useUser();
  const { session } = useSession();
  console.log(session?.currentTask);

  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Welcome!
      </ThemedText>
      {/* Show the sign-in and sign-up buttons when the user is signed out */}
      <Show when="signed-out">
        <Link href="/(auth)/sign-in" asChild>
          <Pressable className="bg-[#0a7ea4] active:opacity-70 py-3 px-6 rounded-lg items-center mt-2 w-full">
            <Text className="text-white font-semibold text-base">Sign in</Text>
          </Pressable>
        </Link>
        <Link href="/(auth)/sign-up" asChild>
          <Pressable className="bg-[#0a7ea4] active:opacity-70 py-3 px-6 rounded-lg items-center mt-2 w-full">
            <Text className="text-white font-semibold text-base">Sign up</Text>
          </Pressable>
        </Link>
      </Show>
      {/* Show the sign-out button when the user is signed in */}
      <Show when="signed-in">
        <View style={styles.profileHeader}>
          <UserButton />
          <ThemedText style={styles.greeting}>
            Hello {user?.emailAddresses[0].emailAddress}
          </ThemedText>
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
      </Show>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: 12,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "500",
  },
});
