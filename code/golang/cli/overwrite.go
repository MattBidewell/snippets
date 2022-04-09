package main

import (
	"fmt"
	"strconv"
	"time"
)

// example output
// █|█|█|█|█|█|█|█| 43/100
func renderLoadingBar(index int) string {
	percent := index
	block := string(rune(0x2588))
	bar := ""
	for index > 0 {
		// for a nicer experience only print when its multiple of 5
		if index % 5 == 0 {
			bar +=  block + "|"
		}
		index--
	}

	// add a nice total pretty print to the string.
	indexStr := strconv.Itoa(percent) + "/100"

	return bar + " " + indexStr
}

func main() {
	fmt.Println("Start")
	i := 0
	for i <= 100 {
		output := renderLoadingBar(i)
		fmt.Println(output + "\x1B[1A\x1B[0K") // print output + reset posiiton to 0
		i++
		time.Sleep(50 * time.Millisecond)
	}
	fmt.Println("")
	fmt.Println("Completed")
}