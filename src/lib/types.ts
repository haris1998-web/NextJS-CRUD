export interface ItemCreate {
    name: string;
    description?: string;
    quantity: number;
}

export interface ItemUpdate {
    id: number;
    name?: string;
    description?: string;
    quantity?: number;
}

export interface ItemDelete {
    id: number;
}