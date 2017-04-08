class VendingMachine {
  constructor() {
    this.state = {
      status: 'idle',
      credits: 0,
      change: 0,
      selection: null,
      treats: []
    }
  }

  loadMachine (treats) {
    this.state.treats = treats
  }

  insertCredit (person, amount) {
    if (person.state.credits >= amount) {
      this.state.credits += amount;
      this.state.status = 'credited';
      person.state.credits-= amount;
    }
  }

  selectTreat (selection, person) {
    const newSelection = this.state.treats.filter((treat) => {
      return treat.name === selection
    })
    this.state.selection = newSelection
    this.checkCredits(person)
  }

  checkCredits (person) {
    const credits = this.state.credits;
    const treatPrice = this.state.selection[0].price;
    if(credits >= treatPrice) {
      this.state.status = 'vending';
      this.state.change = credits - treatPrice;
      this.checkInventory(person)
    } else {
      this.state.status = 'not enough credits';
    }
  }

  checkInventory (person) {
    let inventory = this.state.selection[0].quantity
    if (inventory > 0) {
      this.state.selection[0].quantity -= 1;
      this.dispense(person)
    } else {
      this.state.status = 'out of stock'
    }
  }

  dispense (person) {
    const change = this.state.change;
    if (change > 0) {
      person.state.credits += change;
    }
    this.state.credits = 0;
    this.state.status = 'idle'
    person.state.treats.push(this.state.selection[0].name)
    this.state.selection = null;
  }

  reset() {
    this.constructor()
  }
}


if(typeof module !== 'undefined') {
  module.exports.default = VendingMachine
}
