import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonSplitPane,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  FlatwareIcon,
  KitchenIcon,
  MenuBookIcon,
  ShoppingCartIcon,
} from "./components/icons";
import Feed from "./pages/Feed";
import Recipes from "./pages/Recipes";
import Shopping from "./pages/Shopping";
import Kitchen from "./pages/Kitchen";
import { FirebaseAppProvider, firebaseConfig } from "./data/FirebaseContext";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/floating-tab-bar.css";
import "./global.scss";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./data/AuthContext";
import { DataProvider } from "./data/DataContext";
import { PrivateRoute } from "./PrivateRoute";

setupIonicReact();

const App: React.FC = () => {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <AuthProvider>
        <DataProvider>
          <IonApp>
            <IonReactRouter>
              <IonSplitPane contentId="main">
                <IonTabs>
                  <IonRouterOutlet id="main">
                    <Route path="/" exact={true}>
                      <Redirect to="/signup" />
                    </Route>
                    <Route exact path="/login">
                      <Login />
                    </Route>
                    <Route exact path="/signup">
                      <Signup />
                    </Route>
                    <PrivateRoute>
                      <Route exact path="/feed">
                        <Feed />
                      </Route>
                      <Route exact path="/recipes">
                        <Recipes />
                      </Route>
                      <Route path="/shopping">
                        <Shopping />
                      </Route>
                      <Route path="/kitchen">
                        <Kitchen />
                      </Route>
                      {/* <Route exact path="/">
                <Redirect to="/feed" />
              </Route> */}
                    </PrivateRoute>
                  </IonRouterOutlet>
                  <IonTabBar slot="bottom">
                    <IonTabButton tab="feed" href="/feed">
                      <IonIcon src={FlatwareIcon} />
                      {/* <IonLabel>Feed</IonLabel> */}
                    </IonTabButton>
                    <IonTabButton tab="recipes" href="/recipes">
                      <IonIcon src={MenuBookIcon} />
                      {/* <IonLabel>Recipes</IonLabel> */}
                    </IonTabButton>
                    <IonTabButton tab="shopping" href="/shopping">
                      <IonIcon src={ShoppingCartIcon} />
                      {/* <IonLabel>Shopping</IonLabel> */}
                    </IonTabButton>
                    <IonTabButton tab="kitchen" href="/kitchen">
                      <IonIcon src={KitchenIcon} />
                      {/* <IonLabel>Kitchen</IonLabel> */}
                    </IonTabButton>
                  </IonTabBar>
                </IonTabs>
              </IonSplitPane>
            </IonReactRouter>
          </IonApp>
        </DataProvider>
      </AuthProvider>
    </FirebaseAppProvider>
  );
};

export default App;
