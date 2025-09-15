import { Message } from "../../interfaces/messages"


export const getMessages = async(): Promise<Message[]> => {
    return [
        {
            id: 1,
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            author_id: 2,
            author_name: "Lui",
        },
        {
            id: 2,
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            author_id: 1,
            author_name: "Moi",
        },
        {
            id: 3,
            content: "Lorem ipsum dolor sit amet",
            author_id: 2,
            author_name: "Lui",
        },
        {
            id: 4,
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            author_id: 1,
            author_name: "Moi",
        },
        {
            id: 5,
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            author_id: 2,
            author_name: "Lui",
        },
    ]
}