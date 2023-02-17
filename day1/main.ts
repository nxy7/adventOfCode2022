import {readFileSync} from "fs"
const input = readFileSync("./input.txt", "utf-8")


const splitByLine = input.split("\n")
const groupByElf = ((splitByLine)=>{
  let returnArray: number[][] = []
  let currentInd = 0
  splitByLine.forEach((el, ind, arr) => {
    if (!returnArray[currentInd]) {
      returnArray.push([])
    }
    if (el == ""){
      currentInd++
      return
    }
    let elAsNumber = Number(el)
    returnArray[currentInd].push(elAsNumber)
  })
  return returnArray
})(splitByLine)

const totalCalByElf = groupByElf.map((el)=>{
  return el.reduce((prev,curr)=>{
    return prev+curr
  })
})

const sorted = totalCalByElf.sort((a, b) => b-a)

console.log(sorted[0])

const topThree = sorted[0] + sorted[1] + sorted[2]

console.log(topThree)
