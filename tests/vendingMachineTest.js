require('babel-core/register')({ignore: /node_modules\/(?!ProjectB)/});
const assert = require('chai').assert
const VendingMachine = require('../vendingMachine').default;
const Person = require('../person').default
const Treat = require('../treat').default

describe('Vending Machine', () => {

  const vendingMachine = new VendingMachine()
  const dan = new Person()

  afterEach(() => {
    vendingMachine.reset();
    dan.reset()
  });

  it('is instantiated with properties for status, credits, change, selection, & treats', () => {
    assert.equal(vendingMachine.state.status, 'idle')
    assert.equal(vendingMachine.state.credits, 0)
    assert.equal(vendingMachine.state.change, 0)
    assert.equal(vendingMachine.state.selection, null)
    assert.deepEqual(vendingMachine.state.treats, [{ name: 'treat', price: 75 }])
  })

  it('will accept currency', () => {
    assert.equal(vendingMachine.state.status, 'idle')
    assert.equal(dan.state.credits, 500)
    vendingMachine.insertCredit(dan, 100)
    assert.equal(vendingMachine.state.status, 'credited')
    assert.equal(vendingMachine.state.credits, 100)
    assert.equal(vendingMachine.state.change, 0)
    assert.equal(dan.state.credits, 400)
  });

  it('will validate that the amount of inserted credits is sufficient for selection', ()=> {
    vendingMachine.insertCredit(dan, 100)
    assert.equal(vendingMachine.state.status, 'credited')
    vendingMachine.checkCredits()
    assert.equal(vendingMachine.state.status, 'vending')
    assert.equal(vendingMachine.state.change, 25)
  })

  it('will return a message if there aren\'t enough credits for selection', ()=> {
    vendingMachine.insertCredit(dan, 50)
    assert.equal(vendingMachine.state.status, 'credited')
    vendingMachine.checkCredits()
    assert.equal(vendingMachine.state.status, 'not enough credits')
  })

  it('will dispense change to a person', ()=> {
    console.log(dan.state.credits)
    vendingMachine.insertCredit(dan, 100)
    console.log(dan.state.credits)
    vendingMachine.checkCredits()
    vendingMachine.dispense(dan)
    assert.equal(dan.state.credits, 425)
  })

});

describe('Treat', () => {
  const treat = new Treat('marlboro', 500, 10)

  it('is instantiated with properties for name, price, and quantity', () => {
    assert.equal(treat.state.name, 'marlboro')
    assert.equal(treat.state.price, 500)
    assert.equal(treat.state.quantity, 10)
  })
})

describe('Person', () => {
  const dan = new Person()

  afterEach(() => {
    dan.reset()
  });

  it('is instantiated with a property for credit', () => {
    assert.equal(dan.state.credits, 500)
  })

  it('can borrow money from mom',() => {
    assert.equal(dan.state.credits, 500)
    dan.begMomForMoney()
    assert.equal(dan.state.credits, 1000)
  })
})
