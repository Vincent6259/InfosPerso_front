import { useApi } from "../../hooks/useApi";

export interface dataLabel {
    id: number
    label: string
}

export const getDataLabelsService = () => {

    const api = useApi();

    const getDataLabels = async (): Promise<dataLabel[]> => {
        if(!!localStorage.getItem("data_label")) {
            return JSON.parse(localStorage.getItem("data_label") as string)
        }
        return api.get("data-label").then((servData) => {
            const labels = servData.data
            localStorage.setItem("data_label", JSON.stringify(labels))
            return labels
        })
    }

    return { getDataLabels }
}