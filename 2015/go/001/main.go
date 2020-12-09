package main

import (
	"fmt"
	"io/ioutil"
)

func main() {
	part1()
	part2()
}

func part1() {
	dat, err := ioutil.ReadFile("./input.txt")
	if err != nil {
		panic(err)
	}

	var floor int = 0
	for _, char := range dat {
		if char == '(' {
			floor++
		} else if char == ')' {
			floor--
		}
	}

	fmt.Println("part1: ", floor)
}

func part2() {
	dat, err := ioutil.ReadFile("./input.txt")
	if err != nil {
		panic(err)
	}

	var floor int = 0
	var index int
	for i, char := range dat {
		if char == '(' {
			floor++
		} else if char == ')' {
			floor--
		}
		if floor < 0 {
			index = i + 1
			break
		}
	}

	fmt.Println("part2: ", index)
}
