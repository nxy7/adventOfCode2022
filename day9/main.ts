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


let head: Position = {
  x: 0, y: 0
}
let tail: Position = {
  x: 0, y: 0
}

let visited: Position[] = [{ x: 0, y: 0 }]
const addVisited = (position: Position) => {
  let isPresent = visited.find(e => (e.x == position.x && e.y == position.y))
  if (!isPresent) {
    visited.push({x: position.x, y:position.y})
  }
}


const moveHead = (move: Position) => {
  while (move.x != 0 || move.y != 0) {
    if (move.x != 0) {
      if (move.x > 0) {
        move.x--
        head.x--
      }
      else {
        move.x++
        head.x++
      }
    }
    if (move.y != 0) {
      if (move.y > 0) {
        move.y--
        head.y--
      }
      else {
        move.y++
        head.y++
      }
    }

    let [xDif, yDif] = [(head.x - tail.x), (head.y - tail.y)]
    if (xDif > 1) {
      tail.y = head.y
      tail.x = head.x - 1
    } else if (xDif < -1) {
      tail.y = head.y
      tail.x = head.x + 1
    }
    if (yDif > 1) {
      tail.y = head.y - 1
      tail.x = head.x
    } else if (yDif < -1) {
      tail.y = head.y + 1
      tail.x = head.x
    }
    addVisited(tail)
    // console.log(visited)
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
  moveHead(movePosition)
})

let visitedCount = visited.length

const answer = {
  first: visitedCount
}

console.log(answer)
