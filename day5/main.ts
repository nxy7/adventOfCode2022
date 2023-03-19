import * as fs from "node:fs"
const input: string = fs.readFileSync("./input.txt", "utf-8")
const inputByLine: string[] = input.split("\n")
type stack = string[]

const stackNumRegexp = / ( *\d *)+ /gm

const stackNumbersLine = inputByLine.findIndex(e => stackNumRegexp.test(e))
const stackRows = inputByLine.slice(0, stackNumbersLine).map((e) => {
  const stackRegexp = /\[(\w)\]| ( )  /gm
  const regexpIter = e.matchAll(stackRegexp)


  return Array.from(regexpIter).map(el => el[1])
}).map(e => e)
const stacks = stackRows.reverse()[0].map((_, ind) => stackRows.map(el => el[ind])).map(col => col.filter(e => e != undefined))
// console.log(stacks)

type instruction = {
  from: number
  to: number
  amount: number
}
const instructions: instruction[] = inputByLine.filter(line => /move (\d+) from (\d+) to (\d+)/gm.test(line)).map((line) => {
  const instructionsRegexp = /move (\d+) from (\d+) to (\d+)/gm
  const groups = Array.from(line.matchAll(instructionsRegexp)).at(0)?.slice(1)
  if (!groups) {
    // console.log("unexpected instruction format")
    process.abort()
  }
  let instruction: instruction = {
    amount: Number(groups[0]),
    from: Number(groups[1]) - 1,
    to: Number(groups[2]) - 1
  }

  return instruction
}).filter(e => e != undefined)

const stacksB: stack[]= JSON.parse(JSON.stringify(stacks));
instructions.forEach((instruction, ind)=> {
  try {

    for (let k = 0; k< instruction.amount; k++) {
    let item = stacks[instruction.from].pop()!
    stacks[instruction.to].push(item)
            
    }
    if (ind < 4) {
      // console.log("Step ", ind+1)
    // console.log(stacks)
    }

  } catch (e) {
    // console.log(instruction)
    // console.log(stacks)
    // console.log(e)
    process.abort()
  }
})
instructions.forEach((instruction, ind)=> {
  try {

    let items = stacksB[instruction.from].splice(stacksB[instruction.from].length - instruction.amount)
    stacksB[instruction.to].push(...items)
    if (ind < 4) {
      // console.log("Step ", ind+1)
    // console.log(stacksB)
    }

  } catch (e) {
    // console.log(instruction)
    // console.log(stacksB)
    // console.log(e)
    process.abort()
  }
})


// console.log(stacks)
let ret = ""
stacks.forEach(e => {
  ret += e[e.length - 1]
})

let retB= ""
stacksB.forEach(e => {
  retB+= e[e.length - 1]
})

const answer = {
  first: ret,
  second: retB
}

console.log(answer)
// const stacks: stack[] = input.split("\n").slice(0, 8)
