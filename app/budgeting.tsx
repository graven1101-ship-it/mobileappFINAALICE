import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Switch,
  TextInput,
  StyleSheet,
} from "react-native";
import NavBar from "../components/NavBar";

const BudgetingPreferences = () => {
  const [budgets, setBudgets] = useState([
    { id: 1, category: "🍽️ Food & Dining", limit: 5000, spent: 3200, color: "#FF6B6B" },
    { id: 2, category: "🚗 Transportation", limit: 8000, spent: 4500, color: "#4ECDC4" },
    { id: 3, category: "🛍️ Shopping", limit: 10000, spent: 7200, color: "#FFD93D" },
    { id: 4, category: "🎮 Entertainment", limit: 3000, spent: 1800, color: "#A569BD" },
    { id: 5, category: "💪 Health & Fitness", limit: 4000, spent: 2000, color: "#6BCB77" },
    { id: 6, category: "✈️ Travel", limit: 15000, spent: 5000, color: "#FF8C42" },
  ]);

  const [alerts, setAlerts] = useState({
    lowBalance: true,
    budgetExceeded: true,
    weeklyReport: true,
  });

  const [newBudget, setNewBudget] = useState({
    category: "",
    limit: "",
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Animation for progress bars
  const progressAnimations = useRef(
    budgets.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    Animated.stagger(
      80,
      progressAnimations.map((animation, idx) =>
        Animated.timing(animation, {
          toValue: (budgets[idx].spent / budgets[idx].limit) * 100,
          duration: 1500,
          useNativeDriver: false,
        })
      )
    ).start();
  }, [budgets, progressAnimations]);

  const toggleAddModal = () => {
    if (!showAddModal) {
      setShowAddModal(true);
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => setShowAddModal(false));
    }
  };

  const addNewBudget = () => {
    if (newBudget.category && newBudget.limit) {
      setBudgets([
        ...budgets,
        {
          id: budgets.length + 1,
          category: newBudget.category,
          limit: parseInt(newBudget.limit),
          spent: 0,
          color: ["#FF6B6B", "#4ECDC4", "#FFD93D", "#A569BD", "#6BCB77", "#FF8C42"][
            budgets.length % 6
          ],
        },
      ]);
      setNewBudget({ category: "", limit: "" });
      toggleAddModal();
    }
  };

  const deleteBudget = (id) => {
    setBudgets(budgets.filter((b) => b.id !== id));
  };

  const renderBudgetCard = (budget, index) => {
    const progressWidth = progressAnimations[index].interpolate({
      inputRange: [0, 100],
      outputRange: ["0%", "100%"],
    });

    const percentage = (budget.spent / budget.limit) * 100;
    const isOverBudget = percentage > 100;

    return (
      <View
        key={budget.id}
        style={[
          styles.budgetCard,
          { borderLeftWidth: 4, borderLeftColor: budget.color },
        ]}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.categoryName}>{budget.category}</Text>
          <TouchableOpacity onPress={() => deleteBudget(budget.id)}>
            <Text style={styles.deleteBtn}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.amountSection}>
          <View>
            <Text style={styles.label}>Limit</Text>
            <Text style={styles.amount}>₽{budget.limit.toLocaleString()}</Text>
          </View>
          <View>
            <Text style={styles.label}>Spent</Text>
            <Text style={[styles.amount, { color: isOverBudget ? "#E74C3C" : "#333" }]}>
              ₽{budget.spent.toLocaleString()}
            </Text>
          </View>
          <View>
            <Text style={styles.label}>Remaining</Text>
            <Text style={[styles.amount, { color: budget.limit - budget.spent >= 0 ? "#6BCB77" : "#E74C3C" }]}>
              ₽{Math.max(0, budget.limit - budget.spent).toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: progressWidth,
                  backgroundColor: isOverBudget ? "#E74C3C" : budget.color,
                },
              ]}
            />
          </View>
          <Text style={[styles.percentageText, { color: isOverBudget ? "#E74C3C" : "#666" }]}>
            {Math.round(percentage)}%
          </Text>
        </View>

        {isOverBudget && (
          <View style={styles.warningBanner}>
            <Text style={styles.warningText}>⚠️ Over Budget by ₽{Math.round(budget.spent - budget.limit)}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Budget Preferences</Text>
          <Text style={styles.headerSubtitle}>Set spending limits for your categories</Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: "#E8F5FF" }]}>
            <Text style={styles.statLabel}>Total Budget</Text>
            <Text style={styles.statValue}>
              ₽{budgets.reduce((sum, b) => sum + b.limit, 0).toLocaleString()}
            </Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: "#FFF4E6" }]}>
            <Text style={styles.statLabel}>Total Spent</Text>
            <Text style={styles.statValue}>
              ₽{budgets.reduce((sum, b) => sum + b.spent, 0).toLocaleString()}
            </Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: "#E6F7F0" }]}>
            <Text style={styles.statLabel}>Remaining</Text>
            <Text style={styles.statValue}>
              ₽{budgets.reduce((sum, b) => sum + (b.limit - b.spent), 0).toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Budget Cards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Budgets</Text>
          <View style={styles.budgetsContainer}>
            {budgets.map((budget, index) => renderBudgetCard(budget, index))}
          </View>
        </View>

        {/* Alert Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Settings</Text>
          <View style={styles.alertCard}>
            <View style={styles.alertRow}>
              <View style={styles.alertContent}>
                <Text style={styles.alertTitle}>Low Balance Alert</Text>
                <Text style={styles.alertDescription}>Notify when spending reaches 80%</Text>
              </View>
              <Switch
                value={alerts.lowBalance}
                onValueChange={(value) =>
                  setAlerts({ ...alerts, lowBalance: value })
                }
                trackColor={{ false: "#ddd", true: "#5856D6" }}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.alertRow}>
              <View style={styles.alertContent}>
                <Text style={styles.alertTitle}>Budget Exceeded Alert</Text>
                <Text style={styles.alertDescription}>Notify when you exceed budget</Text>
              </View>
              <Switch
                value={alerts.budgetExceeded}
                onValueChange={(value) =>
                  setAlerts({ ...alerts, budgetExceeded: value })
                }
                trackColor={{ false: "#ddd", true: "#5856D6" }}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.alertRow}>
              <View style={styles.alertContent}>
                <Text style={styles.alertTitle}>Weekly Report</Text>
                <Text style={styles.alertDescription}>Get a summary every Sunday</Text>
              </View>
              <Switch
                value={alerts.weeklyReport}
                onValueChange={(value) =>
                  setAlerts({ ...alerts, weeklyReport: value })
                }
                trackColor={{ false: "#ddd", true: "#5856D6" }}
              />
            </View>
          </View>
        </View>

        {/* Reset Button */}
        <TouchableOpacity style={styles.resetButton}>
          <Text style={styles.resetButtonText}>🔄 Reset All Budgets</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Add Budget Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={toggleAddModal}
      >
        <Text style={styles.fabText}>{showAddModal ? "✕" : "+"}</Text>
      </TouchableOpacity>

      {/* Add Budget Modal */}
      {showAddModal && (
        <Animated.View
          style={[
            styles.modalOverlay,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.modalContent,
              {
                transform: [
                  {
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [600, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.modalTitle}>Add New Budget</Text>

            <TextInput
              style={styles.input}
              placeholder="Category (e.g., 🎬 Movies)"
              placeholderTextColor="#999"
              value={newBudget.category}
              onChangeText={(text) =>
                setNewBudget({ ...newBudget, category: text })
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Budget Limit (₽)"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              value={newBudget.limit}
              onChangeText={(text) =>
                setNewBudget({ ...newBudget, limit: text })
              }
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={toggleAddModal}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addButton}
                onPress={addNewBudget}
              >
                <Text style={styles.addButtonText}>Add Budget</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Animated.View>
      )}

      <NavBar onAddPress={() => console.log("Add pressed")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  scrollView: {
    flex: 1,
    paddingBottom: 80,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#999",
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  budgetsContainer: {
    gap: 12,
  },
  budgetCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  deleteBtn: {
    fontSize: 20,
    color: "#E74C3C",
  },
  amountSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: {
    fontSize: 11,
    color: "#999",
    marginBottom: 2,
  },
  amount: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  progressSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: "#E8E8E8",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  percentageText: {
    fontSize: 12,
    fontWeight: "600",
    minWidth: 35,
    textAlign: "right",
  },
  warningBanner: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#FFE8E8",
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: "#E74C3C",
  },
  warningText: {
    fontSize: 12,
    color: "#E74C3C",
    fontWeight: "500",
  },
  alertCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  alertRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  alertDescription: {
    fontSize: 12,
    color: "#999",
  },
  divider: {
    height: 1,
    backgroundColor: "#E8E8E8",
  },
  fab: {
    position: "absolute",
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#5856D6",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  fabText: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "300",
  },
  resetButton: {
    marginHorizontal: 16,
    marginBottom: 24,
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#5856D6",
    borderRadius: 12,
    alignItems: "center",
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#5856D6",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    zIndex: 100,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 30,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    marginBottom: 12,
    color: "#333",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  addButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: "#5856D6",
    borderRadius: 10,
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
});

export default BudgetingPreferences;
