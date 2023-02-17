import { readFileSync } from 'fs'

const input = readFileSync("./input.txt", "utf-8").trimEnd()
const splitOnLine = input.split("\n").map(el => el.trimEnd())

const rock = ["A", "X"]
const paper = ["B", "Y"]
const scissors = ["C", "Z"]

type Symbol = "R" | "P" | "S"

console.log(splitOnLine)
const roundsA: Symbol[][] = splitOnLine.map((line, lineInd) => {
  const symbols: Symbol[] = line.split(" ").map((el, ind) => {
    if (rock.includes(el))
      return "R"
    if (paper.includes(el))
      return "P"
    if (scissors.includes(el))
      return "S"

    console.log("UNEXPECTED ITEM", lineInd, el)
    process.exit()
  })
  return symbols
}
)
const roundsB: Symbol[][] = splitOnLine.map((line, lineInd) => {
  const split = line.split(" ")
  const [opponent, outcome] = [split[0], split[1]]

  const opponentSymbol = opponent == "A" ? "R" : opponent == "B" ? "P" : "S"
  let playerSymbol: Symbol
  if (outcome == "X"){
    playerSymbol = opponentSymbol == "R" ? "S" : opponentSymbol == "P" ? "R" : "P"
  } else if (outcome == "Y") {
    playerSymbol = opponentSymbol
  } else {    
    playerSymbol = opponentSymbol == "R" ? "P" : opponentSymbol == "P" ? "S" : "R"
  }
  return [opponentSymbol, playerSymbol]
}
)

const calculateRoundScore = (opponent: Symbol, player: Symbol) => {
  let score = 0
  if (opponent == player)
    score += 3
  else if (opponent == "R" && player == "P" || opponent == "P" && player == "S" || opponent == "S" && player == "R")
    score += 6

  if (player == "R")
    score += 1
  else if (player == "P")
    score += 2
  else 
    score += 3

  return score
}

const scoresA = roundsA.map((el) => {
  return calculateRoundScore(el[0], el[1])
})

const totalScoreA = scoresA.reduce((p, c) => p+c)
const scoresB = roundsB.map((el) => {
  return calculateRoundScore(el[0], el[1])
})

const totalScoreB = scoresB.reduce((p, c) => p+c)

console.log(totalScoreA)
console.log(totalScoreB)
