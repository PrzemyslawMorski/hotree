import {DayPeriod} from "../events/new-event/when/WhenInput";

export function format12hDate(startDate: string, startTime: string = "00:00", startDayPeriod: DayPeriod = DayPeriod.PM): string {
    const yearMonthDay = startDate.split("-");
    if (yearMonthDay.length !== 3) {
        return startDate;
    }

    if (startTime === "") {
        startTime = "00:00";
    }

    const hourMinute = startTime.split(":");
    if (hourMinute.length !== 2) {
        return startDate;
    }

    let hourAsNum = Number(hourMinute[0]);

    if (Number.isNaN(Number(yearMonthDay[0])) || Number.isNaN(Number(yearMonthDay[1])) || Number.isNaN(Number(yearMonthDay[2])) ||
        Number.isNaN(hourAsNum) || Number.isNaN(Number(hourMinute[1]))) {
        return startDate;
    }

    if (hourAsNum >= 13 || hourAsNum === 0) {
        // time is in 24h format
        return `${startDate}T${startTime}`
    }

    // time is in 12h format
    if (startDayPeriod === DayPeriod.PM) {
        hourAsNum += 12;
    }

    const time = hourAsNum.toString() + hourMinute[1];
    return `${startDate}T${time}`;
}


export function numCharsInText(text: string): number {
    // count all chars except whitespace
    return text.replace(" ", "").length;
}