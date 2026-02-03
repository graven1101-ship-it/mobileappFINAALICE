import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import NavBar from "../components/NavBar";

export default function Index() {
  const router = useRouter();
  const transactions = [
    { category: "Travel", date: "28-11-23", amount: "-₽10,000", icon: "🚗" },
    { category: "Food", date: "24-11-23", amount: "-₽2,000", icon: "🍽️" },
    { category: "Shopping", date: "23-11-23", amount: "-₽3,000", icon: "🛒" },
    { category: "Groceries", date: "22-11-23", amount: "-₽4,500", icon: "🛒" },
    { category: "Dining Out", date: "21-11-23", amount: "-₽1,200", icon: "🍽️" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={{ flex: 1, paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ padding: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../assets/images/react-logo.png")}
              style={{ width: 40, height: 40, borderRadius: 20, marginRight: 12 }}
            />
            <Text style={{ fontSize: 18, fontWeight: "600" }}>Budget Tracker</Text>
          </View>
        </View>

        {/* Budget Overview */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <Text style={{ fontSize: 32, fontWeight: "bold" }}>
              ₽75,000 <Text style={{ fontSize: 18, fontWeight: "400", color: "#999" }}>/100,000</Text>
            </Text>
            <TouchableOpacity onPress={() => router.push("addAThome")}>
              <Text style={{ color: "#5856D6", fontSize: 16, fontWeight: "500" }}>Edit</Text>
            </TouchableOpacity>
          </View>

          {/* Progress Bar */}
          <View style={{ marginBottom: 16 }}>
            <View style={{ height: 8, backgroundColor: "#E8E8E8", borderRadius: 4, overflow: "hidden" }}>
              <View style={{ height: "100%", width: "75%", backgroundColor: "#5856D6", borderRadius: 4 }} />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
              <Text style={{ fontSize: 12, color: "#666" }}>0</Text>
              <Text style={{ fontSize: 12, color: "#666" }}>50K</Text>
              <Text style={{ fontSize: 12, color: "#666" }}>100K</Text>
            </View>
          </View>
        </View>

        {/* Spending Graph */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>Your spending graph</Text>
            <TouchableOpacity>
              <Text style={{ color: "#5856D6", fontSize: 14 }}>Nov ▼</Text>
            </TouchableOpacity>
          </View>

          {/* Simple Bar Chart */}
          <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-around", height: 200 }}>
            {[
              { label: "Week 1", height: 120 },
              { label: "Week 2", height: 180 },
              { label: "Week 3", height: 160 },
              { label: "Week 4", height: 130 },
            ].map((week, idx) => (
              <View key={idx} style={{ alignItems: "center" }}>
                <View
                  style={{
                    width: 40,
                    height: week.height,
                    backgroundColor: "#5856D6",
                    borderRadius: 4,
                    marginBottom: 8,
                  }}
                />
                <Text style={{ fontSize: 12, color: "#666" }}>{week.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Tip Section */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24, backgroundColor: "#F5F5F5", padding: 16, borderRadius: 8 }}>
          <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
            <Text style={{ fontSize: 18, marginRight: 8 }}>💡</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 4 }}>Tip:</Text>
              <Text style={{ fontSize: 14, color: "#333", lineHeight: 20 }}>
                Track every expense today, even small ones. Awareness is the first step to saving more money!
              </Text>
            </View>
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 16 }}>Your recent transactions</Text>

          {transactions.map((transaction, idx) => (
            <View
              key={idx}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 12,
                borderBottomWidth: idx !== transactions.length - 1 ? 1 : 0,
                borderBottomColor: "#E8E8E8",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                <Text style={{ fontSize: 20, marginRight: 12 }}>{transaction.icon}</Text>
                <View>
                  <Text style={{ fontSize: 16, fontWeight: "500" }}>{transaction.category}</Text>
                  <Text style={{ fontSize: 12, color: "#999" }}>{transaction.date}</Text>
                </View>
              </View>
              <Text style={{ fontSize: 16, fontWeight: "600", color: "#E74C3C" }}>
                {transaction.amount}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <NavBar onAddPress={() => console.log("Add pressed")} />
    </View>
  );
}
