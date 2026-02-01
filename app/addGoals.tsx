import { useNavigation } from "@react-navigation/native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function AddGoals() {
  const navigation = useNavigation();

  const [goal, setGoal] = React.useState({
    name: "Dream Home Down Payment",
    targetAmount: "250,000",
    startingAmount: "50,000",
    targetDate: "December 31, 2028",
    recurrence: "Monthly",
    priority: "High",
  });

  const targetAmount = parseInt(goal.targetAmount);
  const startingAmount = parseInt(goal.startingAmount);
  const remainingAmount = targetAmount - startingAmount;
  const progressPercentage = (startingAmount / targetAmount) * 100;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={{ flex: 1, paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 16,
            borderBottomWidth: 1,
            borderBottomColor: "#E8E8E8",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ fontSize: 24 }}>←</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: "600", flex: 1, textAlign: "center" }}>
            Set Goal
          </Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Goal Details Section */}
        <View style={{ margin: 16, backgroundColor: "#fff" }}>
          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 16 }}>
            Goal Details
          </Text>

          {/* Goal Name */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 13, color: "#999", marginBottom: 4 }}>
              Goal Name
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                {goal.name}
              </Text>
              <TouchableOpacity>
                <Text style={{ fontSize: 18, color: "#5856D6" }}>✏️</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Target Amount */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 13, color: "#999", marginBottom: 4 }}>
              Target Amount
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                ₽{goal.targetAmount}
              </Text>
              <TouchableOpacity>
                <Text style={{ fontSize: 18, color: "#5856D6" }}>✏️</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Starting Amount */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 13, color: "#999", marginBottom: 4 }}>
              Starting Amount
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                ₽{goal.startingAmount}
              </Text>
              <TouchableOpacity>
                <Text style={{ fontSize: 18, color: "#5856D6" }}>✏️</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Target Date */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 13, color: "#999", marginBottom: 4 }}>
              Target Date
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                {goal.targetDate}
              </Text>
              <TouchableOpacity>
                <Text style={{ fontSize: 18, color: "#5856D6" }}>✏️</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Recurrence */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 13, color: "#999", marginBottom: 4 }}>
              Recurrence
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                {goal.recurrence}
              </Text>
              <TouchableOpacity>
                <Text style={{ fontSize: 18, color: "#5856D6" }}>✏️</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Priority */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 13, color: "#999", marginBottom: 4 }}>
              Priority
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                {goal.priority}
              </Text>
              <TouchableOpacity>
                <Text style={{ fontSize: 18, color: "#5856D6" }}>✏️</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Progress Preview Section */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 16 }}>
            Progress Preview
          </Text>

          {/* Progress Bar */}
          <View style={{ marginBottom: 16 }}>
            <View
              style={{
                height: 8,
                backgroundColor: "#E8E8E8",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: `${progressPercentage}%`,
                  backgroundColor: "#5856D6",
                  borderRadius: 4,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 13, color: "#666" }}>
                ₽{goal.startingAmount}
              </Text>
              <Text style={{ fontSize: 13, color: "#666" }}>
                ₽{goal.targetAmount}
              </Text>
            </View>
          </View>

          {/* Suggested Monthly Contribution */}
          <View
            style={{
              backgroundColor: "#F0F0FF",
              padding: 16,
              borderRadius: 8,
              marginBottom: 24,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 14, color: "#666" }}>
                Suggested monthly{"\n"}contribution
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                <Text style={{ fontSize: 18, fontWeight: "600", color: "#5856D6" }}>
                  ₽3,333.33
                </Text>
                <Text style={{ fontSize: 14, color: "#999" }}>ⓘ</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer Buttons */}
      <View
        style={{
          paddingHorizontal: 16,
          paddingBottom: 50,
          paddingTop: 12,
          borderTopWidth: 1,
          borderTopColor: "#E8E8E8",
          backgroundColor: "#fff",
        }}
      >
        <View style={{ flexDirection: "row", gap: 12 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              flex: 1,
              paddingVertical: 14,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#E8E8E8",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#333" }}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              flex: 1,
              paddingVertical: 14,
              borderRadius: 83,
              backgroundColor: "#5856D6",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#fff" }}>
              Confirm & Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

import React from "react";
