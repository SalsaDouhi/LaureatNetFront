export interface Block {
    id: number;
    fullname: string;
    // blockerId: string;
    // blockedId?: number; 
    createdAt?: string;
}

export interface BlockBody {
    blockerId: number;
    blockedId: number; 
}