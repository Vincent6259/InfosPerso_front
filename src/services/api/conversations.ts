import { Conversation, ConversationType } from "../../interfaces/conversations"

export const getConversations = async(): Promise<Conversation[]> => {
    return [
        {
            type: ConversationType.FRIEND,
            name: "Ami",
            id: 2
        },
        {
            type: ConversationType.GROUP,
            name: "Groupe",
            id: 2
        },
        {
            type: ConversationType.GROUP,
            name: "Groupe Mariage",
            id: 4
        },
        {
            type: ConversationType.FRIEND,
            name: "Ami 3",
            id: 3
        },
    ]
}