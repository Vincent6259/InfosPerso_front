import { useEffect, useState } from "react";
import { GroupCardInterface } from "../../interfaces/IGroup";
import GroupCard from "./GroupCard";
import {
  deleteGroupService,
  getAllGroupsService,
  removeGroupMemberService,
} from "../../services/api/groups";
import { getUserId } from "../../services/id";

const GroupListComp = () => {
  const [groupsList, setGroupsList] = useState<GroupCardInterface[]>([]);

  const [cardClicked, setCardClicked] = useState<number>(-1);

  const { getAllGroups } = getAllGroupsService();
  const { deleteGroup } = deleteGroupService();
  const { removeGroupMember } = removeGroupMemberService();

  const removeGroup = async (id: number): Promise<void> => {
    const foundGroup = groupsList.find((group) => group.id === id);
    if (foundGroup?.creator_id === getUserId()) {
      await deleteGroup(id);
    } else {
      await removeGroupMember(id);
    }

    const groupStorage: string | null = localStorage.getItem("groups");
    if (groupStorage) {
      const newStorage = JSON.parse(groupStorage).filter(
        (group: GroupCardInterface) => group.id !== id
      );
      localStorage.setItem("groups", JSON.stringify(newStorage));
    }
    setGroupsList(await getAllGroups());
  };

  useEffect(() => {
    (async () => {
      setGroupsList(await getAllGroups());
    })();
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        !Array.from(target.classList).includes("groupCardOptionBtn")
      ) {
        setCardClicked(-1);
      }
    };
    document.body.addEventListener("click", handleClick);
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <div className="container flex flex-wrap m-auto w-full items-center justify-center gap-2 lg:gap-8 mt-8 pb-30">
        {groupsList.map((group: GroupCardInterface, index: number) => (
          <div
            key={index}
            className="flex p-0 border-gray-400 flex-row mb-2 h-20"
          >
            <GroupCard
              groupData={group}
              isOptionOpen={cardClicked === index}
              onOptionsClick={() => {
                cardClicked === index
                  ? setCardClicked(-1)
                  : setCardClicked(index);
              }}
              onGroupDeleted={removeGroup}
              key={index}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default GroupListComp;
