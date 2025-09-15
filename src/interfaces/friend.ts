export interface FriendListInterface {
    userId: number,
    userTag: string,
    firstName? : string | null,
    lastName?: string | null,
    confidentiality_level: string
}

export interface FriendCardInterface {
    friendData: FriendListInterface
}