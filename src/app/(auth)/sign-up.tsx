import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useSignUp } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import * as React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Page() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    // Start sign-up process using email and password provided
    const { error } = await signUp.password({
      emailAddress,
      password,
    });

    if (error) {
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    // Send user an email with verification code
    const { error: sendError } = await signUp.verifications.sendEmailCode();
    if (!sendError) {
      setPendingVerification(true);
    } else {
      console.error(JSON.stringify(sendError, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    // Use the code the user provided to attempt verification
    const { error } = await signUp.verifications.verifyEmailCode({ code });

    if (error) {
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    if (signUp.status === "complete") {
      await signUp.finalize({
        navigate: () => router.replace("/"),
      });
    }
  };

  if (pendingVerification) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Verify your email
        </ThemedText>
        <ThemedText style={styles.description}>
          A verification code has been sent to your email.
        </ThemedText>
        <TextInput
          style={styles.input}
          value={code}
          placeholder="Enter your verification code"
          placeholderTextColor="#666666"
          onChangeText={(code) => setCode(code)}
          keyboardType="numeric"
        />
        <Pressable
          className="bg-[#0a7ea4] active:opacity-70 disabled:opacity-50 py-3 px-6 rounded-lg items-center mt-2 w-full"
          onPress={onVerifyPress}
          disabled={fetchStatus === "fetching"}
        >
          <Text className="text-white font-semibold text-base">
            {fetchStatus === "fetching" ? "Verifying..." : "Verify"}
          </Text>
        </Pressable>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Sign up
      </ThemedText>
      <ThemedText style={styles.label}>Email address</ThemedText>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        placeholderTextColor="#666666"
        onChangeText={(email) => setEmailAddress(email)}
        keyboardType="email-address"
      />
      <ThemedText style={styles.label}>Password</ThemedText>
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Enter password"
        placeholderTextColor="#666666"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      {errors && (errors.global?.[0]?.message || Object.values(errors.fields || {}).some((f: any) => f?.message)) && (
        <ThemedText style={styles.errorText}>
          {errors.global?.[0]?.message || Object.values(errors.fields || {}).find((f: any) => f?.message)?.message}
        </ThemedText>
      )}
      <Pressable
        className={`bg-[#0a7ea4] active:opacity-70 py-3 px-6 rounded-lg items-center mt-2 w-full ${
          (!emailAddress || !password || fetchStatus === "fetching") ? "opacity-50" : ""
        }`}
        onPress={onSignUpPress}
        disabled={!emailAddress || !password || fetchStatus === "fetching"}
      >
        <Text className="text-white font-semibold text-base">
          {fetchStatus === "fetching" ? "Continuing..." : "Continue"}
        </Text>
      </Pressable>
      <View style={styles.linkContainer}>
        <ThemedText>Have an account? </ThemedText>
        <Link href="/sign-in">
          <ThemedText type="link">Sign in</ThemedText>
        </Link>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
  },
  title: {
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
    opacity: 0.8,
  },
  label: {
    fontWeight: "600",
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  linkContainer: {
    flexDirection: "row",
    gap: 4,
    marginTop: 12,
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 4,
  },
});
