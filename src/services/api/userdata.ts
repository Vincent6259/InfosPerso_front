import { useApi } from "../../hooks/useApi";
import { Confidentiality, IInformation } from "../../interfaces/IInformation";
import { InfoCard } from "../../pages/profile/AddInformation";

interface axiosCreateResponse {
    data: createServerFormat[]
}

interface createServerFormat {
    id: number;
    content: string;
    confidentiality: string;
    label_id: number
}
  
interface serverFormat {
    id: number;
    content: string;
    confidentiality: string;
    data_label: {
      label: string;
    };
}

const confidentialities: Record<string, Confidentiality> = {
    MAXIMUM: Confidentiality.MAXIMUM,
    CRITICAL: Confidentiality.CRITICAL,
    MIDDLING: Confidentiality.MIDDLING,
    MINIMUM: Confidentiality.MINIMUM,
};

const formatData = (serverData: serverFormat[]): IInformation[] => {
    return serverData.map((servData) => {
        return {
        id: servData.id,
        content: servData.content,
        confidentiality: confidentialities[servData.confidentiality],
        label: servData.data_label.label,
        };
    });
};

export const postUserDataService = () => {
    const api = useApi();

    const postUserData = (content: Omit<InfoCard, "id">[]): Promise<axiosCreateResponse> => {
        return api.post("user-data", content)
    }

    return { postUserData }
}

export const getUserDataService = () => {

    const api = useApi();

    const getUserData = async (): Promise<IInformation[]> => {
        if(!!localStorage.getItem("user_data")) {
            return JSON.parse(localStorage.getItem("user_data") as string)
        }
        return api.get("user-data").then((servData) => {
            const formattedData = formatData(servData.data)
            localStorage.setItem("user_data", JSON.stringify(formattedData))
            return formattedData
        })
    }

    return { getUserData }
}

export const patchValueUserDataService = () => {

    const api = useApi();

    const patchValue = (id: number, value: string): Promise<void> => {
        return api.patch(`user-data/${id}`, { content: value })
    }

    return { patchValue }
}

export const patchConfidentialityUserDataService = () => {

    const api = useApi();

    const patchConf = (id: number, conf: Confidentiality): Promise<void> => {
        return api.patch(`user-data/${id}`, { confidentiality: conf })
    }

    return { patchConf }
}

export const deleteDataUserDataService = () => {

    const api = useApi();

    const deleteData = (id: number): Promise<void> => {
        return api.delete(`user-data/${id}`)
    }

    return { deleteData }
}