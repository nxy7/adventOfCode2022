import * as fs from "node:fs"
const input: string = fs.readFileSync("./input.txt", "utf-8").trim()

type range = {
  start: number,
  end: number,
}

const lines = input.split("\n")
// console.log(lines.length)
const elfPairs: range[][] = lines.map((line) => {
  const strToRange = (str: string): range => {
    const startStr = str.split("-")[0]
    const endStr = str.split("-")[1]

    let range = { start: parseInt(startStr), end: parseInt(endStr) }
    return range
  }
  const elf1 = strToRange(line.split(",")[0])
  const elf2 = strToRange(line.split(",")[1])

  return [elf1, elf2]
})


const howManyContain = elfPairs
  .map(e => Number(doesContain(e[0], e[1]) || doesContain(e[1], e[0])))
  .reduce((p, c) => {
    return p += c
  }, 0)

const howManyOverlap = elfPairs
  .map(e => Number(doesOverlap(e[0], e[1]) || doesOverlap(e[1], e[0])))
  .reduce((p, c) => {
    return p += c
  }, 0)


const answer = {
  first: howManyContain,
  second: howManyOverlap
}

console.log(answer)

function doesContain(r1: range, r2: range) {
  return r1.start <= r2.start && r1.end >= r2.end
}

function doesOverlap(r1: range, r2: range) {
  return r1.start <= r2.start && r1.end >= r2.start || r1.end >= r2.end && r1.start <= r2.end || doesContain(r1, r2) 
}

