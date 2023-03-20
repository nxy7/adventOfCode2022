import * as fs from "node:fs"
const inputByLine: string[] = fs.readFileSync("./input.txt", "utf-8").trim().split("\n")

type Command = {type: "noop"} | {type: "addx", value: number}
const commands: Command[] = inputByLine.map(line => {
  if (line.startsWith("noop")) {
    return {type: "noop"}
  } else {
    let split = line.split(" ")
    return {
      type: "addx",
      value: Number(split[1])
    }
  }
})

let cycles: number[] = [1]
const getLatestCycleValue = () => {
  return cycles[cycles.length-1] ?? 1
}
const sumCyclesValues = (indexes: number[]) => {
  let sum = 0
  indexes.forEach(i => sum += (i * cycles[i-1]))
  return sum
}

commands.forEach(cmd => {
  if (cmd.type == "noop") {
    cycles.push(getLatestCycleValue())
  } else {
    cycles.push(getLatestCycleValue())
    cycles.push(getLatestCycleValue()+cmd.value)
  }
})

const sum = sumCyclesValues([20, 60, 100, 140, 180, 220])

const crtCycles: number[][] = []
while(cycles.length>=40){
  crtCycles.push(cycles.splice(0,40))
}

let crtImg = ""
crtCycles.forEach(cycleArr => {
  cycleArr.forEach((cmd, ind)=>{
    if(Math.abs(cmd-ind) < 2) {
      crtImg+="#"
    } else {
      crtImg+="."
    }
  })
  crtImg+="\n"
})


const answer = {
  first: sum,
  second: crtImg
}
console.log(answer.first)
console.log(answer.second)
