import { IInformation, Confidentiality } from "../../interfaces/IInformation"

export const getUserInfos = async(): Promise<IInformation[]> => {
    return [
        {
            id: 0,
            label: "Email",
            content: "lol@mail.fr",
            confidentiality: Confidentiality.MINIMUM,
        },
        {
            id: 1,
            label: "Phone number",
            content: "06 07 08 09 10",
            confidentiality: Confidentiality.MIDDLING,
        },
        {
            id: 2,
            label: "Adress",
            content: "100 rue de l'Avenue, 75 001 Paris",
            confidentiality: Confidentiality.CRITICAL,
        },
    ]
}