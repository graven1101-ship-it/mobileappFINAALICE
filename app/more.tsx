import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import NavBar from "../components/NavBar";

export default function Index() {
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
