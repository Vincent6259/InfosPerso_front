export interface GroupCardInterface {
    id: number;
    name: string;
    description: string;
    creator_id: number;
}

export interface GroupCreateInterface {
    name: string
    description: string
    invitedMembers: number[]
    sharedData: number[]
}

export interface GroupDetails extends GroupCardInterface {
    group_permissions: string[]
}