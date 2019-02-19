export enum DayPeriod {
    AM = "AM",
    PM = "PM"
}

export interface IWhenInput {
    [fieldName: string]: string;

    startDate: string;
    startDateError: string;

    startTime: string;
    startDayPeriod: DayPeriod;

    duration: string;
    durationError: string;
}