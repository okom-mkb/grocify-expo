import { Show, useClerk, useUser } from "@clerk/expo";
import { UserProfileView } from "@clerk/expo/native";
import { Redirect } from "expo-router";
import { useState } from "react";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";

export default function Page() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <View style={styles.container}>

      <Show when="signed-out">
        <Redirect href="/sign-in" />
      </Show>
      <Text style={styles.title}>Welcome!</Text>
    
      <Show when="signed-in">
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <Pressable style={styles.button} onPress={() => signOut()}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </Pressable>

        <Pressable 
          onPress={() => setIsProfileOpen(true)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            marginTop: 10,
          }}
        >
          {user?.imageUrl ? (
            <Image
              source={{ uri: user.imageUrl }}
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
              }}
            />
          ) : (
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: "#ccc",
              }}
            />
          )}
          <Text style={{ fontSize: 16, fontWeight: "500" }}>Manage Profile</Text>
        </Pressable>

        <Modal
          animationType="slide"
          visible={isProfileOpen}
          presentationStyle="pageSheet"
          onRequestClose={() => setIsProfileOpen(false)}
        >
          <UserProfileView onDismiss={() => setIsProfileOpen(false)} style={{ flex: 1 }} />
        </Modal>
      </Show>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#0a7e04",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
