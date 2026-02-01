import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [amount, setAmount] = useState("0.00");
  const [type, setType] = useState("expense"); // "income" or "expense"
  const [category, setCategory] = useState("");
  const [payment, setPayment] = useState("");
  const [date, setDate] = useState("January 3rd, 2026");
  const [note, setNote] = useState("");

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ paddingTop: 20, paddingBottom: 16, alignItems: "center", borderBottomWidth: 1, borderBottomColor: "#E8E8E8" }}>
          <Text style={{ fontSize: 20, fontWeight: "600" }}>Add Transaction</Text>
        </View>

        {/* Form Content */}
        <View style={{ padding: 16 }}>
          {/* Amount */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 14, fontWeight: "500", marginBottom: 8, color: "#333" }}>Amount</Text>
            <TextInput
              style={{
                backgroundColor: "#E8E8E8",
                paddingHorizontal: 12,
                paddingVertical: 12,
                borderRadius: 8,
                fontSize: 16,
                color: "#333",
              }}
              placeholder="0.00"
              placeholderTextColor="#999"
              keyboardType="decimal-pad"
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          {/* Type */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 14, fontWeight: "500", marginBottom: 8, color: "#333" }}>Type</Text>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <TouchableOpacity
                onPress={() => setType("income")}
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderRadius: 8,
                  backgroundColor: type === "income" ? "#5856D6" : "#E8E8E8",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "600", color: type === "income" ? "#fff" : "#333" }}>
                  Income
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setType("expense")}
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderRadius: 8,
                  backgroundColor: type === "expense" ? "#5856D6" : "#E8E8E8",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "600", color: type === "expense" ? "#fff" : "#333" }}>
                  Expense
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Category */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 14, fontWeight: "500", marginBottom: 8, color: "#333" }}>Category</Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#E8E8E8",
                paddingHorizontal: 12,
                paddingVertical: 12,
                borderRadius: 8,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 16, color: category ? "#333" : "#999" }}>
                {category || "Select a category"}
              </Text>
              <Text style={{ fontSize: 18 }}>▼</Text>
            </TouchableOpacity>
          </View>

          {/* Mode of Payment */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 14, fontWeight: "500", marginBottom: 8, color: "#333" }}>Mode of Payment</Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#E8E8E8",
                paddingHorizontal: 12,
                paddingVertical: 12,
                borderRadius: 8,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 16, color: payment ? "#333" : "#999" }}>
                {payment || "Select a payment"}
              </Text>
              <Text style={{ fontSize: 18 }}>▼</Text>
            </TouchableOpacity>
          </View>

          {/* Date */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 14, fontWeight: "500", marginBottom: 8, color: "#333" }}>Date</Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#E8E8E8",
                paddingHorizontal: 12,
                paddingVertical: 12,
                borderRadius: 8,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18, marginRight: 8 }}>📅</Text>
              <Text style={{ fontSize: 16, color: "#333" }}>{date}</Text>
            </TouchableOpacity>
          </View>

          {/* Note */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 14, fontWeight: "500", marginBottom: 8, color: "#333" }}>Note (optional)</Text>
            <TextInput
              style={{
                backgroundColor: "#E8E8E8",
                paddingHorizontal: 12,
                paddingVertical: 12,
                borderRadius: 8,
                fontSize: 16,
                color: "#333",
                minHeight: 80,
                textAlignVertical: "top",
              }}
              placeholder="Add a note for this transaction"
              placeholderTextColor="#999"
              multiline
              value={note}
              onChangeText={setNote}
            />
          </View>

          {/* Buttons */}
          <View style={{ gap: 12, marginBottom: 20 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#5856D6",
                paddingVertical: 14,
                borderRadius: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "600", color: "#fff" }}>Save Transaction</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                paddingVertical: 14,
                borderRadius: 8,
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#E8E8E8",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "600", color: "#333" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
