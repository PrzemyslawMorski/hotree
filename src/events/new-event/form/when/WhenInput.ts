enum DayPeriod {
    AM,
    PM
}

export interface IWhenInput {
    startDate: string;
    startHour: string;
    startDayPeriod: DayPeriod;
    email: string;
    duration: number;
}