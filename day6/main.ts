import * as fs from "fs"
const input = fs.readFileSync("./input.txt", "utf-8").trim().split("")

const firstMarker = input.findIndex((_, ind, arr) => {
  const currSlice = arr.slice(ind, ind+4)
  let charMap = new Map<string, boolean>()
  currSlice.forEach(char => {
    charMap.set(char, true)
  })
  let keys = Array.from(charMap.keys())

  return keys.length == 4
})+4
const secondMarker= input.findIndex((_, ind, arr) => {
  const currSlice = arr.slice(ind, ind+14)
  let charMap = new Map<string, boolean>()
  currSlice.forEach(char => {
    charMap.set(char, true)
  })
  let keys = Array.from(charMap.keys())

  return keys.length == 14
})+14

console.log(firstMarker, secondMarker)



