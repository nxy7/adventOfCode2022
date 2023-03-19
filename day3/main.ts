import * as fs from "node:fs"
const input: string = fs.readFileSync("./input.txt", "utf-8")

const inputByLine = input.split("\n")
type Rucksack = {
  firstHalf: Map<string, number>
  secondHalf: Map<string, number>
}

const itemValue = (char: string) => {
      let asciiValue = char.charCodeAt(0)
      if(asciiValue >=97)
        return asciiValue-96
      return asciiValue-64+26
}

const rucksackCommonItemValue = (rucksack: Rucksack) => {
  const iterator = rucksack.firstHalf.entries() 

  let currentElement = iterator.next()
  while(!currentElement.done){
    let key = currentElement.value[0]
    let commonElement = rucksack.secondHalf.get(key)
    if (commonElement){
      return itemValue(currentElement.value[0])
    }


    currentElement = iterator.next()
  }
  
  return 0
}

const rucksacks: Rucksack[]= inputByLine.map((line)=>{
  const lineWidth = line.length
  const firstLineHalf = line.substring(0, lineWidth/2).split("")
  const secondLineHalf = line.substring(lineWidth/2, lineWidth).split("")
  let newRucksack = {
    firstHalf: new Map<string, number>(),
    secondHalf: new Map<string, number>(),
  }

  const elementToMap=(el: string, map: Map<string, number>) => {
    let mapEl = map.get(el)
    if (!mapEl){
      map.set(el, 1)
      return
    }
    map.set(el, mapEl++)
  }
  firstLineHalf.forEach((el) => {
      elementToMap(el, newRucksack.firstHalf)
  })
  secondLineHalf.forEach((el) => {
      elementToMap(el, newRucksack.secondHalf)
  })
    
  return newRucksack
})

let answerA = 0
rucksacks.forEach((el) => {
  answerA += rucksackCommonItemValue(el)
})

// console.log(answerA)


let elfGroups: Rucksack[][] = []
for (let z = 0; z < rucksacks.length; z++){
  let mod = z%3
  let arrInd = (z-mod)/3

  let group = elfGroups[arrInd]
  if (group) {
    group.push(rucksacks[z])
    continue
  }
  elfGroups[arrInd] = [rucksacks[z]]
}


const commonItem = (rucksacks: Rucksack[]): string | void => {
  let allItemsMap = new Map<string, number>()
  rucksacks.forEach((el) => {
    let keysArr = [Array.from(el.firstHalf.keys()), Array.from(el.secondHalf.keys())]
    let flatKeysArr = keysArr.flat()
    let withoutDuplicates = [...new Set(flatKeysArr)]
    
    withoutDuplicates.forEach((x) => {
      let allItemsMapVal = allItemsMap.get(x)
      if (!allItemsMapVal){
        allItemsMap.set(x, 1)
        return        
      }
      allItemsMap.set(x, allItemsMapVal+1)
    }) 
  })
  let itemsArr = Array.from(allItemsMap.entries())  
  for (const i of itemsArr){
    let key = i[0]
    let count = i[1]
    if (count >= 3) {
      return key 
    }
  }
}

let answerB = 0
let badgesValues = elfGroups.forEach((group) => {
  const item = commonItem(group)
  if (!item) {
    // console.log("No common value for", group)
    return
  }
  answerB += itemValue(item)
})
const answer = {
  first: answerA,
  second: answerB
}
console.log(answer)
