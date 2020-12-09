package main

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"os"
	"regexp"
)

func main() {
	var secretKey string = "iwrupvqb"
	argsWithoutProg := os.Args[1:]
	if len(argsWithoutProg) == 1 {
		secretKey = fmt.Sprintf(argsWithoutProg[0])
	}
	part1(secretKey)
	part2(secretKey)
}

func part1(secretKey string) {
	var number int = 0

	for true {
		hash := getMD5(fmt.Sprintf("%v%v", secretKey, number))
		match, _ := regexp.MatchString(`^00000[1-9]+.*`, hash)
		if match {
			fmt.Println("part1:", number)
			break
		}
		number++
	}
}

func part2(secretKey string) {
	var number int = 0

	for true {
		hash := getMD5(fmt.Sprintf("%v%v", secretKey, number))
		match, _ := regexp.MatchString(`^000000[1-9]+.*`, hash)
		if match {
			fmt.Println("part2:", number)
			break
		}
		number++
	}
}

// getMD5 returns md5 encryption of a string input
func getMD5(input string) string {
	hash := md5.New()
	defer hash.Reset()

	hash.Write([]byte(input))
	return hex.EncodeToString(hash.Sum(nil))
}
