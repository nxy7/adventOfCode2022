import * as fs from "fs"
const inputByLine = fs.readFileSync("./input.txt", "utf-8").trim().split("\n")

type File = {
  name: string
  parent: Dir
  size: number
}

type Dir = {
  name: string
  parent: Dir | null
  content: FileDir[]
}

type FileDir = File | Dir

let rootDir: Dir = {
  name: "/",
  parent: null,
  content: []
}

let currentDir: Dir = rootDir

function addToDir(d: Dir, fileOrDir: FileDir) {
  try {
    fileOrDir.parent = d
    d.content.push(fileOrDir)

  } catch (e) {
    console.log("errrr")
    console.log(d, fileOrDir)
    process.abort()
  }
}


const createDir = (name: string) => {
  addToDir(currentDir, {
    name: name,
    parent: null,
    content: []
  })
}
const createFile = (name: string, size: number) => {
  let content = {
    name: name,
    parent: currentDir,
    size: size
  }
  addToDir(currentDir, content)
}

type CdCommand = {
  name: "cd",
  arguments: string
}

type LsCommand = {
  name: "ls",
  output: string[]
}

type Command = CdCommand | LsCommand

let commands: Command[] = []
let currentIndex = 1
while (currentIndex < inputByLine.length) {
  let currentLine = inputByLine[currentIndex]
  if (currentLine.startsWith("$")) {
    let cmdRegexp = Array.from(currentLine.matchAll(/\$ (cd|ls) ?(.*)/gm))
      ?.map(e => e)
    let cmdName = cmdRegexp[0][1].toString()

    if (cmdName != "cd" && cmdName != "ls") {
      process.abort()
    }
    let cmdArguments = cmdRegexp[0][2]

    let cmd: Command
    if (cmdName == "cd") {
      cmd = {
       name: "cd",
        arguments: cmdArguments.toString()
      }
    } else if (cmdName == "ls") {
      let outputLines: string[] = []
      currentIndex++
      while (currentIndex < inputByLine.length && !inputByLine[currentIndex].startsWith("$")) {
        outputLines.push(inputByLine[currentIndex])
        currentIndex++
      }
      currentIndex--

      cmd = {
        name: "ls",
        output: outputLines
      }
    } else {
      console.log("Unknown command")
      process.abort()
    }
    commands.push(cmd)

  }
  currentIndex++
}


commands.forEach((command) => {
  try {
    if (command.name == "cd") {
      if (command.arguments == "..") {
        if (currentDir.parent == null)
          process.abort()
        currentDir = currentDir.parent
      } else if (command.arguments == "/") {
        currentDir = rootDir
      } else {
        let targetDir = currentDir.content.find(e => e.name == command.arguments) as Dir
        if (!targetDir) {
          console.log(command, currentDir)
          process.abort()
        }
        currentDir = targetDir
      }

    } else {
      command.output.forEach((line) => {
        let lineSplit = line.split(" ")
        if (lineSplit[0] == "dir") {
          createDir(lineSplit[1])
        } else {
          let [name, size] = [lineSplit[1], Number(lineSplit[0])]
          createFile(name, size)
        }

      })
    }

  } catch (e) {
    console.log(command)
    console.log("root", rootDir)
    console.log(e)
    process.abort()
  }
})

function calculateDirSize(d: Dir): number{
  let size = 0;
  d.content.forEach(el => {
    if ("content" in el){
      size+= calculateDirSize(el)
    } else {
      size += el.size
    }
  })
  return size
}

let sumOfLessThan100000 = 0
let dirSizes: {dirName: string, size: number}[] = []
function recursiveD1(d: Dir){
  let size = calculateDirSize(d)
  dirSizes.push({dirName: d.name, size: size})
  if (size < 100000) {
    sumOfLessThan100000 += size
  }
  d.content.forEach(e => {
    if ("content" in e) {
      recursiveD1(e)
    }
  })
}
recursiveD1(rootDir)

console.log(sumOfLessThan100000)

let totalSpace = 70000000
let spaceNeeded = 30000000

let needToFree = (totalSpace - spaceNeeded - calculateDirSize(rootDir)) * -1

let bigEnaugh = dirSizes.filter(d => d.size > needToFree)
console.log(bigEnaugh)
let smallest = bigEnaugh.reduce((p, c) => {
  if (c.size < p.size) {
    return c
  } else {
    return p
  }
})

console.log(smallest)

