const vender = new VendingMachine()
const lilJimmy = new Person("lil Jimmy")
let reds = new Treat('Marlboros', 500, 20)
let blues = new Treat('Spirits', 400, 20)
let golds = new Treat('Coors', 100, 20)
let blacks = new Treat('Trojans', 75, 20)
let magentas = new Treat('Hugs', 0, 4)

vender.loadMachine([reds,blues,golds,blacks, magentas])

$('document').ready(() => {
  reRender()
})

const renderVender = () => {
  $('#treats').empty()
  vender.state.treats.forEach((treat) => {
    $('#treats').append(
      `<div class="treat">
        <button class='selection' value="${treat.name}">select</button>
        <div class="treat-name">${treat.name}</div>
        <div class="treat-price">${treat.price}   credits</div>
        <div class="treat-quant">${treat.quantity}</div>
      </div>`
    )
  })
  $('#display').text(vender.state.status)
  $('#inserted-credits').text(`${vender.state.credits} credits inserted`)
}

const renderPerson = () => {
  $('#name').text(`hello ${lilJimmy.state.name}`)
  $('#person-credits').text(` ${lilJimmy.state.credits} credits`)
  $('#person-treats').empty()

  let treatCount = lilJimmy.state.treats.reduce((obj, value) => {
    if (obj[value]) {
      obj[value]++
    } else {
      obj[value]=1
    }
    return obj
  },{})
  console.log(treatCount)
  Object.keys(treatCount).forEach((treat) => {
    $('#person-treats').append(`<div class='personal-treats'>${treatCount[treat]} ${treat}</div>`)
  })
}

const reRender = ()=>{
  renderVender()
  renderPerson()
}

$('#beg').on('click', ()=>{
  lilJimmy.begMomForMoney()
  renderPerson()
})

$('#quarter').on('click', ()=> {
  vender.insertCredit(lilJimmy, 25)
  reRender()
})

$('#dollar').on('click', () => {
  vender.insertCredit(lilJimmy, 100)
  reRender()
})

$("#vending-machine").on("click", ".selection", (e)=> {
  let selection = e.target.value
  vender.selectTreat(selection, lilJimmy)
  reRender()
});
