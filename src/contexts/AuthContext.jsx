import { createContext, useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const onAuthStateChanged = (user) => {
      setCurrentUser(user);
      if (initializing) setInitializing(false);
    };

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, initializing }}>
      {children}
    </AuthContext.Provider>
  );
}
