import { Image, ScrollView, Text, TouchableOpacity, View, TextInput, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTheme, colors } from "../context/ThemeContext";
import NavBar from "../components/NavBar";

export default function AccountScreen() {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? colors.dark : colors.light;

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Allen Kalbo");
  const [email, setEmail] = useState("allen.kalbo@email.com");
  const [phone, setPhone] = useState("+1 234 567 8900");
  const [tempName, setTempName] = useState(name);
  const [tempEmail, setTempEmail] = useState(email);
  const [tempPhone, setTempPhone] = useState(phone);

  const handleEditPress = () => {
    setTempName(name);
    setTempEmail(email);
    setTempPhone(phone);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!tempName.trim() || !tempEmail.trim() || !tempPhone.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!tempEmail.includes("@")) {
      Alert.alert("Error", "Please enter a valid email");
      return;
    }

    setName(tempName);
    setEmail(tempEmail);
    setPhone(tempPhone);
    setIsEditing(false);
    Alert.alert("Success", "Profile updated successfully");
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView
        style={{ flex: 1, paddingBottom: 200 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: theme.border }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={{ fontSize: 18, color: "#5856D6", fontWeight: "600" }}>← Back</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: "600", color: theme.text }}>Account Info</Text>
            <View style={{ width: 50 }} />
          </View>
        </View>

        {/* Profile Section */}
        <View style={{ padding: 20, alignItems: "center", borderBottomWidth: 1, borderBottomColor: theme.border }}>
          <Image
            source={require("../assets/images/react-logo.png")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: theme.border,
              marginBottom: 16,
            }}
          />
          {!isEditing && (
            <TouchableOpacity onPress={handleEditPress} style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 14, color: "#5856D6", fontWeight: "600" }}>Edit Profile</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Account Information */}
        <View style={{ padding: 20 }}>
          {isEditing && (
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
              <TouchableOpacity
                onPress={handleCancel}
                style={{
                  flex: 1,
                  marginRight: 8,
                  paddingVertical: 12,
                  backgroundColor: theme.border,
                  borderRadius: 8,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: theme.text, fontWeight: "600" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSave}
                style={{
                  flex: 1,
                  marginLeft: 8,
                  paddingVertical: 12,
                  backgroundColor: "#5856D6",
                  borderRadius: 8,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "600" }}>Save</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Name Field */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 14, fontWeight: "600", marginBottom: 8, color: theme.text }}>
              Full Name
            </Text>
            {isEditing ? (
              <TextInput
                value={tempName}
                onChangeText={setTempName}
                style={{
                  borderWidth: 1,
                  borderColor: theme.border,
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 16,
                  color: theme.text,
                  backgroundColor: isDarkMode ? "#0a0a0a" : "#f9f9f9",
                }}
                placeholderTextColor={theme.subtext}
              />
            ) : (
              <View style={{ borderBottomWidth: 1, borderBottomColor: theme.border, paddingVertical: 12 }}>
                <Text style={{ fontSize: 16, color: theme.text }}>{name}</Text>
              </View>
            )}
          </View>

          {/* Email Field */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 14, fontWeight: "600", marginBottom: 8, color: theme.text }}>
              Email Address
            </Text>
            {isEditing ? (
              <TextInput
                value={tempEmail}
                onChangeText={setTempEmail}
                keyboardType="email-address"
                style={{
                  borderWidth: 1,
                  borderColor: theme.border,
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 16,
                  color: theme.text,
                  backgroundColor: isDarkMode ? "#0a0a0a" : "#f9f9f9",
                }}
                placeholderTextColor={theme.subtext}
              />
            ) : (
              <View style={{ borderBottomWidth: 1, borderBottomColor: theme.border, paddingVertical: 12 }}>
                <Text style={{ fontSize: 16, color: theme.text }}>{email}</Text>
              </View>
            )}
          </View>

          {/* Phone Field */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 14, fontWeight: "600", marginBottom: 8, color: theme.text }}>
              Phone Number
            </Text>
            {isEditing ? (
              <TextInput
                value={tempPhone}
                onChangeText={setTempPhone}
                keyboardType="phone-pad"
                style={{
                  borderWidth: 1,
                  borderColor: theme.border,
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 16,
                  color: theme.text,
                  backgroundColor: isDarkMode ? "#0a0a0a" : "#f9f9f9",
                }}
                placeholderTextColor={theme.subtext}
              />
            ) : (
              <View style={{ borderBottomWidth: 1, borderBottomColor: theme.border, paddingVertical: 12 }}>
                <Text style={{ fontSize: 16, color: theme.text }}>{phone}</Text>
              </View>
            )}
          </View>

          {/* Account Details */}
          <View style={{ backgroundColor: theme.lightBg, borderRadius: 8, padding: 16, marginTop: 20 }}>
            <Text style={{ fontSize: 14, fontWeight: "600", marginBottom: 12, color: theme.text }}>
              Account Details
            </Text>
            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 12, color: theme.subtext }}>Member Since</Text>
              <Text style={{ fontSize: 14, color: theme.text, marginTop: 4 }}>January 15, 2024</Text>
            </View>
            <View>
              <Text style={{ fontSize: 12, color: theme.subtext }}>Account Status</Text>
              <Text style={{ fontSize: 14, color: "#4CAF50", marginTop: 4, fontWeight: "600" }}>Active</Text>
            </View>
          </View>
        </View>
        <View style={{ height: 150 }} />
      </ScrollView>

      <NavBar onAddPress={() => console.log("Add pressed")} />
    </View>
  );
}
