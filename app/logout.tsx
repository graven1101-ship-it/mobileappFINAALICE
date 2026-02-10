import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Switch,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import NavBar from "../components/NavBar";

const LogoutScreen = () => {
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [dataOptions, setDataOptions] = useState({
    clearCache: true,
    clearCookies: true,
    keepBackup: true,
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  const sessionInfo = {
    lastLogin: "Today at 9:42 AM",
    sessionDuration: "2 hours 15 minutes",
    deviceName: "iPhone 14 Pro",
    location: "New Delhi, India",
    ipAddress: "192.168.1.1",
  };

  const accountStats = {
    totalTransactions: 247,
    totalSpent: 850000,
    accountAge: "2 years",
    connectedCards: 3,
  };

  const toggleConfirmation = () => {
    if (!showConfirmation) {
      setShowConfirmation(true);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => setShowConfirmation(false));
    }
  };

  const handleLogout = () => {
    Alert.alert("Logging out", "You have been successfully logged out.", [
      {
        text: "OK",
        onPress: () => {
          router.push("/");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Account Settings</Text>
          <Text style={styles.headerSubtitle}>Manage your account and session</Text>
        </View>

        {/* Account Summary */}
        <View style={styles.section}>
          <View style={styles.accountCard}>
            <View style={styles.accountHeader}>
              <Image
                source={require("../assets/images/react-logo.png")}
                style={styles.accountAvatar}
              />
              <View style={styles.accountInfo}>
                <Text style={styles.accountName}>Allen Kalbo</Text>
                <Text style={styles.accountEmail}>allen.kalbo@email.com</Text>
              </View>
            </View>

            <View style={styles.accountStats}>
              <View style={styles.statBox}>
                <Text style={styles.statEmoji}>💳</Text>
                <Text style={styles.statValue}>{accountStats.connectedCards}</Text>
                <Text style={styles.statLabel}>Cards</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statEmoji}>💰</Text>
                <Text style={styles.statValue}>₽{(accountStats.totalSpent / 100000).toFixed(1)}K</Text>
                <Text style={styles.statLabel}>Total Spent</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statEmoji}>📊</Text>
                <Text style={styles.statValue}>{accountStats.totalTransactions}</Text>
                <Text style={styles.statLabel}>Transactions</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statEmoji}>📅</Text>
                <Text style={styles.statValue}>{accountStats.accountAge}</Text>
                <Text style={styles.statLabel}>Account Age</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Current Session */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Session</Text>
          <View style={styles.sessionCard}>
            <View style={styles.sessionRow}>
              <View style={styles.sessionIcon}>
                <Text style={styles.sessionIconText}>📱</Text>
              </View>
              <View style={styles.sessionContent}>
                <Text style={styles.sessionLabel}>Device</Text>
                <Text style={styles.sessionValue}>{sessionInfo.deviceName}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.sessionRow}>
              <View style={styles.sessionIcon}>
                <Text style={styles.sessionIconText}>🕐</Text>
              </View>
              <View style={styles.sessionContent}>
                <Text style={styles.sessionLabel}>Last Login</Text>
                <Text style={styles.sessionValue}>{sessionInfo.lastLogin}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.sessionRow}>
              <View style={styles.sessionIcon}>
                <Text style={styles.sessionIconText}>⏱️</Text>
              </View>
              <View style={styles.sessionContent}>
                <Text style={styles.sessionLabel}>Session Duration</Text>
                <Text style={styles.sessionValue}>{sessionInfo.sessionDuration}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.sessionRow}>
              <View style={styles.sessionIcon}>
                <Text style={styles.sessionIconText}>📍</Text>
              </View>
              <View style={styles.sessionContent}>
                <Text style={styles.sessionLabel}>Location</Text>
                <Text style={styles.sessionValue}>{sessionInfo.location}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.sessionRow}>
              <View style={styles.sessionIcon}>
                <Text style={styles.sessionIconText}>🌐</Text>
              </View>
              <View style={styles.sessionContent}>
                <Text style={styles.sessionLabel}>IP Address</Text>
                <Text style={styles.sessionValue}>{sessionInfo.ipAddress}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Data Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          <View style={styles.dataCard}>
            <View style={styles.dataRow}>
              <View style={styles.dataContent}>
                <Text style={styles.dataTitle}>Clear Cache</Text>
                <Text style={styles.dataDescription}>Remove temporary files to free up space</Text>
              </View>
              <Switch
                value={dataOptions.clearCache}
                onValueChange={(value) =>
                  setDataOptions({ ...dataOptions, clearCache: value })
                }
                trackColor={{ false: "#ddd", true: "#5856D6" }}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.dataRow}>
              <View style={styles.dataContent}>
                <Text style={styles.dataTitle}>Clear Cookies & Sessions</Text>
                <Text style={styles.dataDescription}>
                  Remove stored authentication data
                </Text>
              </View>
              <Switch
                value={dataOptions.clearCookies}
                onValueChange={(value) =>
                  setDataOptions({ ...dataOptions, clearCookies: value })
                }
                trackColor={{ false: "#ddd", true: "#5856D6" }}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.dataRow}>
              <View style={styles.dataContent}>
                <Text style={styles.dataTitle}>Keep Backup</Text>
                <Text style={styles.dataDescription}>
                  Save encrypted backup before logout
                </Text>
              </View>
              <Switch
                value={dataOptions.keepBackup}
                onValueChange={(value) =>
                  setDataOptions({ ...dataOptions, keepBackup: value })
                }
                trackColor={{ false: "#ddd", true: "#5856D6" }}
              />
            </View>
          </View>
        </View>

        {/* Security Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security Tips</Text>
          <View style={styles.tipsContainer}>
            <View style={styles.tipCard}>
              <Text style={styles.tipIcon}>🔐</Text>
              <Text style={styles.tipTitle}>Use Strong Passwords</Text>
              <Text style={styles.tipText}>Update your password regularly</Text>
            </View>

            <View style={styles.tipCard}>
              <Text style={styles.tipIcon}>📱</Text>
              <Text style={styles.tipTitle}>Two-Factor Authentication</Text>
              <Text style={styles.tipText}>Enable 2FA for added security</Text>
            </View>

            <View style={styles.tipCard}>
              <Text style={styles.tipIcon}>🔔</Text>
              <Text style={styles.tipTitle}>Monitor Sessions</Text>
              <Text style={styles.tipText}>Check active sessions regularly</Text>
            </View>

            <View style={styles.tipCard}>
              <Text style={styles.tipIcon}>⚠️</Text>
              <Text style={styles.tipTitle}>Report Issues</Text>
              <Text style={styles.tipText}>Notify us of suspicious activity</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <Text style={styles.actionEmoji}>📥</Text>
              <Text style={styles.actionText}>Download Data</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Text style={styles.actionEmoji}>🗑️</Text>
              <Text style={styles.actionText}>Delete Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Text style={styles.actionEmoji}>📞</Text>
              <Text style={styles.actionText}>Contact Support</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Text style={styles.actionEmoji}>📋</Text>
              <Text style={styles.actionText}>View Terms</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Logout Button */}
      <View style={styles.logoutButtonContainer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={toggleConfirmation}
        >
          <Text style={styles.logoutButtonText}>👋 Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Confirmation Modal */}
      {showConfirmation && (
        <Animated.View
          style={[
            styles.confirmationOverlay,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.confirmationContent,
              {
                transform: [
                  {
                    scale: scaleAnim,
                  },
                ],
                opacity: fadeAnim,
              },
            ]}
          >
            <View style={styles.confirmationIconContainer}>
              <Text style={styles.confirmationIcon}>👋</Text>
            </View>

            <Text style={styles.confirmationTitle}>Confirm Logout?</Text>
            <Text style={styles.confirmationMessage}>
              You will be logged out from your account. Make sure you have all
              your important data backed up.
            </Text>

            <View style={styles.confirmationWarning}>
              <Text style={styles.warningIcon}>⚠️</Text>
              <View>
                <Text style={styles.warningTitle}>Important</Text>
                <Text style={styles.warningText}>
                  You'll need to log in again to access your account.
                </Text>
              </View>
            </View>

            <View style={styles.confirmationButtons}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={toggleConfirmation}
              >
                <Text style={styles.cancelBtnText}>Keep Logged In</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmBtn}
                onPress={handleLogout}
              >
                <Text style={styles.confirmBtnText}>Yes, Logout</Text>
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
    paddingBottom: 100,
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
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  accountCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  accountHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  accountAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 2,
  },
  accountEmail: {
    fontSize: 13,
    color: "#999",
  },
  accountStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  statBox: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#F0ECFF",
    borderRadius: 12,
  },
  statEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#333",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: "#999",
  },
  sessionCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  sessionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  sessionIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#F0ECFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  sessionIconText: {
    fontSize: 20,
  },
  sessionContent: {
    flex: 1,
  },
  sessionLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 2,
  },
  sessionValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#E8E8E8",
  },
  dataCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  dataRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dataContent: {
    flex: 1,
  },
  dataTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  dataDescription: {
    fontSize: 12,
    color: "#999",
  },
  tipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  tipCard: {
    width: "48%",
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  tipIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
    textAlign: "center",
  },
  tipText: {
    fontSize: 11,
    color: "#999",
    textAlign: "center",
  },
  actionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  actionCard: {
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
  actionEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  logoutButtonContainer: {
    position: "absolute",
    bottom: 80,
    left: 16,
    right: 16,
  },
  logoutButton: {
    paddingVertical: 16,
    backgroundColor: "#E74C3C",
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#E74C3C",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  logoutButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  confirmationOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    paddingHorizontal: 20,
  },
  confirmationContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 28,
    alignItems: "center",
    width: "100%",
  },
  confirmationIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#FFE8E8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  confirmationIcon: {
    fontSize: 36,
  },
  confirmationTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 12,
  },
  confirmationMessage: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 20,
  },
  confirmationWarning: {
    flexDirection: "row",
    backgroundColor: "#FFF5F5",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    borderLeftWidth: 3,
    borderLeftColor: "#E74C3C",
    alignItems: "flex-start",
  },
  warningIcon: {
    fontSize: 18,
    marginRight: 12,
    marginTop: 2,
  },
  warningTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#E74C3C",
    marginBottom: 2,
  },
  warningText: {
    fontSize: 12,
    color: "#999",
  },
  confirmationButtons: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 10,
    alignItems: "center",
  },
  cancelBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  confirmBtn: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: "#E74C3C",
    borderRadius: 10,
    alignItems: "center",
  },
  confirmBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
});

export default LogoutScreen;
