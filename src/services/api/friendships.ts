// import axios from 'axios';
import { useApi } from '../../hooks/useApi';
import { FriendListInterface } from '../../interfaces/friend';
import { Confidentiality, IFriendData } from '../../interfaces/IInformation';

interface serverFormat {
    userId: number;
    userTag: string;
    firstName?: string;
    lastName?: string;
    confidentiality_level: string;
}

interface serverFormatFriendData {
    id: number;
    content: string;
    data_label: {
        label: string;
    };
}

const formatData = (serverData: serverFormat[]): FriendListInterface[] => {
    return serverData.map((servData) => {
        return {
            userId: servData.userId,
            userTag: servData.userTag,
            firstName: servData.firstName || null,
            lastName: servData.lastName || null,
            confidentiality_level: servData.confidentiality_level,
        };
    });
};

const formatFriendData = (serverData: serverFormatFriendData[]): IFriendData[] => {
    return serverData.map((servData) => {
        return {
            id: servData.id,
            label: servData.data_label.label,
            content: servData.content,
        };
    });
};

export function useFriendService() {

    const api = useApi();

    const getFriendsList = async (): Promise<FriendListInterface[]> => {
        if (!!localStorage.getItem("friends")) {
            return JSON.parse(localStorage.getItem("friends") as string);
        }
        return await api.get<serverFormat[]>("friendship").then((servData) => {
            const formattedData = formatData(servData.data);
            localStorage.setItem("friends", JSON.stringify(formattedData));
            return formattedData;
        })
    }

    const getFriendData = async (friendId: string): Promise<IFriendData[]> => {
        return await api.get<any[]>(`friendship/${friendId}`).then((response) => {
            const formattedData: IFriendData[] = formatFriendData(response.data);
            return formattedData;
        });
    }

    return { getFriendsList, getFriendData };
}

export const patchConfidentialityFriendshipService = () => {

    const api = useApi();

    const patchFriendshipConf = async (friendId: number, conf: Confidentiality): Promise<void> => {
        if (!!localStorage.getItem("friends")) {
            const updatedConf = await api.patch(`friendship`, { friendId: friendId, confidentiality: conf });
            const currentFriendsList = JSON.parse(localStorage.getItem("friends") as string);
            const updatedFriendsList = currentFriendsList.map((friend: FriendListInterface) =>
                friend.userId === friendId ? { ...friend, confidentiality_level: updatedConf.data.confidentiality } : friend
            );
            localStorage.setItem("friends", JSON.stringify(updatedFriendsList));
        } else {
            console.error("No friends found in local storage.");
        }
    }

    return { patchFriendshipConf };
}

export const putConfidentialityLevelToAFriend = async (idFriend: number, nexConfLevel: string): Promise<FriendListInterface> => {
    return {
        "userId": idFriend,
        "userTag": "exampleTagxy",
        "firstName": "aaa",
        "lastName": "bbb",
        "confidentiality_level": nexConfLevel
    }
}
