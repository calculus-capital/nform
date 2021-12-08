
export function getRandomArbitrary(min:number, max:number):number {
  return Math.random() * (max - min) + min
}

export function getRandomInt(min:number, max:number):number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

export function getRandomString(length:number):string {
  var result           = ''
  const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const charactersLength = characters.length

  for (var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
 return result
}

export function getRandomDate(start:Date, end:Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export function getRandomBoolean():boolean { return Math.random() < 0.5 }
