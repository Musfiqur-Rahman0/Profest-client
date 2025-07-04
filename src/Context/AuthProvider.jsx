import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "@/firebase/firebase.init";
import { onAuthStateChanged } from "firebase/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user && user.email ? user : null);
      setIsLoading(false);
    });

    return () => unSubscribe();
  }, []);

  console.log(user);
  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
