class Person {
  constructor(name) {
    this.state = {
      name: name,
      credits: 500,
      treats: []
    }
  }

  begMomForMoney() {
    this.state.credits += 500;
  }

  reset() {
    this.constructor()
  }
}

if(typeof module !== 'undefined') {
  module.exports.default = Person
}
