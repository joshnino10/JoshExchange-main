import { createContext, ReactNode, useContext, useState } from "react";

// Define the shape of our global state
interface GlobalState {
  username: string;
  setUserName: (username: string) => void;
  firstName: string;
  setFirstName: (firstName: string) => void;
  lastName: string;
  setLastName: (lastName: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  clearAllData: () => void; // Add this for logout
}

const GlobalContext = createContext<GlobalState | undefined>(undefined);

interface StateProviderProps {
  children: ReactNode;
}

export const StateProvider = ({ children }: StateProviderProps) => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Clear all data (for logout)
  const clearAllData = () => {
    setUsername("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const value: GlobalState = {
    username,
    setUserName: setUsername,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    clearAllData,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = (): GlobalState => {
  const context = useContext(GlobalContext);
  
  if (context === undefined) {
    throw new Error('useGlobal must be used within a StateProvider');
  }
  
  return context;
};