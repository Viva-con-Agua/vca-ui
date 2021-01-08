export default class Money {

  static getData (amount) {
    const money = amount.amount.toString()
    if (money.length === 0) {
        return { unit: 0, subunit: 0 }
    } else if(money.length === 1) {
      return { unit: 0, subunit: money  }
    } else if (money.length === 2) {
      return { unit: 0, subunit: money  }
    } else {
      const euro = money.substring(0, money.length - 2)
      const cents = money.substring(money.length - 2, money.length)
      return { unit: euro, subunit: cents  }
    }
  }

  static getValue (data) {

    var unit = data.unit
    if(data.unit == 0) {
      unit = ''
    } else {
      unit = unit - 0
    }

    var subunit = data.subunit
    if(subunit == 0 || subunit.length == 0) {
      subunit = '00'
    } else if(subunit.length == 1) {
      subunit = subunit + '0'
    }

    if (unit == '') {
      subunit = subunit - 0
    }

    return unit + '' + subunit
  }

  static getString (amount, currency) {
    if (currency === 'EUR') {
      return this.convertDE(amount) + ' €'
    } else if (currency === 'USD') {
      return this.convertEN(amount) + ' $'
    } else if (currency === 'CHF') {
      return 'Fr. ' + this.convertDE(amount)
    }
  }

  static convertDE (amount) {
    const money = amount.toString()
    console.log(money)
    if (money.length === 0) {
        return '0,00'
    } else if(money.length === 1) {
      return '0,0' + money
    } else if (money.length === 2) {
      return '0,' + money
    } else {
      const euro = money.substring(0, money.length - 2)
      const cents = money.substring(money.length - 2, money.length)
      return euro.replace(/(\d)(?=(\d{3})+?$)/g, '$1.') + ',' + cents
    }
  }

  static convertEN (amount) {
    const money = amount.toString()
    if (money.length === 1) {
      return '0.0' + money
    } else if (money.length === 2) {
      return '0.' + money
    } else {
      const euro = money.substring(0, money.length - 2)
      const cents = money.substring(money.length - 2, money.length)
      return euro.replace(/(\d)(?=(\d{3})+?$)/g, '$1,') + '.' + cents
    }
  }

  static getPayPalString (amount) {
    const money = amount.toString()
    if (money.length === 1) {
      return '0.0' + money
    } else if (money.length === 2) {
      return '0.' + money
    } else {
      const euro = money.substring(0, money.length - 2)
      const cents = money.substring(money.length - 2, money.length)
      return euro + '.' + cents
    }
  }
}
