package main

import (
	"bufio"
	"fmt"
	"os"
)

type Monkey struct {
	monkeyNum   int32
	items       []int32
	test        int32
	operation   []any
	trueTarget  int32
	falseTarget int32
}

func FindMonkey(mks []Monkey, num int32) *Monkey {
	for _, m := range mks {
		if m.monkeyNum == num {
			return &m
		}
	}
	return nil
}

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
		monkeySplit[currentMonkey] = append(monkeySplit[currentMonkey], line)
	}

	// change lines to monkey

	fmt.Printf("monkeySplit: %+v\n", monkeySplit)
}
