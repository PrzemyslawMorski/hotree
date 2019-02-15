export interface IAboutInput {
    [fieldName: string]: string;

    title: string;
    titleError: string;

    description: string;
    descriptionError: string;

    category: string;

    paymentType: string;

    paymentFee: string;
    paymentFeeError: string;

    reward: string;
}