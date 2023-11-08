package main

import (
	"bufio"
	"fmt"
	"math/big"
	"os"
	"strconv"
	"strings"
)

type Monkey struct {
	monkeyNum       int
	items           []*big.Int
	testDivisionNum *big.Int
	operation       func(*big.Int) *big.Int
	trueTarget      int
	falseTarget     int
	inspectTimes    uint64
}

func FindMonkey(mks []Monkey, num int) *Monkey {
	for i, m := range mks {
		if m.monkeyNum == num {
			return &mks[i]
		}
	}
	return nil
}

var CommonMultiple uint64

func MonkeyThrowItem(itemWorryLevel *big.Int, targetMonkey *Monkey) {
	targetMonkey.items = append(targetMonkey.items, itemWorryLevel)
}

func ProcessMonkeyAction(ind int, mks []Monkey) {
	mk := &mks[ind]
	for _, v := range mk.items {
		newWorry := mk.operation(v)
		itemWorryLevel := newWorry
		for itemWorryLevel.Uint64() > CommonMultiple {
			itemWorryLevel = itemWorryLevel.Sub(itemWorryLevel, big.NewInt(int64(CommonMultiple)))
		}

		moduloRes := new(big.Int).Mod(itemWorryLevel, mk.testDivisionNum).Int64()
		if moduloRes == 0 {
			MonkeyThrowItem(itemWorryLevel, &mks[mk.trueTarget])
		} else {
			MonkeyThrowItem(itemWorryLevel, &mks[mk.falseTarget])
		}

		mk.inspectTimes++
	}
	mk.items = make([]*big.Int, 0)
}

func RunMonkeysRound(mks []Monkey) {
	for i := range mks {
		ProcessMonkeyAction(i, mks)
	}
}

func main() {
	f, err := os.Open("input.txt")
	if err != nil {
		panic(err)
	}
	defer f.Close()

	s := bufio.NewScanner(f)
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

	var monkeys []Monkey
	for _, s := range monkeySplit {
		monkeys = append(monkeys, ParseMonkey(s))
	}
	CommonMultiple = 1
	for _, m := range monkeys {
		CommonMultiple *= m.testDivisionNum.Uint64()
	}

	for i := 0; i < 10000; i++ {
		fmt.Println("running loop", i)
		RunMonkeysRound(monkeys)
	}

	for i, mk := range monkeys {
		fmt.Println("Monkey ", i, ": ", mk.inspectTimes)
	}

	var is []uint64
	for i := range monkeys {
		is = append(is, monkeys[i].inspectTimes)
		fmt.Println("Monkey", i, "has", len(monkeys[i].items), "items")
	}

	var max1, max2 uint64
	for _, v := range is {
		if v > max1 && v > max2 {
			max2 = max1
			max1 = v
		} else if v > max2 {
			max2 = v
		}
	}

	fmt.Println(max1)
	fmt.Println(max2)
	fmt.Println("Monkey business ", max1*max2)

}

func ParseMonkey(text []string) Monkey {
	newMonkey := Monkey{}
	ns := strings.Fields(text[0])[1]
	ns = ns[:len(ns)-1]
	nsNum, err := strconv.Atoi(ns)
	if err != nil {
		panic(err)
	}
	newMonkey.monkeyNum = nsNum

	var worryLevels []*big.Int
	is := strings.Fields(text[1])[2:]
	for _, w := range is {
		wl, err := strconv.Atoi(strings.Replace(w, ",", "", 1))
		if err != nil {
			panic(err)
		}

		worryLevels = append(worryLevels, big.NewInt(int64(wl)))
	}
	newMonkey.items = worryLevels

	testDiv := strings.Fields(text[3])[3]
	testDivInt, err := strconv.Atoi(testDiv)
	if err != nil {
		panic(err)
	}
	newMonkey.testDivisionNum = big.NewInt(int64(testDivInt))

	var divFunc func(*big.Int) *big.Int
	operations := strings.Fields(text[2])[3:]
	divFunc = func(i *big.Int) *big.Int {
		var current *big.Int
		var operation func(*big.Int, *big.Int) *big.Int
		for _, op := range operations {
			switch op {
			case "+":
				operation = func(a, b *big.Int) *big.Int {
					return a.Add(a, b)
				}
			case "*":
				operation = func(a, b *big.Int) *big.Int {
					return a.Mul(a, b)
					// return a * b
				}
			case "old":
				if operation == nil {
					current = i
				} else {
					current = operation(current, i)
				}
			default:
				num, err := strconv.Atoi(op)
				if err != nil {
					panic(err)
				}
				if operation == nil {
					current = big.NewInt(int64(num))
				} else {
					current = operation(current, big.NewInt(int64(num)))
				}
			}
		}
		return current
	}
	newMonkey.operation = divFunc

	throwToTrue := strings.Fields(text[4])[5]
	throwToTrueInt, err := strconv.Atoi(throwToTrue)
	if err != nil {
		panic(err)
	}
	newMonkey.trueTarget = throwToTrueInt

	throwToFalse := strings.Fields(text[5])[5]
	throwToFalseInt, err := strconv.Atoi(throwToFalse)
	if err != nil {
		panic(err)
	}
	newMonkey.falseTarget = throwToFalseInt

	return newMonkey
}
