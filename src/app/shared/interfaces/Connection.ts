export interface Connection {
    id: number;
    userConnectWithId: number;
    userConnectedId: number;
    fullname: string;
    bio: string;
    picture: string;
    accepted: boolean;
    // sender?: any; 
    // receiverId?: number;
    // createdAt?: string;
}

export interface ConnectionRequest {
    id?: number;
    senderId: number;
    receiverId: number;
    accepted?: boolean;
    createdAt?: string;
}
