package clean

import (
    "fmt"
    "os"
    "path/filepath"
)

func Run() {
    distDir := "dist"

    // Check if dist directory exists
    if _, err := os.Stat(distDir); os.IsNotExist(err) {
        fmt.Printf("Directory %s does not exist. Nothing to clean.\n", distDir)
        return
    }

    // Walk through the dist directory
    err := filepath.Walk(distDir, func(path string, info os.FileInfo, err error) error {
        if err != nil {
            return err
        }

        // Skip the dist directory itself and index.html
        if path == distDir || info.Name() == "index.html" {
            return nil
        }

        // Remove file or directory
        if err := os.RemoveAll(path); err != nil {
            return fmt.Errorf("failed to remove %s: %v", path, err)
        }

        fmt.Printf("Removed: %s\n", path)
        return nil
    })

    if err != nil {
        fmt.Printf("Error cleaning directory: %v\n", err)
        os.Exit(1)
    }

    fmt.Println("Clean completed successfully.")
}