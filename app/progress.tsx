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
  Dimensions,
} from "react-native";
import NavBar from "../components/NavBar";

const TrackFinancialProgress = () => {
  const [progressData, setProgressData] = useState([
    {
      id: 1,
      milestone: "Emergency Fund",
      target: 100000,
      current: 75000,
      deadline: "Dec 2026",
      priority: "high",
      icon: "🛡️",
    },
    {
      id: 2,
      milestone: "Home Down Payment",
      target: 500000,
      current: 250000,
      deadline: "Jun 2027",
      priority: "high",
      icon: "🏠",
    },
    {
      id: 3,
      milestone: "Car Purchase",
      target: 300000,
      current: 180000,
      deadline: "Mar 2026",
      priority: "medium",
      icon: "🚗",
    },
    {
      id: 4,
      milestone: "Vacation Fund",
      target: 150000,
      current: 95000,
      deadline: "Aug 2026",
      priority: "low",
      icon: "✈️",
    },
  ]);

  const [monthlyData] = useState([
    { month: "Jan", income: 85000, expense: 65000, savings: 20000 },
    { month: "Feb", income: 85000, expense: 62000, savings: 23000 },
    { month: "Mar", income: 90000, expense: 68000, savings: 22000 },
    { month: "Apr", income: 85000, expense: 70000, savings: 15000 },
    { month: "May", income: 88000, expense: 64000, savings: 24000 },
    { month: "Jun", income: 92000, expense: 66000, savings: 26000 },
  ]);

  const [insights, setInsights] = useState({
    savingsRate: 28,
    monthlyAvgSavings: 21666,
    netWorth: 850000,
    investmentReturn: 12.5,
  });

  const [showAddMilestone, setShowAddMilestone] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    name: "",
    target: "",
    deadline: "",
    priority: "medium",
  });

  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Animations for progress bars
  const progressAnimations = useRef(
    progressData.map(() => new Animated.Value(0))
  ).current;

  // Animations for bar chart
  const chartAnimations = useRef(
    monthlyData.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    Animated.stagger(
      80,
      progressAnimations.map((animation, idx) =>
        Animated.timing(animation, {
          toValue: (progressData[idx].current / progressData[idx].target) * 100,
          duration: 1500,
          useNativeDriver: false,
        })
      )
    ).start();
  }, [progressData, progressAnimations]);

  useEffect(() => {
    Animated.stagger(
      100,
      chartAnimations.map((animation, idx) =>
        Animated.timing(animation, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        })
      )
    ).start();
  }, [chartAnimations]);

  const toggleAddMilestone = () => {
    if (!showAddMilestone) {
      setShowAddMilestone(true);
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
      ]).start(() => setShowAddMilestone(false));
    }
  };

  const addMilestone = () => {
    if (newMilestone.name && newMilestone.target && newMilestone.deadline) {
      setProgressData([
        ...progressData,
        {
          id: progressData.length + 1,
          milestone: newMilestone.name,
          target: parseInt(newMilestone.target),
          current: 0,
          deadline: newMilestone.deadline,
          priority: newMilestone.priority,
          icon: "🎯",
        },
      ]);
      setNewMilestone({ name: "", target: "", deadline: "", priority: "medium" });
      toggleAddMilestone();
    }
  };

  const deleteMilestone = (id) => {
    setProgressData(progressData.filter((m) => m.id !== id));
  };

  const renderMilestoneCard = (milestone, index) => {
    const progress = (milestone.current / milestone.target) * 100;

    const progressWidth = progressAnimations[index].interpolate({
      inputRange: [0, 100],
      outputRange: ["0%", "100%"],
    });

    const priorityColor = {
      high: "#E74C3C",
      medium: "#FFD93D",
      low: "#6BCB77",
    };

    return (
      <View key={milestone.id} style={styles.milestoneCard}>
        <View style={styles.milestoneHeader}>
          <View style={styles.milestoneInfo}>
            <Text style={styles.milestoneIcon}>{milestone.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.milestoneName}>{milestone.milestone}</Text>
              <Text style={styles.milestoneDeadline}>Due: {milestone.deadline}</Text>
            </View>
          </View>
          <View
            style={[
              styles.priorityBadge,
              { backgroundColor: priorityColor[milestone.priority] },
            ]}
          >
            <Text style={styles.priorityText}>
              {milestone.priority.charAt(0).toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.milestoneAmount}>
          <View>
            <Text style={styles.amountLabel}>Current</Text>
            <Text style={styles.amountValue}>
              ₽{milestone.current.toLocaleString()}
            </Text>
          </View>
          <Text style={styles.amountSeparator}>/</Text>
          <View>
            <Text style={styles.amountLabel}>Target</Text>
            <Text style={styles.amountValue}>
              ₽{milestone.target.toLocaleString()}
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
                  backgroundColor: progress >= 80 ? "#6BCB77" : progress >= 50 ? "#FFD93D" : "#5856D6",
                },
              ]}
            />
          </View>
          <Text style={styles.progressPercent}>{Math.round(progress)}%</Text>
        </View>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => deleteMilestone(milestone.id)}
        >
          <Text style={styles.deleteBtnText}>🗑️ Remove</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const maxSavings = Math.max(...monthlyData.map((d) => d.savings));

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Track Financial Progress</Text>
          <Text style={styles.headerSubtitle}>Monitor your journey to financial goals</Text>
        </View>

        {/* Financial Health Score */}
        <View style={styles.healthScoreCard}>
          <View style={styles.healthScoreContent}>
            <Text style={styles.healthScoreLabel}>Financial Health Score</Text>
            <Text style={styles.healthScoreValue}>78/100</Text>
            <Text style={styles.healthScoreStatus}>📈 Excellent Progress</Text>
          </View>
          <View style={styles.scoreRing}>
            <View style={styles.scoreRingFill} />
            <Text style={styles.scoreRingText}>78%</Text>
          </View>
        </View>

        {/* Key Insights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Insights</Text>
          <View style={styles.insightsGrid}>
            <View style={[styles.insightCard, { backgroundColor: "#E8F5FF" }]}>
              <Text style={styles.insightEmoji}>💰</Text>
              <Text style={styles.insightLabel}>Monthly Savings</Text>
              <Text style={styles.insightValue}>
                ₽{insights.monthlyAvgSavings.toLocaleString()}
              </Text>
            </View>
            <View style={[styles.insightCard, { backgroundColor: "#FFF4E6" }]}>
              <Text style={styles.insightEmoji}>📊</Text>
              <Text style={styles.insightLabel}>Savings Rate</Text>
              <Text style={styles.insightValue}>{insights.savingsRate}%</Text>
            </View>
            <View style={[styles.insightCard, { backgroundColor: "#E6F7F0" }]}>
              <Text style={styles.insightEmoji}>💎</Text>
              <Text style={styles.insightLabel}>Net Worth</Text>
              <Text style={styles.insightValue}>₽{insights.netWorth.toLocaleString()}</Text>
            </View>
            <View style={[styles.insightCard, { backgroundColor: "#F0E6FF" }]}>
              <Text style={styles.insightEmoji}>📈</Text>
              <Text style={styles.insightLabel}>Investment Return</Text>
              <Text style={styles.insightValue}>+{insights.investmentReturn}%</Text>
            </View>
          </View>
        </View>

        {/* Savings Trend Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Monthly Savings Trend</Text>
          <View style={styles.chartContainer}>
            <View style={styles.chartBars}>
              {monthlyData.map((data, idx) => {
                const height = (data.savings / maxSavings) * 180;
                return (
                  <Animated.View
                    key={idx}
                    style={[
                      styles.chartBarWrapper,
                      {
                        opacity: chartAnimations[idx],
                        transform: [
                          {
                            scaleY: chartAnimations[idx].interpolate({
                              inputRange: [0, 1],
                              outputRange: [0.1, 1],
                            }),
                          },
                        ],
                      },
                    ]}
                  >
                    <Animated.View
                      style={[
                        styles.chartBar,
                        { height, backgroundColor: "#5856D6" },
                      ]}
                    />
                    <Text style={styles.chartLabel}>{data.month}</Text>
                  </Animated.View>
                );
              })}
            </View>
            <View style={styles.chartLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: "#5856D6" }]} />
                <Text style={styles.legendText}>Savings</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Income vs Expense Comparison */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Income vs Expenses</Text>
          <View style={styles.comparisonCard}>
            <View style={styles.comparisonRow}>
              <View style={styles.comparisonItem}>
                <Text style={styles.comparisonEmoji}>💵</Text>
                <Text style={styles.comparisonLabel}>Total Income</Text>
                <Text style={styles.comparisonValue}>
                  ₽{monthlyData.reduce((sum, d) => sum + d.income, 0).toLocaleString()}
                </Text>
              </View>
              <View style={styles.comparisonDivider} />
              <View style={styles.comparisonItem}>
                <Text style={styles.comparisonEmoji}>💸</Text>
                <Text style={styles.comparisonLabel}>Total Expenses</Text>
                <Text style={styles.comparisonValue}>
                  ₽{monthlyData.reduce((sum, d) => sum + d.expense, 0).toLocaleString()}
                </Text>
              </View>
            </View>
            <View style={styles.comparisonDividerHorizontal} />
            <View style={styles.comparisonRow}>
              <View style={styles.comparisonItem}>
                <Text style={styles.comparisonEmoji}>🎯</Text>
                <Text style={styles.comparisonLabel}>Total Savings</Text>
                <Text style={[styles.comparisonValue, { color: "#6BCB77" }]}>
                  ₽{monthlyData.reduce((sum, d) => sum + d.savings, 0).toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Financial Milestones */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Milestones</Text>
          <View style={styles.milestonesContainer}>
            {progressData.map((milestone, index) =>
              renderMilestoneCard(milestone, index)
            )}
          </View>
        </View>

        {/* Reports & Analytics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reports & Analytics</Text>
          <View style={styles.reportsGrid}>
            <TouchableOpacity style={styles.reportCard}>
              <Text style={styles.reportEmoji}>📄</Text>
              <Text style={styles.reportText}>Monthly Report</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reportCard}>
              <Text style={styles.reportEmoji}>📊</Text>
              <Text style={styles.reportText}>Annual Summary</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reportCard}>
              <Text style={styles.reportEmoji}>💾</Text>
              <Text style={styles.reportText}>Export Data</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reportCard}>
              <Text style={styles.reportEmoji}>📧</Text>
              <Text style={styles.reportText}>Email Report</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Add Milestone FAB */}
      <TouchableOpacity style={styles.fab} onPress={toggleAddMilestone}>
        <Text style={styles.fabText}>{showAddMilestone ? "✕" : "+"}</Text>
      </TouchableOpacity>

      {/* Add Milestone Modal */}
      {showAddMilestone && (
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
            <Text style={styles.modalTitle}>Add Financial Milestone</Text>

            <TextInput
              style={styles.input}
              placeholder="Milestone Name (e.g., Home Down Payment)"
              placeholderTextColor="#999"
              value={newMilestone.name}
              onChangeText={(text) =>
                setNewMilestone({ ...newMilestone, name: text })
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Target Amount (₽)"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              value={newMilestone.target}
              onChangeText={(text) =>
                setNewMilestone({ ...newMilestone, target: text })
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Deadline (e.g., Dec 2026)"
              placeholderTextColor="#999"
              value={newMilestone.deadline}
              onChangeText={(text) =>
                setNewMilestone({ ...newMilestone, deadline: text })
              }
            />

            <View style={styles.priorityRow}>
              {["low", "medium", "high"].map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.priorityOption,
                    newMilestone.priority === level && styles.priorityOptionActive,
                  ]}
                  onPress={() => setNewMilestone({ ...newMilestone, priority: level })}
                >
                  <Text style={styles.priorityOptionText}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={toggleAddMilestone}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addButton}
                onPress={addMilestone}
              >
                <Text style={styles.addButtonText}>Add Milestone</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Animated.View>
      )}

      
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
  healthScoreCard: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  healthScoreContent: {
    flex: 1,
  },
  healthScoreLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  healthScoreValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  healthScoreStatus: {
    fontSize: 14,
    color: "#6BCB77",
    fontWeight: "600",
  },
  scoreRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F0ECFF",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  scoreRingFill: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "#5856D6",
    borderTopColor: "#E8E8E8",
  },
  scoreRingText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#5856D6",
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
  insightsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  insightCard: {
    width: "48%",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  insightEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  insightLabel: {
    fontSize: 11,
    color: "#666",
    marginBottom: 4,
  },
  insightValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
  },
  chartContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  chartBars: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    height: 200,
    marginBottom: 12,
  },
  chartBarWrapper: {
    alignItems: "center",
    flex: 1,
  },
  chartBar: {
    width: 30,
    borderRadius: 6,
    marginBottom: 8,
  },
  chartLabel: {
    fontSize: 11,
    color: "#666",
    fontWeight: "500",
  },
  chartLegend: {
    flexDirection: "row",
    justifyContent: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 2,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: "#666",
  },
  comparisonCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  comparisonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  comparisonItem: {
    flex: 1,
    alignItems: "center",
  },
  comparisonEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  comparisonLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  comparisonValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
  },
  comparisonDivider: {
    width: 1,
    height: 60,
    backgroundColor: "#E8E8E8",
  },
  comparisonDividerHorizontal: {
    height: 1,
    backgroundColor: "#E8E8E8",
    marginVertical: 12,
  },
  milestonesContainer: {
    gap: 12,
  },
  milestoneCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  milestoneHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  milestoneInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  milestoneIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  milestoneName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  milestoneDeadline: {
    fontSize: 11,
    color: "#999",
  },
  priorityBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  priorityText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#fff",
  },
  milestoneAmount: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  amountLabel: {
    fontSize: 10,
    color: "#999",
    marginBottom: 2,
  },
  amountValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },
  amountSeparator: {
    fontSize: 14,
    color: "#DDD",
    fontWeight: "300",
  },
  progressSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#E8E8E8",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: "700",
    color: "#666",
    minWidth: 35,
    textAlign: "right",
  },
  deleteBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#FFE8E8",
    borderRadius: 8,
    alignItems: "center",
  },
  deleteBtnText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#E74C3C",
  },
  reportsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  reportCard: {
    width: "48%",
    paddingVertical: 18,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  reportEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  reportText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
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
  priorityRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  priorityOption: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 10,
    alignItems: "center",
  },
  priorityOptionActive: {
    borderColor: "#5856D6",
    backgroundColor: "#F0ECFF",
  },
  priorityOptionText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
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

export default TrackFinancialProgress;
