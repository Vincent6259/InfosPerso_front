import { FriendListInterface } from "../../interfaces/friend";
import { SlOptionsVertical } from "react-icons/sl";
import { Confidentiality, ConfidentialityColorByLevel } from "../../interfaces/IInformation";
import { useEffect } from "react";
import FriendCardOptionList from "./FriendCardOptionList";
import { Link } from "react-router-dom";
import ConfidentialityPicker from "../informations/ConfidentialityPicker";
import { IconContext } from "react-icons";
import { FaCircle } from "react-icons/fa";

interface FriendCardProps {
  friendData: FriendListInterface;
  isOptionMenuOpen: boolean;
  isConfColorMenuOpen: boolean;
  onOptionMenuToggle: () => void;
  onConfColorMenuToggle: () => void;
  onConfColorMenuClick: (conf: Confidentiality, userID: number) => Promise<void>;
}

const FriendCard = ({
  friendData,
  isOptionMenuOpen,
  isConfColorMenuOpen,
  onOptionMenuToggle,
  onConfColorMenuToggle,
  onConfColorMenuClick,
}: FriendCardProps) => {

  useEffect(() => {
    ;
  }, []);

  return (
    // FIXME: Dark mode défaillant   =>   dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
    // Ancienne version   =>   flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl p-4 md:p-5
    <div
      className={`select-none cursor-pointer w-80 bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg ${isOptionMenuOpen || isConfColorMenuOpen ? "z-5" : ""
        }`}
    >
      <Link to={`/friends/${friendData.userId}`} className="flex items-center w-58">
        <div className="flex flex-col rounded-md w-13 h-13 bg-gray-300 justify-center items-center mr-4">
          PP
        </div>
        <div className="flex-1 pl-1 mr-2">
          <div className="font-medium">
            {!!friendData.firstName && !!friendData.lastName ? `${friendData.firstName.slice(0, 20)} ${friendData.lastName.slice(0, 20)}` : friendData.userTag.slice(0, 20)}
          </div>
        </div>
      </Link>
      <div className="friendCardConfBtn">
        <IconContext.Provider value={{
          color: ConfidentialityColorByLevel[friendData.confidentiality_level as Confidentiality],
        }}>
          <FaCircle
            size={22}
            className="cursor-pointer confidentiality-picker"
            onClick={() => onConfColorMenuToggle()}
          />
        </IconContext.Provider>
      </div>
      {!!isConfColorMenuOpen && (
        <div className="absolute bg-white shadow-md rounded-lg w-50 top-10 right-0 z-20 flex flex-col gap-3 py-3">
          <ConfidentialityPicker
            pickConfidentiality={(conf: Confidentiality) => {
              onConfColorMenuClick(conf, friendData.userId);
            }}
            maximumVisible={false}
            currentlySelected={friendData.confidentiality_level as Confidentiality}
          />
        </div>
      )}
      <div className="friendCardConfBtn">
        <SlOptionsVertical onClick={() => onOptionMenuToggle()} className="w-5.5 h-5.5" />
      </div>
      <FriendCardOptionList isMenuOpen={isOptionMenuOpen} />
    </div>
  );
};

export default FriendCard;

