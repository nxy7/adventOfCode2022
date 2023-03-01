import * as fs from "fs"
const inputByLine: string[] = fs.readFileSync("./input.txt", "utf-8").trim().split("\n")
type Movement = {
  type: "U" | "D" | "L" | "R",
  amount: number
}

const movements = inputByLine.map(e => {
  let split = e.split(" ")
  return {
    type: split[0],
    amount: Number(split[1])
  } as Movement
})

type Position = {
  x: number,
  y: number,
}

type Cell = {
  wasVisited: boolean,
}

let head: Position = {
  x: 0, y: 0
}
let tail: Position = {
  x: 0, y: 0
}

let map: Cell[][] = []

