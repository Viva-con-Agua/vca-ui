export default class Distance {
    constructor() {}
    

    static getData(distance) {
        var distance_data = {
            km : 0,
            meter: 0
        }

        var x = distance % 1000
        distance_data.meter = x
        x = distance - x

        distance_data.km = x / 1000
        return distance_data
    }
    static getValue(distance_data) {
        var km = parseInt(distance_data.km) * 1000
        var meter = parseInt(distance_data.meter)
        return km + meter
    }
    static getString(meter) {
        let distance = meter.toString()
        if (distance.length <= 2) {
            return "0,0 km"
        }
        let km = distance.substring(0, distance.length -3)
        let m = distance.substring(distance.length -3, distance.length -2)
        return km + ',' + m  + " km"
    }
}
