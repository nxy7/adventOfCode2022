import * as fs from "node:fs"
const inputByLine: string[] = fs.readFileSync("./input.txt", "utf-8").trim().split("\n")

const height2dMap = inputByLine.map(line => line.split("").map(cell => Number(cell)))

let isVisible2dMap = height2dMap.map((row, rowInd) => {
  return row.map((_, colInd)=> {
    let col = height2dMap.map(row => row[colInd])
    return isVisible(row, colInd) || isVisible(col, rowInd)
  })
})

function isVisible(line: number[], ind: number): boolean {
  if (ind == 0 || ind == line.length - 1)
    return true

  let treeHeight = line[ind]

  let beforeSlice = line.slice(0, ind)
  let afterSlice = line.slice(ind + 1)

  // const isVisibleFunction = (e) => e >= treeHeight
  let isVisible = beforeSlice.every(e => e < treeHeight) || afterSlice.every(e => e<treeHeight)
  // 3 1 2 3 2 1 0

  return isVisible
}

let scenicScores = height2dMap.map((row, rowInd) => {
  return row.map((_, colInd)=> {
    let col = height2dMap.map(row => row[colInd])
    let rowScores = scenicScore(row, colInd)
    let colScores = scenicScore(col, rowInd)

    let score = [...rowScores, ...colScores].reduce((p, c) => p*c)
    
    // console.log(rowScores, colScores, score)
    
    return score
  })
})

let maxScore = 0
scenicScores.forEach(row => {
  row.forEach(cell => {
    if (cell > maxScore)
      maxScore = cell
  })
})

function scenicScore(line: number[], ind: number): number[]{
  let treeHeight = line[ind]
  
  let beforeSlice = line.slice(0, ind).reverse()
  let afterSlice = line.slice(ind + 1)

  let visibleTreesAmount = (slice: number[]): number => {
    return (slice.findIndex((e) => e>=treeHeight) + 1 || slice.length || 0) 
  }
  
  return [visibleTreesAmount(beforeSlice), visibleTreesAmount(afterSlice)]
}

let visibleCount = 0
isVisible2dMap.forEach(row => row.forEach(cell => {
  if (cell) {
    visibleCount++
  }
}))
// console.log(rotatedHeight2dMap)
const answer = {
  first: visibleCount,
  second: maxScore
}
console.log(answer)
// console.log(isVisibleMap)

