import { IonLoading } from "@ionic/react";
import { Redirect, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAuth } from "./data/AuthContext";

export const PrivateRoute = ({
  children,
  location,
  ...rest
}: React.PropsWithChildren<any>) => {
  const { auth } = useAuth();
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return <IonLoading isOpen={loading} />;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  );
};
