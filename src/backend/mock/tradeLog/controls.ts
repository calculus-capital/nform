import moment from 'moment';
import { getRandomArbitrary, getRandomInt } from '../random';

// company
export const established = new Date(2019, 5, 1)

// Trade
export const ntraders = getRandomInt(5, 15)

export const tradeStart = 3

export const growth = (ntraders - tradeStart) / moment().diff(moment(established), 'months')
export const growthBias = 0.1
export const margin = getRandomArbitrary(10, 30)/100
export const averagePrice = 1000
export const averageQuantity = 50

// payment terms proportions
export const paymentTermsDelay = [0.4, 0.8]

// OPEX
export const awsCosts = getRandomInt(10000, 20000)
export const awsCostsInc = ():number => getRandomArbitrary(-5, 15) / 100

export const salaryStart = getRandomInt(1000000, 2000000)
export const salaryInc = ():number => getRandomArbitrary(-5, 10) / 100

// CAPEX
export const otherFixedCosts = 100000
export const otherFixedCostsInc = ():number => getRandomArbitrary(-5, 10) / 100

export const averageDelay = 1
export const earlyPayments = 0.2

// Assets
// funding rounds
// 2-3 mil
export const seed = getRandomArbitrary(2000000 * 70, 3000000 * 70)
// 10-20 nil
export const seriesA = getRandomArbitrary(10000000 * 70, 20000000 * 70)
// 50 - 100 mil
export const seriesB = getRandomArbitrary(50000000 * 70, 100000000 * 70)

export const stage = seed
export const bankBalance = stage

// Credit
export const nlenders = getRandomInt(1, 5)
export const averageCreditLine = getRandomInt(10, 50)
export const WACC = getRandomArbitrary(14, 18)

