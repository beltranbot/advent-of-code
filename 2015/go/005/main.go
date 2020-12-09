package main

import (
	"bufio"
	"fmt"
	"os"

	"github.com/dlclark/regexp2"
)

func main() {
	var filename string = "input.txt"
	argsWithoutProg := os.Args[1:]
	if len(argsWithoutProg) == 1 {
		filename = fmt.Sprintf(argsWithoutProg[0])
	}
	file, fileErr := getFile(filename)
	if fileErr != nil {
		panic(fileErr)
	}
	defer file.Close()
	scanner := getScanner(file)
	part1(scanner)

	file2, fileErr := getFile(filename)
	if fileErr != nil {
		panic(fileErr)
	}
	defer file2.Close()
	scanner = getScanner(file2)
	part2(scanner)
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
	doesNotContainInvalidStrings := func(str string) bool {
		re := regexp2.MustCompile(`(ab|cd|pq|xy)`, 0)
		match, _ := re.MatchString(str)
		return !match
	}
	containsAtLeastThreeVowels := func(str string) bool {
		vowels := make(map[rune]int)
		for _, letter := range str {
			for _, vowel := range []rune{'a', 'e', 'i', 'o', 'u'} {
				if letter == vowel {
					vowels[vowel]++
				}
				if len(vowels) >= 3 {
					return true
				}
			}
		}
		var total int = 0
		for _, v := range vowels {
			total += v
		}

		return total >= 3
	}
	containsLetterTwiceInARow := func(str string) bool {
		c := rune(str[0])
		for _, r := range str[1:] {
			if c == r {
				return true
			}
			c = r
		}
		return false
	}
	var total int = 0
	for scanner.Scan() {
		str := scanner.Text()
		if doesNotContainInvalidStrings(str) &&
			containsAtLeastThreeVowels(str) &&
			containsLetterTwiceInARow(str) {
			total++
		}
	}
	fmt.Println("part1:", total)
}

func part2(scanner *bufio.Scanner) {
	pairAppearsTwice := func(str string) bool {
		re := regexp2.MustCompile(`([a-z][a-z]).*\1`, 0)
		match, _ := re.MatchString(str)
		return match
	}
	letterRepeatsInbetween := func(str string) bool {
		re := regexp2.MustCompile(`([a-z]).\1`, 0)
		match, _ := re.MatchString(str)
		return match
	}
	var total int = 0
	for scanner.Scan() {
		str := scanner.Text()
		if pairAppearsTwice(str) && letterRepeatsInbetween(str) {
			total++
		}
	}
	fmt.Println("part1:", total)
}
