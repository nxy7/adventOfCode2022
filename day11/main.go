package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	f, err := os.Open("input.txt")
	if err != nil {
		panic(err)
	}
	defer f.Close()

	s := bufio.NewScanner(f)
	// s.Split(bufio.ScanLines)
	var input []string
	for s.Scan() {
		input = append(input, s.Text())
	}

	var monkeySplit [][]string
	currentMonkey := 0
	monkeySplit = append(monkeySplit, make([]string, 0))

	for _, line := range input {
		if len(line) == 0 {
			monkeySplit = append(monkeySplit, make([]string, 0))
			currentMonkey++
			continue
		}
		// monkey := monkeySplit[currentMonkey]

		monkeySplit[currentMonkey] = append(monkeySplit[currentMonkey], line)
	}

	fmt.Printf("monkeySplit: %+v\n", monkeySplit)
}
