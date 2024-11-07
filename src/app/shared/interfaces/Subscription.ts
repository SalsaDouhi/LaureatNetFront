export interface Subscription {
    id: number;
    accepted: boolean;
    subscriberId?: number; 
    subscribedToId?: number;
    fullname: string;
    bio: string;
    picture: string;
    createdAt?: string;
}

export interface SubscriptionRequest {
    id?: number;
    subscriberId: number;
    subscribedToId: number;
    accepted?: boolean;
    createdAt?: string;
}
