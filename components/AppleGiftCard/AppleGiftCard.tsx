import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const countries = [
  { name: 'United States', code: 'US', flag: '🇺🇸' },
  { name: 'United Kingdom', code: 'GB', flag: '🇬🇧' },
  { name: 'Canada', code: 'CA', flag: '🇨🇦' },
  { name: 'Germany', code: 'DE', flag: '🇩🇪' },
  { name: 'France', code: 'FR', flag: '🇫🇷' },
];

export default function EbayGiftCardDetails() {

  const [receiptType, setReceiptType] = useState<'PHYSICAL' | 'ECODE'>('PHYSICAL');
  const [cardValue, setCardValue] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [showPicker, setShowPicker] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleConfirm = () => {
    if (!cardValue || isNaN(Number(cardValue)) || Number(cardValue) <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid card value.');
      return;
    }
    Alert.alert('Success', 'Trade request submitted!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Image style={{ width: 80, height: 80 }} source={require('../../assets/images/applecard.png')} />
          </View>

          {/* Country Selection */}
          <Text style={styles.sectionTitle}>Select Country</Text>
          <TouchableOpacity
            style={styles.countryButton}
            onPress={() => setShowPicker(!showPicker)}
          >
            <Text style={styles.countryText}>{selectedCountry.flag} {selectedCountry.name}</Text>
          </TouchableOpacity>

          {showPicker && (
            <View style={styles.dropdown}>
              {countries.map((country) => (
                <TouchableOpacity
                  key={country.code}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedCountry(country);
                    setShowPicker(false);
                  }}
                >
                  <Text style={styles.countryText}>{country.flag} {country.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Receipt Type */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Receipt Availability</Text>
            <View style={styles.receiptOptions}>
              {['PHYSICAL', 'ECODE'].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[styles.receiptOption, receiptType === type && styles.receiptOptionActive]}
                  onPress={() => setReceiptType(type as 'PHYSICAL' | 'ECODE')}
                >
                  <Ionicons
                    name={type === 'PHYSICAL' ? 'calendar-outline' : 'barcode-outline'}
                    size={24}
                    color={receiptType === type ? '#0064D2' : '#666'}
                  />
                  <Text style={[styles.receiptOptionText, receiptType === type && styles.receiptOptionTextActive]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Card Value */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Card Value ($)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Card Value"
              value={cardValue}
              onChangeText={setCardValue}
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </View>

          {/* Upload Card */}
          <View style={styles.section}>
            <View style={styles.uploadHeader}>
              <Text style={styles.sectionTitle}>Upload Card</Text>
              <Ionicons name="image-outline" size={20} color="#666" style={styles.uploadIcon} />
            </View>

            <TouchableOpacity style={styles.uploadArea} onPress={handleImagePick}>
              <View style={styles.uploadContent}>
                {image ? (
                  <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
                ) : (
                  <>
                    <Ionicons name="cloud-upload-outline" size={40} color="#999" />
                    <Text style={styles.uploadText}>Upload card</Text>
                    <Text style={styles.uploadSubtext}>Supported file types: jpeg, png. Max file size: 5mb</Text>
                  </>
                )}
              </View>
            </TouchableOpacity>
          </View>

          {/* Notes */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notes (Optional)</Text>
            <TextInput
              style={styles.notesInput}
              placeholder=""
              value={notes}
              onChangeText={setNotes}
              multiline
              textAlignVertical="top"
            />
          </View>

          {/* Confirm */}
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmButtonText}>Confirm Trade</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  keyboardAvoidingView: { flex: 1 },
  scrollView: { flex: 1, paddingHorizontal: 24 },
  header: {
    flexDirection: 'row', alignItems: 'center', paddingTop: 20, alignSelf: 'center', paddingBottom: 20,
  },
  section: { marginBottom: 32 },
  sectionTitle: {
    fontSize: 17, fontFamily: 'semiBold', color: '#333', marginBottom: 16,
  },
  countryButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  countryText: { fontSize: 16, color: '#333', fontFamily: 'Medium' },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  receiptOptions: { flexDirection: 'row', gap: 16 },
  receiptOption: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  receiptOptionActive: { borderColor: '#0064D2', backgroundColor: '#F0F7FF' },
  receiptOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginTop: 8,
    letterSpacing: 1,
  },
  receiptOptionTextActive: { color: '#0064D2' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: '#f8f8f8',
  },
  uploadHeader: { 
    flexDirection: 'row',
    //  alignItems: 'center',
    marginBottom: 16
     },

  uploadIcon: { marginLeft: 8 },
  uploadArea: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#f8f8f8',
  },
  uploadContent: { alignItems: 'center' },
  uploadText: { fontSize: 16, color: '#666', marginTop: 12, marginBottom: 8 },
  uploadSubtext: { fontSize: 12, color: '#999', textAlign: 'center', lineHeight: 16 },
  notesInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: '#f8f8f8',
    minHeight: 120,
  },
  confirmButton: {
    backgroundColor:  "#0000cd",
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 40,
  },
  confirmButtonText: { 
    color: "white",
    fontSize: 18,
    fontFamily: "Bold",
    },
});
