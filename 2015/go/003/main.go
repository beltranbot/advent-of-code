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

	houses := map[string]int{
		"0,0": 1,
	}

	var x int = 0
	var y int = 0
	for _, step := range dat {
		switch step {
		case '^':
			y--
		case '>':
			x++
		case 'v':
			y++
		case '<':
			x--
		}

		key := fmt.Sprintf("%v,%v", x, y)
		if _, exists := houses[key]; !exists {
			houses[key] = 1
		}
	}

	fmt.Println("part1:", len(houses))
}

type santa struct {
	X int
	Y int
}

func part2() {
	dat, err := ioutil.ReadFile("./input.txt")
	if err != nil {
		panic(err)
	}

	santas := []santa{
		santa{
			X: 0,
			Y: 0,
		},
		santa{
			X: 0,
			Y: 0,
		},
	}
	houses := map[string]int{
		"0,0": 1,
	}

	for i, step := range dat {
		var which int = i % 2
		switch step {
		case '^':
			santas[which].Y--
		case '>':
			santas[which].X++
		case 'v':
			santas[which].Y++
		case '<':
			santas[which].X--
		}

		key := fmt.Sprintf("%v,%v", santas[which].X, santas[which].Y)
		if _, exists := houses[key]; !exists {
			houses[key] = 1
		}
	}
	fmt.Println("part2:", len(houses))
}
