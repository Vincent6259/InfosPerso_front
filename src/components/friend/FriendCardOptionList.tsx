import FriendCardOptionBtn from "./FriendCardOptionBtn";

const FriendCardOptionList = ({ isMenuOpen }: any) => {
  return (
    <>
      <div className="relative inline-flex">
        {isMenuOpen === true && (
          <div className="absolute right-0 top-3 z-50 mt-2 w-56 min-w-60 bg-white shadow-md rounded-lg p-2" role="menu" aria-orientation="vertical">
            <FriendCardOptionBtn link="/messages" text="Conversation"/>
            <FriendCardOptionBtn link="/friends" text="Demande d'informations"/>
            <FriendCardOptionBtn link="/friends" text="Inviter à un groupe"/>
            <FriendCardOptionBtn link="/friends" text="Supprimer" color="red-600"/>
          </div>
        )}
      </div>
    </>
  );
};

export default FriendCardOptionList;
