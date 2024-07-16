package main

import (
    "flag"
    "fmt"
    "os"

    "esbuild-tool/build"
    "esbuild-tool/serve"
    "esbuild-tool/clean"
)

func main() {
    buildCmd := flag.NewFlagSet("build", flag.ExitOnError)
    serveCmd := flag.NewFlagSet("serve", flag.ExitOnError)
    cleanCmd := flag.NewFlagSet("clean", flag.ExitOnError)

    if len(os.Args) < 2 {
        fmt.Println("Expected 'build' or 'serve' subcommands")
        os.Exit(1)
    }

    switch os.Args[1] {
    case "build":
        buildCmd.Parse(os.Args[2:])
        build.Run()
    case "serve":
        serveCmd.Parse(os.Args[2:])
        serve.Run()
    case "clean":
        cleanCmd.Parse(os.Args[2:])
        clean.Run()
    default:
        fmt.Println("Expected 'build' or 'serve' subcommands")
        os.Exit(1)
    }
}