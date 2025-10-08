import React from "react";
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";

type OtpInputProps = {
  numberOfDigits?: number;
  value: string;
  placeHolder?: string;
  onChange: (otp: string) => void;
  keyboardType?: 'numeric' | 'number-pad' | 'decimal-pad' | 'default';
  autoFocus?: boolean;
  secureTextEntry?: boolean;
};

const InputOtp: React.FC<OtpInputProps> = ({
  numberOfDigits = 6,
  value,
  onChange,
  placeHolder,
  keyboardType = 'default',
  autoFocus = true,
  secureTextEntry = false,
}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <OtpInput
          numberOfDigits={numberOfDigits}
          onTextChange={onChange}
          placeholder={placeHolder ?? "-"}
          keyboardType={keyboardType}
          autoFocus={autoFocus}
          secureTextEntry={secureTextEntry}
          theme={{
            containerStyle: styles.otpContainer,
            textStyle: styles.otpText,
            focusStickStyle: styles.focusStick,
            pinCodeContainerStyle: styles.pinCodeContainer,
            pinCodeTextStyle: styles.pinCodeText,
          }}
          value={value}
          accessible
          accessibilityLabel="OTP Input Field"
        />
     
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  otpContainer: {
    marginVertical: 20,
  },
  otpText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2A2E34",
  },
  focusStick: {
    backgroundColor: "#3B82F6",
    height: 2,
  },
  pinCodeContainer: {
    width: 55,
    height: 55,
    marginHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
  },
  pinCodeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3D4C",
  },
});

export default InputOtp;
