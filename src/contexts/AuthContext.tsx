import React, { createContext, useState } from "react";

import { auth, firebase } from "../services/firebase";

interface UserCredentials {
  stsTokenManager: {
    accessToken: string;
  };
}

interface User {
  username: string;
  accessToken: string;
}

interface AuthContextProps {
  user: User | undefined;
  signInWithTwitter: () => Promise<void>;
  signOut: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext({} as AuthContextProps);

const AuthContextProvider = (props: AuthContextProviderProps) => {
  const [user, setUser] = useState<User>();

  async function signInWithTwitter() {
    const provider = new firebase.auth.TwitterAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if (result.credential && result.additionalUserInfo) {
      const username = result.additionalUserInfo.username as string;
      const userCredentials = result.user?.toJSON() as UserCredentials;
      const accessToken = userCredentials.stsTokenManager.accessToken;

      setUser({
        username,
        accessToken: accessToken,
      });
    }
  }

  async function signOut() {
    await auth.signOut();
    setUser(undefined);
  }

  return (
    <AuthContext.Provider value={{ user, signInWithTwitter, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
