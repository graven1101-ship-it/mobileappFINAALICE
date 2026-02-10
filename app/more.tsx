import { Image, ScrollView, Text, TouchableOpacity, View, Switch } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import NavBar from "../components/NavBar";
import { useTheme, colors } from "../context/ThemeContext";

export default function Index() {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const theme = isDarkMode ? colors.dark : colors.light;
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleSettingPress = (itemName: string) => {
    const routes: { [key: string]: string } = {
      "Account Preferences": "/Account",
      "Password & Account": "/password",
      "Notifications Settings": "/notifications",
      "Change Language": "/language",
      "Set Financial Goals": "/goals",
      "Set Budgeting Preferences": "/budgeting",
      "Manage Your Cards": "/cards",
      "Track financial progress": "/progress",
      "Two-Factor Authentication": "/twoFactor",
      "Change App Theme": "/theme",
      "Backup Your Account": "/backup",
      "Logout": "/logout",
    };
    const route = routes[itemName];
    if (route) {
      router.push(route);
    }
  };

  const settingsSections = [
    {
      title: "General Settings",
      items: [
        { icon: "👤", name: "Account Preferences" },
        { icon: "🔒", name: "Password & Account" },
        { icon: "🔔", name: "Notifications Settings" },
      
      ],
    },
    {
      title: "Transactional Settings",
      items: [
        { icon: "🎯", name: "Set Financial Goals" },
        { icon: "📊", name: "Set Budgeting Preferences" },
        { icon: "💳", name: "Manage Your Cards" },
        { icon: "📈", name: "Track financial progress" },
      ],
    },
    {
      title: "Additional Settings",
      items: [
        { icon: "🔐", name: "Two-Factor Authentication" },
        { icon: "🎨", name: "Change App Theme" },
        { icon: "💾", name: "Backup Your Account" },
        { icon: "👋", name: "Logout" },
      ],
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView
        style={{ flex: 1, paddingBottom: 200 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: theme.border }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              <Image
                source={require("../assets/images/react-logo.png")}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  marginRight: 16,
                  backgroundColor: theme.border,
                }}
              />
              <Text style={{ fontSize: 20, fontWeight: "600", color: theme.text }}>Allen Kalbo</Text>
            </View>
            <TouchableOpacity>
              <Text style={{ fontSize: 18 }}>✏️</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIdx) => (
          <View key={sectionIdx} style={{ paddingHorizontal: 16, paddingVertical: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 12, color: theme.text }}>
              {section.title}
            </Text>

            {section.items.map((item, itemIdx) => (
              <TouchableOpacity
                key={itemIdx}
                onPress={() => {
                  if (item.name !== "Notifications Settings" && item.name !== "Two-Factor Authentication" && item.name !== "Change App Theme") {
                    handleSettingPress(item.name);
                  }
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingVertical: 14,
                  borderBottomWidth: itemIdx !== section.items.length - 1 ? 1 : 0,
                  borderBottomColor: theme.border,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                  <Text style={{ fontSize: 18, marginRight: 12 }}>{item.icon}</Text>
                  <Text style={{ fontSize: 16, color: theme.text, fontWeight: "500" }}>
                    {item.name}
                  </Text>
                </View>
                {item.name === "Notifications Settings" ? (
                  <Switch
                    value={notificationsEnabled}
                    onValueChange={setNotificationsEnabled}
                    trackColor={{ false: theme.border, true: "#81C784" }}
                    thumbColor={notificationsEnabled ? "#4CAF50" : "#f4f3f4"}
                  />
                ) : item.name === "Two-Factor Authentication" ? (
                  <Switch
                    value={twoFactorEnabled}
                    onValueChange={setTwoFactorEnabled}
                    trackColor={{ false: theme.border, true: "#81C784" }}
                    thumbColor={twoFactorEnabled ? "#4CAF50" : "#f4f3f4"}
                  />
                ) : item.name === "Change App Theme" ? (
                  <Switch
                    value={isDarkMode}
                    onValueChange={toggleDarkMode}
                    trackColor={{ false: theme.border, true: "#81C784" }}
                    thumbColor={isDarkMode ? "#4CAF50" : "#f4f3f4"}
                  />
                ) : (
                  <Text style={{ fontSize: 16, color: theme.subtext }}>›</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
        
        {/* Blank Space */}
        <View style={{ height: 150 }} />
      </ScrollView>

      <NavBar onAddPress={() => console.log("Add pressed")} />
    </View>
  );
}
