import { getUserId } from "../../services/id";
import CardOption, { CardOptionComponent } from "../CardOption";

interface GroupCardOptionListComponent {
  isMenuOpen: boolean;
  id: number;
  creator_id: number;
  onGroupDeleted: (id: number) => void;
}

const GroupCardOptionList = ({
  isMenuOpen,
  id,
  creator_id,
  onGroupDeleted,
}: GroupCardOptionListComponent) => {
  const optionCards: CardOptionComponent[] = [
    {
      params: {
        label: "Conversation",
        link: "/messages",
      },
    },
    {
      params: {
        label: "Voir les détails",
        link: `/group/${id}`,
      },
    },
    {
      params: {
        label: "Inviter une personne",
        callback: () => {
          console.log("inviter une personne");
        },
      },
    },
    {
      params: {
        label: "Quitter le groupe",
        color: "red-600",
        isDisplayed: creator_id !== getUserId(),
        callback: () => {
          onGroupDeleted(id);
        },
      },
    },
    {
      params: {
        label: "Supprimer le groupe",
        color: "red-600",
        isDisplayed: creator_id === getUserId(),
        callback: () => {
          onGroupDeleted(id);
        },
      },
    },
  ];

  return (
    <>
      <div className="relative inline-flex">
        {isMenuOpen === true && (
          <div
            className="absolute right-0 top-3 z-50 mt-2 w-56 min-w-60 bg-white shadow-md rounded-lg p-2"
            role="menu"
            aria-orientation="vertical"
          >
            {optionCards.map((card, index: number) => (
              <CardOption params={card.params} key={index} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default GroupCardOptionList;
