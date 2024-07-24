package utils

import (
	"fmt"
	"io"
	"log"
	"os"
	"path/filepath"
	"slices"
)

func MoveTo(entryPath, destPath string) error {
	inputFile, err := os.Open(entryPath)
	if err != nil {
		return fmt.Errorf("couldn't open source file: %v", err)
	}

	defer inputFile.Close()

	outputFile, err := os.Create(destPath)
	if err != nil {
		return fmt.Errorf("couldn't open dest file: %v", err)
	}

	defer outputFile.Close()

	_, err = io.Copy(outputFile, inputFile)
	if err != nil {
		return fmt.Errorf("couldn't copy to dest from source: %v", err)
	}

	return nil
}

func Clean(distDirPath string) {
	whitelist := []string{"index.html", "favicon.ico"}

	// Check if dist directory exists
	if _, err := os.Stat(distDirPath); os.IsNotExist(err) {
		message := fmt.Sprintf("directory %s does not exist.\n", distDirPath)
		log.Fatal(message)
	}

	// Walk through the dist directory
	err := filepath.Walk(distDirPath, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		// Skip the dist directory itself and whitelisted files like index.html
		if path == distDirPath || slices.Contains(whitelist, info.Name()) {
			return nil
		}

		// Remove file or directory
		if err := os.RemoveAll(path); err != nil {
			return fmt.Errorf("failed to remove %s: %v", path, err)
		}

		fmt.Printf("removed: %s\n", path)
		return nil
	})

	if err != nil {
		log.Fatal("error cleaning directory:", err)
	}
}
