import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import NavBar from "../components/NavBar";

export default function Index() {
  const router = useRouter();

  const handleSettingPress = (itemName: string) => {
    const routes: { [key: string]: string } = {
      "Account Preferences": "/account",
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
        { icon: "🌐", name: "Change Language" },
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
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={{ flex: 1, paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: "#E8E8E8" }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              <Image
                source={require("../assets/images/react-logo.png")}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  marginRight: 16,
                  backgroundColor: "#E8E8E8",
                }}
              />
              <Text style={{ fontSize: 20, fontWeight: "600" }}>Allen Kalbo</Text>
            </View>
            <TouchableOpacity>
              <Text style={{ fontSize: 18 }}>✏️</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIdx) => (
          <View key={sectionIdx} style={{ paddingHorizontal: 16, paddingVertical: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 12, color: "#333" }}>
              {section.title}
            </Text>

            {section.items.map((item, itemIdx) => (
              <TouchableOpacity
                key={itemIdx}
                onPress={() => handleSettingPress(item.name)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingVertical: 14,
                  borderBottomWidth: itemIdx !== section.items.length - 1 ? 1 : 0,
                  borderBottomColor: "#E8E8E8",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                  <Text style={{ fontSize: 18, marginRight: 12 }}>{item.icon}</Text>
                  <Text style={{ fontSize: 16, color: "#333", fontWeight: "500" }}>
                    {item.name}
                  </Text>
                </View>
                <Text style={{ fontSize: 16, color: "#999" }}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>

      <NavBar onAddPress={() => console.log("Add pressed")} />
    </View>
  );
}
