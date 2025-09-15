import { Link, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import {
  getGroupByIdService,
  getGroupMembersByIdService,
} from "../../services/api/groups";
import { GroupDetails } from "../../interfaces/IGroup";
import { getUserId } from "../../services/id";
import { FaPen } from "react-icons/fa";

interface groupMembersServData {
  data: Member[];
}

interface Member {
  user: User;
  user_id: number;
}

interface User {
  tag: string;
  user_data: userData[];
}

interface userData {
  content: string;
  data_label: {
    label: string;
  };
}

const GroupDetail = () => {
  const location = useLocation();
  const pathNameSplit = location.pathname.split("/");
  const groupId = pathNameSplit[pathNameSplit.length - 1];
  const [groupDetails, setGroupDetails] = useState<GroupDetails>({
    creator_id: 0,
    description: "",
    group_permissions: [],
    id: +groupId,
    name: "",
  });
  const [groupMembers, setGroupMembers] = useState<string[]>([]);

  const { getGroupById } = getGroupByIdService();
  const { getGroupMembersById } = getGroupMembersByIdService();

  useEffect(() => {
    (async () => {
      setGroupDetails(await getGroupById(+groupId));
      const members: groupMembersServData = await getGroupMembersById(+groupId);
      setGroupMembers(formatGroupMembers(members));
    })();
  }, []);

  const formatGroupMembers = (members: groupMembersServData): string[] => {
    const array = members.data;
    const filteredMembers = array.filter(
      (member) => member.user_id !== getUserId()
    );
    const formattedArray = filteredMembers.map((member) => {
      const filteredInfos = member.user.user_data.filter(
        (data) =>
          data.data_label.label === "Prénom" || data.data_label.label === "Nom"
      );
      if (filteredInfos.length === 2) {
        const firstName = filteredInfos.find(
          (info) => info.data_label.label === "Prénom"
        )?.content;
        const lastName = filteredInfos.find(
          (info) => info.data_label.label === "Nom"
        )?.content;
        return `${firstName} ${lastName}`;
      } else {
        return member.user.tag;
      }
    });
    return formattedArray;
  };

  return (
    <>
      <Header label="Détails du groupe" icons={["MdGroups"]} />
      <div className="pt-5 pl-5 pr-5 pb-30">
        {groupDetails.creator_id === getUserId() && (
          <div className="flex justify-between pb-10">
            <Link
              to={`edit`}
              className="bg-[#b2ebf2] border-1 border-black rounded-full cursor-pointer w-[40px] h-[40px] flex justify-center items-center"
            >
              <FaPen size={20} />
            </Link>
          </div>
        )}
        <div className="wrapper text-center">
          <div className="text-2xl font-semibold pb-5">{groupDetails.name}</div>
          <div className="p-5">{groupDetails.description}</div>
          <div>Données Partagées : </div>
          <ul className="p-5 font-semibold">
            {groupDetails.group_permissions.map((data, index) => (
              <li key={index}>{data}</li>
            ))}
          </ul>
          <div>Membres :</div>
          <ul className="p-5 font-semibold">
            {groupMembers.map((data, index) => (
              <li key={index}>{data}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default GroupDetail;
