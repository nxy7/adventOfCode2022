import * as fs from "node:fs"
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

let knotsA: Position[] = []
let knotsB: Position[] = []

for (let i = 0; i < 2; i++)
  knotsA.push({ x: 0, y: 0 })
for (let i = 0; i < 10; i++)
  knotsB.push({ x: 0, y: 0 })


let visitedA: Position[] = []
let visitedB: Position[] = []
const addVisited = (position: Position, targetArr: Position[]) => {
  let isPresent = targetArr.find(e => (e.x == position.x && e.y == position.y))
  if (!isPresent) {
    targetArr.push({ x: position.x, y: position.y })
    // console.log({ x: position.x, y: position.y })
  }
}


const moveKnots = (move: Position, knots: Position[], targetArr: Position[]) => {
  while (move.x != 0 || move.y != 0) {
    if (move.x != 0) {
      if (move.x > 0) {
        move.x--
        knots[0].x++
      }
      else {
        move.x++
        knots[0].x--
      }
    }
    if (move.y != 0) {
      if (move.y > 0) {
        move.y--
        knots[0].y++
      }
      else {
        move.y++
        knots[0].y--
      }
    }

    for (let i = 1; i < knots.length; i++) {
      let [kA, kB] = [knots[i - 1], knots[i]]
      let [xDif, yDif] = [(kA.x - kB.x), (kA.y - kB.y)]
      let [xDist, yDist] = [Math.abs(xDif), Math.abs(yDif)]
      if (xDist > 1 || (xDist > 0 && yDist > 1)){
      kB.x += 1 * (xDist/xDif)
      }

      if(yDist > 1 || (yDist > 0 && xDist > 1)) {
      kB.y += 1 * (yDist/yDif)
      }

      if (i == knots.length - 1)
        addVisited(knots[knots.length - 1], targetArr)

    }
  }
}

movements.forEach(mvm => {
  let movePosition = { x: 0, y: 0 }
  switch (mvm.type) {
    case 'U':
      movePosition.y = mvm.amount
      break
    case 'D':
      movePosition.y = -mvm.amount
      break
    case 'L':
      movePosition.x = -mvm.amount
      break
    case 'R':
      movePosition.x = mvm.amount
      break
  }
  moveKnots({ ...movePosition }, knotsB, visitedB)
  moveKnots({ ...movePosition }, knotsA, visitedA)
})

const answer = {
  first: visitedA.length,
  second: visitedB.length
}

console.log(answer)
