import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import EmptyTransaction from "../EmptyTransaction/EmptyTransaction";
import { transactions } from "./TransactionsDetails";

export default function Transactions({ showHeader = true }) {

  const router = useRouter();

  const displayedTransactions = transactions.slice(0, 3); // show top 3

  if (!displayedTransactions.length) {
    return (
      <EmptyTransaction/>
    );
  }

  const showReceipt = (transactionId) => {
    router.push(`/transaction-receipt/${transactionId}`);
  };

  return (
    <View>
      {showHeader && displayedTransactions.length > 0 && (
        <View style={styles.transactionDetails}>
          <Text style={styles.recent}>Recent Transaction</Text>
          <TouchableOpacity onPress={() => router.push("/(tabs)/transactions")}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
      )}
      <View
        style={{ marginTop: 15, marginBottom: Platform.OS === "ios" ? 30 : 50 }}
      >
        {displayedTransactions.map((transaction) => (
          <TouchableOpacity 
            onPress={() => showReceipt(transaction.id)} // Fixed: Pass transaction.id
            style={styles.container} 
            key={transaction.id || transaction.title}
          >
            <View style={styles.details}>
              <View
                style={[styles.iconBorder, { borderColor: transaction.color }]}
              >
                <Feather
                  name={transaction.icon}
                  size={20}
                  color={transaction.color}
                />
              </View>

              <View style={{ gap: 5 }}>
                <Text style={[styles.type, { color: transaction.color }]}>
                  {transaction.title}
                </Text>
                <Text style={styles.date}>{transaction.date}</Text>
              </View>
            </View>

            <View style={{ gap: 4 }}>
              {transaction.TransactionType && (
                <Text
                  style={[styles.transactionType, { color: transaction.color }]}
                >
                  {transaction.TransactionType}
                </Text>
              )}

              <Text style={[styles.amount, { color: transaction.color }]}>
                {transaction.amount}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Platform.OS === "ios" ? 15 : 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 15,
  },

  details:{
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },

  iconBorder: {
    width: 32,
    height: 32,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  amount:{
    fontSize: 15,
    fontFamily: "Bold",
  },

  type:{
    fontSize: 16,
    fontFamily: "semiBold",
  },

  date: {
    fontFamily: "Regular",
    color: "black",
    fontSize: 15,
  },
  transactionType: {
    fontSize: 12,
    fontFamily: "semiBold",
  },
  transactionDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  recent: {
    fontFamily: "semiBold",
    fontSize: 16,
  },
  seeAll: {
    fontFamily: "Bold",
    fontSize: 15,
    color: "#0000cd",
  },
});