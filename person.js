export default class Person {
  constructor() {
    this.state = {
      credits: 500
    }
  }

  
  reset() {
    this.constructor()
  }
}
