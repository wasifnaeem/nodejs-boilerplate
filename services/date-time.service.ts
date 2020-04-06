export class DateTime {

    constructor(private date?: Date) {
    }

    isEqual(date: Date): boolean {
        let date1 = new Date(date)
        let date2 = new Date(this.date)

        if (date1.getDay() == date2.getDay()
            && date1.getMonth() == date2.getMonth()
            && date1.getFullYear() == date2.getFullYear()
            && date1.getSeconds() == date2.getSeconds()
            && date1.getMinutes() == date2.getMinutes()
            && date1.getHours() == date2.getHours())
            return true
        else
            return false
    }
}