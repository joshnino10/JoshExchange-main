import Feather from "@expo/vector-icons/Feather";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { transactions } from "../../components/Transactions/TransactionsDetails";

export default function TransactionReceipt() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const idNumber = Number(id);
  const receipt = transactions.find((transaction) => transaction.id === idNumber);

  if (!receipt || isNaN(idNumber)) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Transaction Receipt</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.errorContainer}>
          <Feather name="alert-circle" size={48} color="#ff6b6b" />
          <Text style={styles.errorTitle}>Transaction Not Found</Text>
          <Text style={styles.errorSubtitle}>
            The transaction you're looking for doesn't exist.
          </Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transaction Receipt</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statusContainer}>
          <View style={[styles.statusIcon, { backgroundColor: receipt.color + "20" }]}>
            <Feather name={receipt.icon} size={32} color={receipt.color} />
          </View>
          <Text style={[styles.statusText, { color: receipt.color }]}>
            Transaction Completed
          </Text>
        </View>

        <View style={styles.amountContainer}>
          <Text style={[styles.amount, { color: receipt.color }]}>{receipt.amount}</Text>
          {receipt.TransactionType && (
            <Text style={[styles.transactionType, { color: receipt.color }]}>
              {receipt.TransactionType}
            </Text>
          )}
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Transaction Details</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Transaction Type</Text>
            <Text style={styles.detailValue}>{receipt.title}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date & Time</Text>
            <Text style={styles.detailValue}>{(receipt.dateOfTransaction)}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Transaction ID</Text>
            <Text style={styles.detailValue}>#{receipt.id}</Text>
          </View>

          {receipt.TransactionType && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Category</Text>
              <Text style={styles.detailValue}>{receipt.TransactionType}</Text>
            </View>
          )}

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Status</Text>
            <Text style={[styles.detailValue, styles.successStatus]}>Completed</Text>
          </View>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="download" size={20} color="#007AFF" />
            <Text style={styles.actionButtonText}>Download Receipt</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Feather name="share" size={20} color="#007AFF" />
            <Text style={styles.actionButtonText}>Share Receipt</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === 'android'? StatusBar.currentHeight: 0
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },

  headerTitle: {
    fontSize: 18,
    fontFamily: "semiBold",
    color: "#000",
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statusContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  statusIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  statusText: {
    fontSize: 18,
    fontFamily: "semiBold",
  },
  amountContainer: {
    alignItems: "center",
    paddingBottom: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  amount: {
    fontSize: 32,
    fontFamily: "Bold",
    marginBottom: 8,
  },
  transactionType: {
    fontSize: 16,
    fontFamily: "Regular",
  },
  detailsContainer: {
    paddingVertical: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "semiBold",
    marginBottom: 20,
    color: "#000",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f8f8f8",
  },
  detailLabel: {
    fontSize: 16,
    fontFamily: "Regular",
    color: "#666",
  },
  detailValue: {
    fontSize: 16,
    fontFamily: "semiBold",
    color: "#000",
    textAlign: "right",
    flex: 1,
    marginLeft: 20,
  },
  successStatus: {
    color: "#4CAF50",
  },
  actionContainer: {
    paddingVertical: 20,
    gap: 15,
    marginBottom: Platform.OS === "ios" ? 30 : 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e9ecef",
    gap: 10,
  },
  actionButtonText: {
    fontSize: 16,
    fontFamily: "semiBold",
    color: "#007AFF",
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  errorTitle: {
    fontSize: 24,
    fontFamily: "Bold",
    color: "#000",
    marginTop: 20,
    marginBottom: 10,
  },
  errorSubtitle: {
    fontSize: 16,
    fontFamily: "Regular",
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  backButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "semiBold",
  },
});
