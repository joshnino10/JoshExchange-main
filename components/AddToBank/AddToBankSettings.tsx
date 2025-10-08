import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Dimensions,
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

// Get screen dimensions for modal height calculation
const { height: screenHeight } = Dimensions.get("window");

// Sample bank data
const BANKS = [
  { id: "1", name: "Access Bank" },
  { id: "2", name: "GTBank" },
  { id: "3", name: "First Bank" },
  { id: "4", name: "UBA" },
  { id: "5", name: "Zenith Bank" },
  { id: "6", name: "Opay" },
  { id: "7", name: "Sterling Bank" },
  { id: "8", name: "Union Bank" },
  { id: "9", name: "Wema Bank" },
  { id: "10", name: "Polaris Bank" },
  { id: "11", name: "Fidelity Bank" },
];

export default function AddToBankSettings() {
  const [bankModalVisible, setBankModalVisible] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const filteredBanks = BANKS.filter((bank) =>
    bank.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBankSelect = (bank) => {
    setSelectedBank(bank);
    setBankModalVisible(false);
    setSearchQuery("");
    setAccountName("");
  };

  const handleAccountNumberChange = (number) => {
    setAccountNumber(number);
    if (number.length === 10 && selectedBank) {
      setIsLoading(true);
      setTimeout(() => {
        setAccountName("Joshua Nduka Ifeanyi"); // Replace with API call
        setIsLoading(false);
      }, 1000);
    } else {
      setAccountName("");
    }
  };

  const renderBankItem = ({ item }) => (
    <TouchableOpacity
      style={styles.bankItem}
      onPress={() => handleBankSelect(item)}
    >
      <View style={styles.bankInfo}>
        <Text style={styles.bankName}>{item.name}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#666" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
        
      {/* Bank Selection */}
      <View style={styles.inputGroup}>
        <Text style={styles.sectionTitle}>Select Bank</Text>
        <Pressable
          style={styles.input}
          onPress={() => setBankModalVisible(true)}
        >
          <View style={styles.inputContent}>
            {selectedBank ? (
              <Text style={styles.selectedText}>{selectedBank.name}</Text>
            ) : (
              <Text style={styles.placeholderText}>Choose your bank</Text>
            )}
            <Ionicons name="chevron-down" size={20} color="#666" />
          </View>
        </Pressable>
      </View>

      {/* Account Number Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.sectionTitle}>Account Number</Text>
        <TextInput
          style={styles.input}
          value={accountNumber}
          onChangeText={handleAccountNumberChange}
          keyboardType="default"
          maxLength={10}
          editable={!!selectedBank}
        />
        {!selectedBank && (
          <Text style={styles.helperText}>Please select a bank first</Text>
        )}
      </View>

      {/* Account Name Display */}
      {selectedBank && accountNumber.length === 10 && (
        <View style={styles.inputGroup}>
          <Text style={styles.sectionTitle}>Account Name</Text>
          <View style={styles.accountNameContainer}>
            {isLoading ? (
              <Text style={styles.loadingText}>Verifying account...</Text>
            ) : accountName ? (
              <Text style={styles.accountNameText}>{accountName}</Text>
            ) : (
              <Text style={styles.errorText}>Account not found</Text>
            )}
          </View>
        </View>
      )}

      {/* Continue Button */}
      {accountName && (
        <TouchableOpacity
          style={styles.continueButton}
          onPress={()=> router.push('/settings')}
       
        >
          <Text style={styles.continueButtonText}>Verify</Text>
        </TouchableOpacity>
      )}

      {/* Bank Selection Modal */}
      <Modal
        visible={bankModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Bank</Text>
              <TouchableOpacity
                onPress={() => setBankModalVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            {/* Search Input */}
            <View style={styles.searchContainer}>
              <Ionicons
                name="search"
                size={20}
                color="#666"
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search banks..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {/* Banks List */}
            <FlatList
              data={filteredBanks}
              keyExtractor={(item) => item.id}
              renderItem={renderBankItem}
              style={styles.banksList}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    paddingHorizontal: 16,
  },
  inputGroup: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: "semiBold",
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f1f1f1",
    height: 50,
    padding: 15,
    fontFamily: "semiBold",
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  inputContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedText: {
    fontSize: 16,
    fontFamily: "Medium",
    color: "#333",
  },
  placeholderText: {
    fontSize: 16,
    fontFamily: "Regular",
    color: "#999",
  },
  helperText: {
    fontSize: 12,
    fontFamily: "Regular",
    color: "#666",
    marginTop: 4,
  },
  accountNameContainer: {
    backgroundColor: "#f1f1f1",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  accountNameText: {
    fontSize: 16,
    fontFamily: "semiBold",
    color: "#333",
  },
  loadingText: {
    fontSize: 16,
    fontFamily: "Regular",
    color: "#666",
    fontStyle: "italic",
  },
  errorText: {
    fontSize: 16,
    fontFamily: "Regular",
    color: "#e74c3c",
  },

  // Continue button
  continueButton: {
    backgroundColor: "#0000cd",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "semiBold",
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    height: screenHeight * 0.7,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "Bold",
    color: "#333",
  },
  closeButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
    backgroundColor: "#f6f6f6",
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    fontFamily: "Regular",
  },

  banksList: {
    flex: 1,
  },

  bankItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },

  bankInfo: {
    flex: 1,
  },

  bankName: {
    fontSize: 16,
    fontFamily: "Medium",
    color: "#333",
    marginBottom: 4,
  },
});

