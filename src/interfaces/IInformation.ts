export enum Confidentiality {
    MAXIMUM = "MAXIMUM",
    CRITICAL = "CRITICAL",
    MIDDLING = "MIDDLING",
    MINIMUM = "MINIMUM"
}

export enum ConfidentialityColorByLevel {
    MAXIMUM = "#181717", //Noir
    CRITICAL = '#d70029', //Rouge
    MIDDLING = '#f89610', //Orange
    MINIMUM = '#7cc20a', //Vert
}


export interface IInformation {
    id: number
    label: string
    content: string
    confidentiality: Confidentiality
}

export interface IFriendData {
    id: number,
    label: string,
    content: string
}