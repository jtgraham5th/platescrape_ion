import { Children, createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { useFirebaseApp } from "./FirebaseContext";
import React from "react";

interface AuthProviderProps {
    value?: any;
}

const DataContext = React.createContext<AuthProviderProps | undefined>(undefined!);

export function useAuth() {
    return useContext(DataContext);
}

export function AuthProvider(
    props: React.PropsWithChildren<AuthProviderProps>
    ) {
        const auth = getAuth(useFirebaseApp());
        const [currentUser, setCurrentUser] = useState();
        const [loading, setLoading] = useState(true);
        
        const login = (email: string, password: string) => {
            return signInWithEmailAndPassword(auth, email, password);
        };
        
  const signOut = () => {
    return auth.signOut();
  };

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const getUser = () => {
    return auth.currentUser;
  };

  const isAdmin = () => {
    return auth.currentUser?.getIdTokenResult().then((idTokenResult) => {
      if (!!idTokenResult.claims.admin) {
        return true;
      } else {
        return false;
      }
    });
  };

  const isEditor = () => {};

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: any = [
    currentUser,
    getUser,
    login,
    signOut,
    signUp,
  ];

  return (
    <DataContext.Provider value={value}>
      {!loading && value ? props.children : null}
    </DataContext.Provider>
  );
}
