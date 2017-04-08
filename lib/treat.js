class Treat {
  constructor(name, price, quantity) {
    this.name = name
    this.price = price
    this.quantity = quantity
  }
}

if(typeof module !== 'undefined') {
  module.exports.default = Treat
}
