import moment from 'moment';
import { Trade } from '.';
import { getRandomArbitrary, getRandomInt } from '../random';

declare global {
  interface Window {
    established       : Date
    ntraders          : number
    tradeStart        : number
    growth            : number
    growthBias        : number
    margin            : number
    averagePrice      : number
    averageQuantity   : number
    minDelay          : number
    maxDelay          : number
    paymentTermsDelay : number[]
    awsCosts          : number
    awsCostsInc       : () => number
    salaryStart       : number
    salaryInc         : () => number
    otherFixedCosts   : number
    otherFixedCostsInc: () => number
    averageDelay      : number
    earlyPayments     : number
    stage             : string
    bankBalance       : number
    nlenders          : number
    WACC              : number
    seed              : number
    seriesA           : number
    seriesB           : number
    dirty             : boolean
    origLog           : Trade[]
  }
}

// company
window.established = new Date(2019, 5, 1)

// Trade
window.ntraders = getRandomInt(5, 15)

window.tradeStart = 3

window.growth = (window.ntraders - window.tradeStart) / moment().diff(moment(window.established), 'months')
window.growthBias = 0.1
window.margin = getRandomArbitrary(10, 30)/100
window.averagePrice = 1000
window.averageQuantity = 50

// payment terms proportions
window.paymentTermsDelay = [0.4, 0.8]

// OPEX
window.awsCosts = getRandomInt(10000, 20000)
window.awsCostsInc = ():number => getRandomArbitrary(-5, 15) / 100

window.salaryStart = getRandomInt(1000000, 2000000)
window.salaryInc = ():number => getRandomArbitrary(-5, 10) / 100

// CAPEX
window.otherFixedCosts = 100000
window.otherFixedCostsInc = ():number => getRandomArbitrary(-5, 10) / 100

window.averageDelay = 1
window.earlyPayments = 0.5

// Assets
// funding rounds
// 2-3 mil
window.seed = getRandomArbitrary(2000000 * 70, 3000000 * 70)
// 10-20 nil
window.seriesA = getRandomArbitrary(10000000 * 70, 20000000 * 70)
// 50 - 100 mil
window.seriesB = getRandomArbitrary(50000000 * 70, 100000000 * 70)

window.stage = "seed"
window.bankBalance = window.seed

// Credit
window.nlenders = getRandomInt(1, 5)
// TODO: calculate
window.WACC = getRandomArbitrary(12, 16)
