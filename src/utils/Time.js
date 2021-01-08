export default class Time {
    constructor() {}

    static getString(time) {

        var seconds = time % 60
        var x = time
        x = x - seconds
        x = x /60
        var minutes = x % 60
        x = x - minutes
        var hours = x / 60
        if (minutes < 10 ) {
            minutes = "0" + minutes
        }
        if (seconds < 10 ) {
            seconds = "0" + seconds
        }


        return hours + ":" + minutes + ":" + seconds
    }
    
    static getTimeDate(time) {
           var time_data = {
                hours: "00",
                minutes: "00",
                seconds: "00"
            }
        var seconds = time % 60
        var x = time
        x = x - seconds
        x = x /60
        var minutes = x % 60
        x = x - minutes
        var hours = x / 60
        time_data.minutes = this.validate(minutes)
        time_data.hours = this.validate(hours)
        time_data.seconds = this.validate(seconds)
        return time_data
    }

    static getValue(time_data) {
        var hours = parseInt(time_data.hours, 10) * 60 * 60
        var minutes = parseInt(time_data.minutes, 10) * 60
        return hours + minutes + parseInt(time_data.seconds, 10)
    }
    
    static validateHours(hours){
            if (hours >= 36) {
                return 36
            }
            if (hours === "") {
                return  "0"
            }
            if (hours.length >= 2 && hours[0] === "0") {
                return hours[1]
            }
            return hours
        }

    static validate(minsec) {
            if (minsec >= 59) {
                minsec = "59"
            }
            if (minsec === "" ||minsec === "0"  ) {
                return minsec = "00"
            }
            if (minsec.length >= 3 && minsec[0] === "0" ) {
                return minsec[1] + minsec[2]
            }
            if (minsec.length >= 3 && minsec[0] !== "0") {
                return  minsec[2]
            }
            if (minsec <= 9 && minsec !== 0) {
                return "0" + minsec
            }

            return minsec

    }

}
