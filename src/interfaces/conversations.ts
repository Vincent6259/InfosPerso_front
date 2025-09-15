export enum ConversationType {
    FRIEND = "friend",
    GROUP = "group"
}

export interface Conversation {
    type: ConversationType
    id: number
    name: string
}