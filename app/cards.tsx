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

const ManageCards = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      cardName: "Primary Card",
      cardType: "Visa",
      lastFour: "4242",
      expiryDate: "12/26",
      balance: 25000,
      limit: 50000,
      status: "active",
      color: "#5856D6",
    },
    {
      id: 2,
      cardName: "Savings Card",
      cardType: "Mastercard",
      lastFour: "5555",
      expiryDate: "08/27",
      balance: 45000,
      limit: 50000,
      status: "active",
      color: "#FF6B6B",
    },
    {
      id: 3,
      cardName: "Travel Card",
      cardType: "American Express",
      lastFour: "3782",
      expiryDate: "03/28",
      balance: 12000,
      limit: 30000,
      status: "active",
      color: "#4ECDC4",
    },
  ]);

  const [settings, setSettings] = useState({
    contactlessPayment: true,
    onlineShopping: true,
    internationalTransactions: false,
  });

  const [newCard, setNewCard] = useState({
    cardName: "",
    cardType: "Visa",
    lastFour: "",
    expiryDate: "",
    limit: "",
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Animation for cards
  const cardAnimations = useRef(
    cards.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    Animated.stagger(
      100,
      cardAnimations.map((animation) =>
        Animated.timing(animation, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        })
      )
    ).start();
  }, [cards, cardAnimations]);

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

  const addNewCard = () => {
    if (newCard.cardName && newCard.lastFour && newCard.expiryDate && newCard.limit) {
      const colors = ["#5856D6", "#FF6B6B", "#4ECDC4", "#FFD93D", "#A569BD"];
      setCards([
        ...cards,
        {
          id: cards.length + 1,
          cardName: newCard.cardName,
          cardType: newCard.cardType,
          lastFour: newCard.lastFour,
          expiryDate: newCard.expiryDate,
          balance: 0,
          limit: parseInt(newCard.limit),
          status: "active",
          color: colors[cards.length % colors.length],
        },
      ]);
      setNewCard({
        cardName: "",
        cardType: "Visa",
        lastFour: "",
        expiryDate: "",
        limit: "",
      });
      toggleAddModal();
    }
  };

  const deleteCard = (id) => {
    setCards(cards.filter((c) => c.id !== id));
  };

  const toggleCardStatus = (id) => {
    setCards(
      cards.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "active" ? "frozen" : "active" }
          : c
      )
    );
  };

  const renderCard = (card, index) => {
    const utilization = (card.balance / card.limit) * 100;

    return (
      <Animated.View
        key={card.id}
        style={[
          styles.cardWrapper,
          {
            opacity: cardAnimations[index],
            transform: [
              {
                translateY: cardAnimations[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              },
            ],
          },
        ]}
      >
        {/* Credit Card Visual */}
        <View
          style={[
            styles.creditCard,
            { backgroundColor: card.color },
            card.status === "frozen" && { opacity: 0.5 },
          ]}
        >
          <View style={styles.cardTop}>
            <Text style={styles.cardTypeText}>
              {card.cardType === "Visa"
                ? "💳"
                : card.cardType === "Mastercard"
                ? "💳"
                : "💎"}
            </Text>
            <View style={styles.cardBrand}>
              <Text style={styles.brandText}>{card.cardType}</Text>
              {card.status === "frozen" && (
                <Text style={styles.frozenBadge}>❄️ FROZEN</Text>
              )}
            </View>
          </View>

          <View style={styles.cardMiddle}>
            <Text style={styles.cardholderName}>{card.cardName}</Text>
          </View>

          <View style={styles.cardBottom}>
            <View>
              <Text style={styles.cardLabel}>CARD NUMBER</Text>
              <Text style={styles.cardNumber}>•••• •••• •••• {card.lastFour}</Text>
            </View>
            <View style={styles.cardExpiryContainer}>
              <Text style={styles.cardLabel}>EXPIRES</Text>
              <Text style={styles.cardExpiry}>{card.expiryDate}</Text>
            </View>
          </View>
        </View>

        {/* Card Details */}
        <View style={styles.cardDetails}>
          <View style={styles.detailRow}>
            <View>
              <Text style={styles.detailLabel}>Available Balance</Text>
              <Text style={styles.detailValue}>
                ₽{(card.limit - card.balance).toLocaleString()}
              </Text>
            </View>
            <View style={styles.dividerVertical} />
            <View>
              <Text style={styles.detailLabel}>Card Limit</Text>
              <Text style={styles.detailValue}>₽{card.limit.toLocaleString()}</Text>
            </View>
          </View>

          <View style={styles.utilizationSection}>
            <View style={styles.utilizationHeader}>
              <Text style={styles.utilizationLabel}>Card Utilization</Text>
              <Text style={styles.utilizationPercent}>{Math.round(utilization)}%</Text>
            </View>
            <View style={styles.utilizationBar}>
              <Animated.View
                style={[
                  styles.utilizationFill,
                  {
                    width: `${utilization}%`,
                    backgroundColor:
                      utilization > 80 ? "#E74C3C" : utilization > 50 ? "#FFD93D" : "#6BCB77",
                  },
                ]}
              />
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionBtn, { borderColor: card.color }]}
            >
              <Text style={[styles.actionBtnText, { color: card.color }]}>
                💳 View Details
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => toggleCardStatus(card.id)}
            >
              <Text style={styles.actionBtnText}>
                {card.status === "active" ? "❄️ Freeze" : "🔓 Unfreeze"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => deleteCard(card.id)}
            >
              <Text style={styles.actionBtnText}>🗑️ Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
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
          <Text style={styles.headerTitle}>Manage Your Cards</Text>
          <Text style={styles.headerSubtitle}>
            View and manage all your payment cards
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: "#E8F5FF" }]}>
            <Text style={styles.statEmoji}>💳</Text>
            <Text style={styles.statValue}>{cards.length}</Text>
            <Text style={styles.statLabel}>Active Cards</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: "#FFF4E6" }]}>
            <Text style={styles.statEmoji}>💰</Text>
            <Text style={styles.statValue}>
              ₽{cards.reduce((sum, c) => sum + c.balance, 0).toLocaleString()}
            </Text>
            <Text style={styles.statLabel}>Total Balance</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: "#E6F7F0" }]}>
            <Text style={styles.statEmoji}>📊</Text>
            <Text style={styles.statValue}>
              {Math.round(
                (cards.reduce((sum, c) => sum + c.balance, 0) /
                  cards.reduce((sum, c) => sum + c.limit, 0)) *
                  100
              )}
              %
            </Text>
            <Text style={styles.statLabel}>Avg. Utilization</Text>
          </View>
        </View>

        {/* Cards Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Cards</Text>
          <View style={styles.cardsContainer}>
            {cards.map((card, index) => renderCard(card, index))}
          </View>
        </View>

        {/* Security Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security Settings</Text>
          <View style={styles.settingsCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Contactless Payment</Text>
                <Text style={styles.settingDescription}>
                  Enable tap-to-pay on your cards
                </Text>
              </View>
              <Switch
                value={settings.contactlessPayment}
                onValueChange={(value) =>
                  setSettings({ ...settings, contactlessPayment: value })
                }
                trackColor={{ false: "#ddd", true: "#5856D6" }}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.settingRow}>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Online Shopping</Text>
                <Text style={styles.settingDescription}>
                  Allow online transactions
                </Text>
              </View>
              <Switch
                value={settings.onlineShopping}
                onValueChange={(value) =>
                  setSettings({ ...settings, onlineShopping: value })
                }
                trackColor={{ false: "#ddd", true: "#5856D6" }}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.settingRow}>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>International Transactions</Text>
                <Text style={styles.settingDescription}>
                  Allow payments in foreign countries
                </Text>
              </View>
              <Switch
                value={settings.internationalTransactions}
                onValueChange={(value) =>
                  setSettings({ ...settings, internationalTransactions: value })
                }
                trackColor={{ false: "#ddd", true: "#5856D6" }}
              />
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.quickActionsContainer}>
            <TouchableOpacity style={styles.quickActionBtn}>
              <Text style={styles.quickActionEmoji}>🔐</Text>
              <Text style={styles.quickActionText}>Change PIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionBtn}>
              <Text style={styles.quickActionEmoji}>⚠️</Text>
              <Text style={styles.quickActionText}>Report Fraud</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionBtn}>
              <Text style={styles.quickActionEmoji}>📞</Text>
              <Text style={styles.quickActionText}>Support</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionBtn}>
              <Text style={styles.quickActionEmoji}>⚙️</Text>
              <Text style={styles.quickActionText}>More Options</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Add Card FAB */}
      <TouchableOpacity style={styles.fab} onPress={toggleAddModal}>
        <Text style={styles.fabText}>{showAddModal ? "✕" : "+"}</Text>
      </TouchableOpacity>

      {/* Add Card Modal */}
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
            <Text style={styles.modalTitle}>Add New Card</Text>

            <TextInput
              style={styles.input}
              placeholder="Card Name (e.g., My Visa)"
              placeholderTextColor="#999"
              value={newCard.cardName}
              onChangeText={(text) =>
                setNewCard({ ...newCard, cardName: text })
              }
            />

            <View style={styles.pickerRow}>
              {["Visa", "Mastercard", "AmEx"].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.cardTypeOption,
                    newCard.cardType === type && styles.cardTypeOptionActive,
                  ]}
                  onPress={() => setNewCard({ ...newCard, cardType: type })}
                >
                  <Text
                    style={[
                      styles.cardTypeOptionText,
                      newCard.cardType === type && styles.cardTypeOptionTextActive,
                    ]}
                  >
                    {type === "AmEx" ? "💎 AmEx" : "💳 " + type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={styles.input}
              placeholder="Last 4 Digits"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              maxLength={4}
              value={newCard.lastFour}
              onChangeText={(text) =>
                setNewCard({ ...newCard, lastFour: text })
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Expiry Date (MM/YY)"
              placeholderTextColor="#999"
              maxLength={5}
              value={newCard.expiryDate}
              onChangeText={(text) =>
                setNewCard({ ...newCard, expiryDate: text })
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Card Limit (₽)"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              value={newCard.limit}
              onChangeText={(text) =>
                setNewCard({ ...newCard, limit: text })
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
                onPress={addNewCard}
              >
                <Text style={styles.addButtonText}>Add Card</Text>
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
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  statEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: "#999",
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
  cardsContainer: {
    gap: 16,
  },
  cardWrapper: {
    marginBottom: 8,
  },
  creditCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  cardTypeText: {
    fontSize: 32,
  },
  cardBrand: {
    alignItems: "flex-end",
  },
  brandText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  frozenBadge: {
    fontSize: 10,
    fontWeight: "700",
    color: "#fff",
    marginTop: 4,
  },
  cardMiddle: {
    marginBottom: 20,
  },
  cardholderName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardLabel: {
    fontSize: 9,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 4,
    letterSpacing: 1,
  },
  cardNumber: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
    letterSpacing: 2,
  },
  cardExpiryContainer: {
    alignItems: "flex-end",
  },
  cardExpiry: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  cardDetails: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 11,
    color: "#999",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
  dividerVertical: {
    width: 1,
    height: 50,
    backgroundColor: "#E8E8E8",
  },
  utilizationSection: {
    marginBottom: 16,
  },
  utilizationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  utilizationLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
  },
  utilizationPercent: {
    fontSize: 12,
    fontWeight: "700",
    color: "#666",
  },
  utilizationBar: {
    height: 6,
    backgroundColor: "#E8E8E8",
    borderRadius: 3,
    overflow: "hidden",
  },
  utilizationFill: {
    height: "100%",
    borderRadius: 3,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    alignItems: "center",
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },
  settingsCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 12,
    color: "#999",
  },
  divider: {
    height: 1,
    backgroundColor: "#E8E8E8",
  },
  quickActionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  quickActionBtn: {
    width: "48%",
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  quickActionEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
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
  pickerRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  cardTypeOption: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 10,
    alignItems: "center",
  },
  cardTypeOptionActive: {
    borderColor: "#5856D6",
    backgroundColor: "#F0ECFF",
  },
  cardTypeOptionText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },
  cardTypeOptionTextActive: {
    color: "#5856D6",
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

export default ManageCards;
