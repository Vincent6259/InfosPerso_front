import GroupCreation, { Mode } from "../../components/groups/GroupCreation";
import Header from "../../components/Header";

const GroupCreate = () => {
  return (
    <>
      <Header label="Créer un groupe" icons={["MdGroups"]} />
      <GroupCreation mode={Mode.CREATE} />
    </>
  );
};

export default GroupCreate;
