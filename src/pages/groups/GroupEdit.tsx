import GroupCreation, { Mode } from "../../components/groups/GroupCreation";
import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
import { GroupCardInterface } from "../../interfaces/IGroup";

const GroupEdit = () => {
  const location = useLocation();
  const pathNameSplit = location.pathname.split("/");
  const groupId = pathNameSplit[pathNameSplit.length - 2];
  const storage = localStorage.getItem("groups");
  let groupData: GroupCardInterface | null = null;
  if (storage) {
    groupData = JSON.parse(storage).find(
      (group: GroupCardInterface) => group.id === +groupId
    );
  }

  return (
    <>
      <Header label="Modifier un groupe" icons={["MdGroups"]} />
      <GroupCreation
        mode={Mode.EDIT}
        defaultName={groupData?.name || ""}
        defaultDescription={groupData?.description || ""}
        displaySharedData={false}
      />
    </>
  );
};

export default GroupEdit;
