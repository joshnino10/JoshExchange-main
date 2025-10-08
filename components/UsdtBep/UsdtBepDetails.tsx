import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function UsdtBepDetails({
  address = "0x994e25d1352128664be29cd5919a348d4f825453",
  conversionRate = "₦1600",
  minimumDeposit = "$5",
  showTruncated = false,
}) {
  const [addressCopied, setAddressCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await Clipboard.setStringAsync(address);
      setAddressCopied(true);

     
      if (Haptics.impactAsync) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }

      Alert.alert("Copied!", "BEP address copied to clipboard");

      setTimeout(() => {
        setAddressCopied(false);
      }, 2000);
    } catch (error) {
      Alert.alert("Error", "Failed to copy address");
    }
  };
  
   const onDone =()=>{
    router.replace('/(tabs)/home')
   }

  const truncateAddress = (addr) => {
    if (!showTruncated) return addr;
    return `${addr.slice(0, 8)}...${addr.slice(-8)}`;
  };

  const displayAddress = truncateAddress(address);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.page}>
        <View style={styles.qrCodeContainer}>
          <QRCode
            value={address}
            size={210}
            backgroundColor="white"
            color="black"
            logo={require("../../assets/images/usdt(bep20).png")}
            logoSize={30}
            logoBackgroundColor="transparent"
          />
        </View>

        {/* Bitcoin Address Section */}
        <View style={[styles.containerBase, styles.bitcoinAddressContainer]}>
          <View style={styles.warningRow}>
            <Ionicons name="warning" size={22} color="#ef4444" />
            <Text style={styles.warningText}>
              Send only USDT(BEP20) to this deposit address
            </Text>
          </View>

          <View style={styles.addressRow}>
            <Text
              style={[styles.address, { maxWidth: showTruncated ? 200 : 295 }]}
              numberOfLines={showTruncated ? 1 : undefined}
            >
              {displayAddress}
            </Text>

            <TouchableOpacity
              onPress={copyToClipboard}
              style={[
                styles.copyButton,
                addressCopied && styles.copyButtonActive,
              ]}
              accessibilityLabel="Copy BEP address"
              accessibilityHint="Copies the BEP address to clipboard"
              activeOpacity={0.7}
            >
              <Ionicons
                name={addressCopied ? "checkmark" : "copy"}
                size={20}
                color={addressCopied ? "#10b981" : "#6b7280"}
              />
            </TouchableOpacity>
          </View>

          {addressCopied && (
            <Text style={styles.copiedFeedback}>Address copied!</Text>
          )}
        </View>

        {/* Conversion Rate Section */}
        <View style={[styles.containerBase, styles.conversionContainer]}>
          <View style={styles.rateSection}>
            <Text style={styles.rateLabel}>Current Rate</Text>
            <Text style={styles.rate}>{conversionRate}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.depositSection}>
            <Text style={styles.depositLabel}>Minimum</Text>
            <Text style={styles.minimumDeposit}>{minimumDeposit}</Text>
          </View>
        </View>

        {/* Additional Info */}
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Ionicons name="time" size={16} color="#6b7280" />
            <Text style={styles.infoText}>
              Deposits typically confirm in 10-60 minutes
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="shield-checkmark" size={16} color="#6b7280" />
            <Text style={styles.infoText}>Requires 1 network confirmation</Text>
          </View>
        </View>
      </View>
      <View>
        <TouchableOpacity style={styles.donebtn} onPress={onDone}>
          <Text style={styles.done}>Done</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    marginTop: 10,
    paddingHorizontal: 30,
    paddingBottom: 30,
  },

  containerBase: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 15,
    marginTop: 20,
  },

  qrCodeContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },

  loadingContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },

  loadingText: {
    marginTop: 10,
    fontSize: 12,
    color: "#6b7280",
    fontFamily: "medium",
  },

  bitcoinAddressContainer: {
    gap: 12,
  },

  warningRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  warningText: {
    fontSize: 13,
    fontFamily: "semiBold",
    color: "#9ca3af",
  },

  addressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  address: {
    color: "black",
    fontFamily: "Bold",
    fontSize: 15,
    flex: 1,
  },

  copyButton: {
    padding: 8,
    borderRadius: 8,
    marginLeft: 10,
  },

  copyButtonActive: {
    backgroundColor: "#dcfce7",
  },

  copiedFeedback: {
    fontSize: 12,
    color: "#10b981",
    fontFamily: "medium",
    textAlign: "center",
  },

  conversionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingVertical: 22,
    gap: 20,
  },

  rateSection: {
    alignItems: "center",
    flex: 1,
  },

  depositSection: {
    alignItems: "center",
    flex: 1,
  },

  rateLabel: {
    fontSize: 12,
    color: "#6b7280",
    fontFamily: "medium",
    marginBottom: 4,
  },

  depositLabel: {
    fontSize: 12,
    color: "#6b7280",
    fontFamily: "medium",
    marginBottom: 4,
  },

  rate: {
    fontSize: 18,
    fontFamily: "Bold",
    color: "#f7931a",
  },

  minimumDeposit: {
    fontSize: 18,
    fontFamily: "Bold",
    color: "#059669",
  },

  divider: {
    borderWidth: 1,
    height: 40,
    width: 1,
    borderColor: "#d1d5db",
  },

  infoContainer: {
    marginTop: 20,
    gap: 12,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  infoText: {
    fontSize: 13,
    color: "#6b7280",
    fontFamily: "medium",
    flex: 1,
  },

  donebtn: {

    backgroundColor: "#0000cd",
    alignItems: "center",
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 15

  },
  done: {
    color: "white",
    fontSize: 18,
    fontFamily: "Bold",
  },
});
