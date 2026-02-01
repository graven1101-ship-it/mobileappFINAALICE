import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignIn() {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header */}
        <View style={{ paddingTop: 40, paddingBottom: 40, alignItems: "center" }}>
          <Text style={{ fontSize: 32, fontWeight: "700", color: "#5856D6" }}>
            Budget Tracker
          </Text>
        </View>

        {/* Welcome Section */}
        <View
          style={{
            paddingHorizontal: 24,
            paddingBottom: 32,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 28, fontWeight: "600", marginBottom: 12 }}>
            Welcome!
          </Text>
          <Text style={{ fontSize: 16, color: "#666", textAlign: "center" }}>
            Please sign in to continue to your account.
          </Text>
        </View>

        {/* Sign In Form */}
        <View style={{ paddingHorizontal: 24 }}>
          {/* Email Section */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                marginBottom: 8,
                color: "#333",
              }}
            >
              Sign In
            </Text>
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
          <View style={{ marginBottom: 24 }}>
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

          {/* Sign In Button */}
          <TouchableOpacity
            onPress={() => navigation.navigate("home")}
            style={{
              backgroundColor: "#5856D6",
              paddingVertical: 14,
              borderRadius: 8,
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Text style={{ fontSize: 16, color: "#fff" }}>⇨</Text>
              <Text style={{ fontSize: 16, fontWeight: "600", color: "#fff" }}>
                Sign In
              </Text>
            </View>
          </TouchableOpacity>

          {/* Forgot Links */}
          <View style={{ alignItems: "center", marginBottom: 32 }}>
            <TouchableOpacity style={{ marginBottom: 8 }}>
              <Text style={{ fontSize: 14, color: "#5856D6" }}>
                🔗 Forgot Password?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{ fontSize: 14, color: "#5856D6" }}>
                Forgot Email?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <View
            style={{
              alignItems: "center",
              paddingTop: 24,
              borderTopWidth: 1,
              borderTopColor: "#E8E8E8",
            }}
          >
            <Text style={{ fontSize: 14, color: "#666", marginBottom: 8 }}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("signUP")}>
              <Text style={{ fontSize: 14, fontWeight: "600", color: "#5856D6" }}>
                👤 Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
