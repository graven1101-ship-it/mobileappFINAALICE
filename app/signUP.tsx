import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignUp() {
  const navigation = useNavigation();
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [agreeTerms, setAgreeTerms] = React.useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header */}
        <View style={{ paddingTop: 20, paddingBottom: 20, alignItems: "center", borderBottomWidth: 1, borderBottomColor: "#E8E8E8" }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Sign Up</Text>
        </View>

        {/* Welcome Section */}
        <View
          style={{
            paddingHorizontal: 24,
            paddingTop: 32,
            paddingBottom: 24,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 32, fontWeight: "600", marginBottom: 16 }}>
            Welcome
          </Text>
        </View>

        {/* Account Information Section */}
        <View style={{ paddingHorizontal: 24 }}>
          {/* Section Title */}
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                marginBottom: 4,
                color: "#333",
              }}
            >
              Account Information
            </Text>
            <Text style={{ fontSize: 14, color: "#666" }}>
              Enter your credentials below.
            </Text>
          </View>

          {/* Full Name Input */}
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                marginBottom: 8,
                color: "#333",
              }}
            >
              Full Name
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#E8E8E8",
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 12,
                fontSize: 16,
                color: "#333",
              }}
              placeholder="Full Name"
              placeholderTextColor="#999"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          {/* Email Input */}
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                marginBottom: 8,
                color: "#333",
              }}
            >
              Email
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#E8E8E8",
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 12,
                fontSize: 16,
                color: "#333",
              }}
              placeholder="Email address"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password Input */}
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                marginBottom: 8,
                color: "#333",
              }}
            >
              Password
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#E8E8E8",
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 12,
                fontSize: 16,
                color: "#333",
              }}
              placeholder="Password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {/* Confirm Password Input */}
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                marginBottom: 8,
                color: "#333",
              }}
            >
              Confirm Password
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#E8E8E8",
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 12,
                fontSize: 16,
                color: "#333",
              }}
              placeholder="Confirm Password"
              placeholderTextColor="#999"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          {/* Terms & Conditions Checkbox */}
          <TouchableOpacity
            onPress={() => setAgreeTerms(!agreeTerms)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 24,
              gap: 8,
            }}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderWidth: 2,
                borderColor: "#5856D6",
                borderRadius: 4,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: agreeTerms ? "#5856D6" : "#fff",
              }}
            >
              {agreeTerms && (
                <Text style={{ color: "#fff", fontSize: 12, fontWeight: "600" }}>
                  ✓
                </Text>
              )}
            </View>
            <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
              <Text style={{ fontSize: 14, color: "#333" }}>I agree with </Text>
              <TouchableOpacity>
                <Text
                  style={{ fontSize: 14, color: "#5856D6", fontWeight: "500" }}
                >
                  Terms & Conditions
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          {/* Sign Up Button */}
          <TouchableOpacity
            onPress={() => navigation.navigate("home")}
            style={{
              backgroundColor: "#5856D6",
              paddingVertical: 14,
              borderRadius: 8,
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Text style={{ fontSize: 16, color: "#fff" }}>⇨</Text>
              <Text style={{ fontSize: 16, fontWeight: "600", color: "#fff" }}>
                Sign Up
              </Text>
            </View>
          </TouchableOpacity>

          {/* Sign In Link */}
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 14, color: "#666", marginBottom: 8 }}>
              All ready have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("index")}>
              <Text style={{ fontSize: 14, fontWeight: "600", color: "#5856D6" }}>
                👤 Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
