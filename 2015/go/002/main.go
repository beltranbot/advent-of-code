package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"regexp"
	"sort"
	"strconv"
)

func main() {
	file, fileErr := getFile("./input.txt")
	if fileErr != nil {
		panic(fileErr)
	}
	defer file.Close()
	scanner := getScanner(file)
	part1(scanner)

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
}

func getFile(filename string) (*os.File, error) {
	file, err := os.Open(filename)
	if err != nil {
		return nil, err
	}
	return file, nil
}

func getScanner(file *os.File) *bufio.Scanner {
	scanner := bufio.NewScanner(file)
	return scanner
}

func part1(scanner *bufio.Scanner) {
	r, _ := regexp.Compile(`(\d*)x(\d*)x(\d*)`)
	var total int
	var ribbon int
	for scanner.Scan() {
		dimensions := r.FindStringSubmatch(scanner.Text())
		l, _ := strconv.Atoi(dimensions[1])
		w, _ := strconv.Atoi(dimensions[2])
		h, _ := strconv.Atoi(dimensions[3])

		a1 := l * w
		a2 := w * h
		a3 := h * l
		vals := []int{l, w, h}
		min := minArea(a1, a2, a3)
		sort.Ints(vals)
		total += ((2 * a1) + (2 * a2) + (2 * a3)) + min
		ribbon += ((vals[0] * 2) + (vals[1] * 2) + (l * w * h))
	}

	fmt.Println("part1: ", total)
	fmt.Println("part2: ", ribbon)
}

func minArea(arr ...int) int {
	var min int = 2147483647 // max int
	for _, a := range arr {
		if a < min {
			min = a
		}
	}
	return min
}
