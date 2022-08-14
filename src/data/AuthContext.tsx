import {
  useContext,
  useEffect,
  useState,
} from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  getAuth,
  Auth,
} from "firebase/auth";
import {
  getFirestore,
  setDoc,
  doc,
} from "firebase/firestore";

import { useFirebaseApp } from "./FirebaseContext";
import React from "react";

type AuthContextProps = {
  db: any;
  auth: Auth;
  getUser: Function;
  login: Function;
  logout: Function;
  signUp: Function;
};

const AuthContext = React.createContext<AuthContextProps>(undefined!);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props: React.PropsWithChildren<any>) {
  const auth = getAuth(useFirebaseApp());
  const db = getFirestore(useFirebaseApp());

  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const signUp = async (name: string, email: string, password: string) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      return await setDoc(doc(db, "users", user.uid), {
        name,
        authProvider: "local",
        email,
      });
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  };

  const getUser = () => {
    return currentUser;
  };

  // const isAdmin = () => {
  //   return auth.currentUser?.getIdTokenResult().then((idTokenResult) => {
  //     if (!!idTokenResult.claims.admin) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   });
  // };

  useEffect(() => {
    console.log("CHECKING---FOR----USER----AUTHENTICAITON")
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ db, auth, getUser, login, logout, signUp }}>
      {!loading && auth ? props.children : null}
    </AuthContext.Provider>
  );
}
