export interface IAboutInput {
    [fieldName: string]: string;

    title: string;
    titleError: string;

    description: string;
    descriptionError: string;

    categoryId: string;

    paymentType: PaymentType;

    eventFee: string;
    eventFeeError: string;

    reward: string;
}

export enum PaymentType {
    FreeEvent = "free",
    PaidEvent = "paid"
}