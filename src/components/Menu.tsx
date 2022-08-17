import {
  IonBadge,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import {
  logOutOutline,
  logOutSharp,
  bookOutline,
  bookSharp,
  settingsOutline,
  settingsSharp,
} from "ionicons/icons";
import { useAuth } from "../data/AuthContext";
import "./Menu.css";

const appPages = [
  {
    title: "Meal Planner",
    url: "/planner",
    iosIcon: bookOutline,
    mdIcon: bookSharp,
  },
  {
    title: "Settings",
    url: "/page/settings",
    iosIcon: settingsOutline,
    mdIcon: settingsSharp,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const user = useAuth().getUser();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    history.push("/login");
  };

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Platescrape</IonListHeader>
          <IonNote>Welcome back, {user ? user.displayName : ''} </IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="inset"
                  detail={false}
                >
                  <IonIcon
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel><IonBadge>Coming Soon!</IonBadge>
                </IonItem>
              </IonMenuToggle>
            );
          })}
          <IonMenuToggle autoHide={false}>
            <IonItem onClick={handleLogout} lines="inset" detail={false}>
              <IonIcon
                slot="start"
                ios={logOutOutline}
                md={logOutSharp}
              />
              <IonLabel>Logout</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
