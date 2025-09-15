import { useApi } from "../../hooks/useApi";
import { GroupCardInterface, GroupCreateInterface, GroupDetails } from "../../interfaces/IGroup";
import { getUserId } from "../id";

interface axiosResponse {
  data: serverFormat;
}

interface axiosResponseDetails {
  data: groupDetailsServ
}

interface serverFormat {
  group_members: groupServer[];
}

interface groupServer {
  group: GroupCardInterface;
}

interface dataLabelServ {
  label: string
}

interface dataLabelsServ {
  data_label: dataLabelServ
  data_label_id: number
}

interface groupDetailsServ {
  creator_id: number
  description: string
  group_permission: dataLabelsServ[]
  id: number
  name: string
}

interface postGroupServ {
  data: GroupCardInterface
}

const formatData = (serverData: serverFormat): GroupCardInterface[] => {
  return serverData.group_members.map((groupMember) => {
    return {
      id: groupMember.group.id,
      name: groupMember.group.name,
      description: groupMember.group.description,
      creator_id: groupMember.group.creator_id,
    };
  });
};

const formatGroupDetail = (serverData: axiosResponseDetails): GroupDetails => {
  const groupData = serverData.data
  const sharedInfos = serverData.data.group_permission.map((infos) => {
    return infos.data_label.label
  })

  return {
    creator_id: groupData.creator_id,
    description: groupData.description,
    id: groupData.id,
    name: groupData.name,
    group_permissions: sharedInfos
  }

}

export const getAllGroupsService = () => {

  const api = useApi();
  const getAllGroups = (): Promise<GroupCardInterface[]> => {
    
    if(!!localStorage.getItem("groups")) {
      return JSON.parse(localStorage.getItem("groups") as string)
    }
    return api.get("group").then((servData: axiosResponse) => {
      const formattedData = formatData(servData.data)
      localStorage.setItem("groups", JSON.stringify(formattedData))
      return formattedData
    })
  }

  return { getAllGroups }
}

export const getGroupByIdService = () => {
  const api = useApi();

  const getGroupById = (id: number): Promise<GroupDetails> => {
    return api.get(`group/${id}`).then((servData: axiosResponseDetails) => {
      return formatGroupDetail(servData)
    })
  }

  return { getGroupById }
}

export const getGroupMembersByIdService = () => {
  const api = useApi();
  const getGroupMembersById = (id: number) => {
    return api.get(`group-member/${id}`)
  }

  return {  getGroupMembersById }
}

export const postGroupService = () => {
  const api = useApi();
  const postGroup = async (content: GroupCreateInterface): Promise<postGroupServ> => {
    return api.post('group', content)
  }

  return { postGroup }
}

export const deleteGroupService = () => {
  const api = useApi();
  const deleteGroup = (id: number) => {
    return api.delete(`group/${id}`)
  }

  return { deleteGroup }
}

export const removeGroupMemberService = () => {
  const api = useApi();
  const removeGroupMember = (group_id: number) => {
    const user_id = getUserId()
    return api.delete('group-member', {data: {user_id, group_id}})
  }

  return { removeGroupMember }
}