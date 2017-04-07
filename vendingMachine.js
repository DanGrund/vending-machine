export default class VendingMachine {
  constructor() {
    // status can be ["idle", "credited", "vending", "not enough"]
    this.state = {
      status: 'idle',
      credits: 0,
      change: 0,
      selection: null,
      treats: [{name: "treat", price: 75}]
    }
  }

  loadTreats(treats) {
    this.state.treats = treats
  }

  insertCredit(person, amount) {
    this.state.credits = amount;
    this.state.status = 'credited';
    person.state.credits-= amount;
  }

  checkCredits() {
    const credits = this.state.credits;
    const treatPrice = this.state.treats[0].price;

    if(credits > treatPrice) {
      this.state.status = 'vending';
      this.state.change = credits - treatPrice;
    } else {
      this.state.status = 'not enough credits';
    }
  }

  //selectTreat()

  // checkInventory()

  dispense(person) {
    const change = this.state.change;
    if (change > 0) {
      person.state.credits += change;
    }
    this.state.status = 'idle'
  }

  reset() {
    this.constructor()
  }
}
