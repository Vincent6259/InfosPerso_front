import { GroupCardInterface } from "../../interfaces/IGroup";
import { SlOptionsVertical } from "react-icons/sl";
import GroupCardOptionList from "./GroupCardOptionList";

interface FriendCardProps {
  groupData: GroupCardInterface;
  isOptionOpen: boolean;
  onOptionsClick: () => void;
  onGroupDeleted: (id: number) => void;
}

const GroupCard = ({
  groupData,
  isOptionOpen,
  onOptionsClick,
  onGroupDeleted,
}: FriendCardProps) => {
  return (
    <>
      {/* <Link to={`/group/${groupData.id}`}> */}
      <div
        className={`select-none cursor-pointer w-80 bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg ${
          isOptionOpen ? "z-5" : ""
        }`}
      >
        <div className="flex-1 pl-1 mr-2">
          <div className="font-medium">{groupData.name.slice(0, 30)}</div>
        </div>
        <div
          className="p-2 rounded-full hover:bg-gray-400 groupCardOptionBtn"
          onClick={() => onOptionsClick()}
        >
          <SlOptionsVertical className="w-5.5 h-5.5 groupCardOptionBtn" />
        </div>
        <GroupCardOptionList
          isMenuOpen={isOptionOpen}
          id={groupData.id}
          creator_id={groupData.creator_id}
          onGroupDeleted={onGroupDeleted}
        />
      </div>
      {/* </Link> */}
    </>
  );
};

export default GroupCard;
