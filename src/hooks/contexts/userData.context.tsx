import { createContext, useState, ReactNode } from "react";
import { IInformation } from "../../interfaces/IInformation";
import { dataLabel } from "../../services/api/labels";

// On crée d'abord le type pour le contexte utilisateur
interface UserDataContextType {
  availableUserData: string[];
  updateAvailableUserData: (currentlyUsedLabels: string[]) => void;
}

// Le type "ReactNode" est utilisé pour représenter tout ce qui peut être rendu dans React
interface UserDataProviderType {
  children: ReactNode;
}

// On initialise le contexte avec un type UserContextType ou undefined
// (le contexte peut être initialisé à vide)
const UserDataContext = createContext<UserDataContextType>({
  availableUserData: [],
  updateAvailableUserData: () => {},
});

export function UserDataProvider({ children }: UserDataProviderType) {
  const [availableUserData, setAvailableUserData] = useState<string[]>([]);

  function updateAvailableUserData(currentlyUsedLabels: string[]) {
    if (
      !localStorage.getItem("data_label") ||
      !localStorage.getItem("user_data")
    ) {
      setAvailableUserData([]);
    } else {
      const allLabels: string[] = JSON.parse(
        localStorage.getItem("data_label") as string
      ).map((labels: dataLabel) => labels.label);
      const usedLabels: string[] = JSON.parse(
        localStorage.getItem("user_data") as string
      ).map((userData: IInformation) => userData.label);
      const unusedLabels = allLabels.filter((label) => {
        return (
          !usedLabels.includes(label) && !currentlyUsedLabels.includes(label)
        );
      });
      setAvailableUserData(unusedLabels);
    }
  }

  return (
    /*  Ce composant spécial permet de fournir la valeur availableUserData et la fonction updateAvailableUserData 
        à tous les composants descendants de UserProvider qui consomment ce contexte. */

    <UserDataContext.Provider
      value={{ availableUserData, updateAvailableUserData }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

export default UserDataContext;
