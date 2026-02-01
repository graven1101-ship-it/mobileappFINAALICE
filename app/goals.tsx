import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import NavBar from "../components/NavBar";

export default function Index() {
  const goals = [
    { name: "Emergencyswqqedes Fund", target: "₽10,000", saved: "$3,500", percentage: 35 },
    { name: "Vacation to Bali", target: "₽5,000", saved: "$1,200", percentage: 24 },
    { name: "New Lswwwwwwwwwwwwwaptop", target: "₽1,500", saved: "$750", percentage: 50 },
      { name: "Emergency Fund", target: "₽10,000", saved: "$3,500", percentage: 35 },
    { name: "Vacation to Bali", target: "₽5,000", saved: "$1,200", percentage: 24 },
    { name: "New Lswwwwwwwwwwsdfsdfsdsdwwwwaptop", target: "₽1,500", saved: "$750", percentage: 50 },
  ];

  

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={{ flex: 1, paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ paddingTop: 20, paddingBottom: 24, alignItems: "center", borderBottomWidth: 1, borderBottomColor: "#E8E8E8" }}>
          <Text style={{ fontSize: 24, fontWeight: "600" }}>Goals</Text>
        </View>

        {/* My Goals Section */}
        <View style={{ margin: 16, backgroundColor: "#F0F0FF", padding: 20, borderRadius: 12 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>My Goals</Text>
            <TouchableOpacity>
              <Text style={{ color: "#5856D6", fontSize: 14, fontWeight: "500" }}>View All →</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 14, color: "#666", marginBottom: 16, lineHeight: 20 }}>
            Set clear financial targets, track your progress, and stay motivated to achieve your dreams.
          </Text>
          <TouchableOpacity style={{ backgroundColor: "#5856D6", paddingVertical: 14, borderRadius: 8, alignItems: "center" }}>
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>+ Add New Goal</Text>
          </TouchableOpacity>
        </View>

        {/* My Existing Goals */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 16 }}>My Existing Goals</Text>

          {goals.map((goal, idx) => (
            <View
              key={idx}
              style={{
                backgroundColor: "#fff",
                borderWidth: 1,
                borderColor: "#E8E8E8",
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
              }}
            >
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <Text style={{ fontSize: 16, fontWeight: "600" }}>{goal.name}</Text>
                <Text style={{ fontSize: 16, fontWeight: "600", color: "#333" }}>{goal.target}</Text>
              </View>

              <View style={{ marginBottom: 12 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
                  <Text style={{ fontSize: 13, color: "#666" }}>Saved: {goal.saved}</Text>
                  <Text style={{ fontSize: 13, color: "#666" }}>{goal.percentage}%</Text>
                </View>
                <View style={{ height: 8, backgroundColor: "#E8E8E8", borderRadius: 4, overflow: "hidden" }}>
                  <View
                    style={{
                      height: "100%",
                      width: `${goal.percentage}%`,
                      backgroundColor: "#5856D6",
                      borderRadius: 4,
                    }}
                  />
                </View>
              </View>

              <View style={{ flexDirection: "row", justifyContent: "flex-end", gap: 12 }}>
                <TouchableOpacity>
                  <Text style={{ fontSize: 18, color: "#5856D6" }}>✏️</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{ fontSize: 18, color: "#E74C3C" }}>🗑️</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        
      </ScrollView>

      <NavBar onAddPress={() => console.log("Add pressed")} />
    </View>
  );
}
