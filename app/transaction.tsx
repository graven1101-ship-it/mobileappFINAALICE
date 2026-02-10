import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import NavBar from "../components/NavBar";

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState("View All");
  const [selectedMonth, setSelectedMonth] = useState("Nov 2023");

  const categories = ["View All", "Food", "Shopping", "Travel", "Bill Payment"];

  const transactions = [
    {
      week: "This Week (26 Nov to 30 Nov)",
      items: [
        { icon: "🚗", name: "Travel", amount: "₽10,000", date: "26-11-23" },
      ],
    },
    {
      week: "Last Week (19 Nov to 25 Nov)",
      items: [
        { icon: "🍽️", name: "Food", amount: "₽2,000", date: "24-11-23" },
        { icon: "🛒", name: "Shopping", amount: "₽3,000", date: "23-11-23" },
        { icon: "📝", name: "Bill Payment", amount: "₽1,500", date: "20-11-23" },
      ],
    },
    {
      week: "Last Week (12 Nov to 18 Nov)",
      items: [
        { icon: "📱", name: "Recharge", amount: "₽1,500", date: "17-11-23" },
        { icon: "🍽️", name: "Food", amount: "₽1,800", date: "14-11-23" },
        { icon: "🛠️", name: "Maintenance", amount: "₽1,000", date: "13-11-23" },
      ],
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={{ flex: 1, paddingBottom: 807 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ paddingTop: 20, paddingBottom: 16, alignItems: "center", borderBottomWidth: 1, borderBottomColor: "#E8E8E8" }}>
          <Text style={{ fontSize: 24, fontWeight: "600" }}>Transactions</Text>
        </View>

        {/* Total Spendings */}
        <View style={{ margin: 16, backgroundColor: "#F5F5F5", padding: 16, borderRadius: 12 }}>
          <Text style={{ fontSize: 14, color: "#666", marginBottom: 8 }}>Total spendings of this month</Text>
          <Text style={{ fontSize: 32, fontWeight: "bold", color: "#333" }}>₽75,000</Text>
        </View>

        {/* Transaction Details Header */}
        <View style={{ paddingHorizontal: 16, marginBottom: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ fontSize: 14, fontWeight: "500", color: "#333" }}>Transaction details</Text>
          <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Text style={{ fontSize: 14, fontWeight: "500", color: "#333" }}>{selectedMonth}</Text>
            <Text style={{ fontSize: 12, color: "#999" }}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingHorizontal: 16, marginBottom: 24 }}
          contentContainerStyle={{ gap: 8 }}
        >
          {categories.map((category, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => setSelectedCategory(category)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
                backgroundColor: selectedCategory === category ? "#5856D6" : "#E8E8E8",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: selectedCategory === category ? "#fff" : "#333",
                }}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Transactions by Week */}
        <View style={{ paddingHorizontal: 16 }}>
          {transactions.map((group, groupIdx) => (
            <View key={groupIdx} style={{ marginBottom: 24 }}>
              <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 12, color: "#333" }}>
                {group.week}
              </Text>

              {group.items.map((transaction, itemIdx) => (
                <View
                  key={itemIdx}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingVertical: 12,
                    borderBottomWidth: itemIdx !== group.items.length - 1 ? 1 : 0,
                    borderBottomColor: "#E8E8E8",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                    <Text style={{ fontSize: 20, marginRight: 12 }}>{transaction.icon}</Text>
                    <View>
                      <Text style={{ fontSize: 16, fontWeight: "500", color: "#333" }}>
                        {transaction.name}
                      </Text>
                      <Text style={{ fontSize: 12, color: "#999" }}>{transaction.date}</Text>
                    </View>
                  </View>
                  <Text style={{ fontSize: 16, fontWeight: "600", color: "#E74C3C" }}>
                    {transaction.amount}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>
        <View style={{ height: 150 }} />
      </ScrollView>

      <NavBar onAddPress={() => console.log("Add pressed")} />
    </View>
  );
}
