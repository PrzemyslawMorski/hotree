export interface NewEventDto {
    title: string;
    description: string;
    categoryId: number;
    paidEvent: boolean;
    eventFee: number;
    reward: number;
    date: string;
    duration: number;
    coordinator: CoordinatorDto;
}

export interface CoordinatorDto {
    email: string;
    id: string;
}