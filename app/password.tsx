import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function ChangePassword() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const validatePassword = (password: string) => {
    const hasMinLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);

    return hasMinLength && hasNumber && hasUppercase && hasLowercase;
  };

  const handleChangePassword = () => {
    if (!newPassword || !verifyPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!validatePassword(newPassword)) {
      Alert.alert(
        "Invalid Password",
        "Your password must be at least 8 characters, include a number, an uppercase letter, and a lowercase letter."
      );
      return;
    }

    if (newPassword !== verifyPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    Alert.alert("Success", "Password changed successfully");
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flex: 1, padding: 16 }}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ fontSize: 16, color: "#007AFF" }}>Cancel</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Change Password</Text>
          <TouchableOpacity onPress={handleChangePassword}>
            <Text style={{ fontSize: 16, color: "#007AFF", fontWeight: "600" }}>Change</Text>
          </TouchableOpacity>
        </View>

        {/* New Password Field */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 14, color: "#666", marginBottom: 8 }}>New</Text>
          <TextInput
            placeholder="Enter new password"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
            style={{
              borderWidth: 1,
              borderColor: "#E8E8E8",
              borderRadius: 8,
              padding: 12,
              fontSize: 16,
              backgroundColor: "#f9f9f9",
            }}
          />
        </View>

        {/* Verify Password Field */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 14, color: "#666", marginBottom: 8 }}>Verify</Text>
          <TextInput
            placeholder="Confirm new password"
            secureTextEntry
            value={verifyPassword}
            onChangeText={setVerifyPassword}
            style={{
              borderWidth: 1,
              borderColor: "#E8E8E8",
              borderRadius: 8,
              padding: 12,
              fontSize: 16,
              backgroundColor: "#f9f9f9",
            }}
          />
        </View>

        {/* Password Requirements */}
        <View style={{ backgroundColor: "#F5F5F5", borderRadius: 8, padding: 12 }}>
          <Text style={{ fontSize: 12, color: "#999", lineHeight: 18 }}>
            Your password must be at least 8 characters, include a number, an uppercase letter,
            and a lowercase letter.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
