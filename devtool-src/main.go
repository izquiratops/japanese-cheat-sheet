package main

import (
	"flag"
	"log"
	"os"

	"esbuild-tool/build"
	"esbuild-tool/clean"
	"esbuild-tool/serve"
)

func main() {
	buildCmd := flag.NewFlagSet("build", flag.ExitOnError)
	var srcPath string
	buildCmd.StringVar(&srcPath, "src", "src/main.js", "Path to the entry point")
	buildCmd.StringVar(&srcPath, "s", "src/main.js", "Path to the entry point (shorthand)")
	var distPath string
	buildCmd.StringVar(&distPath, "dist", "dist/", "Path to the distribution directory")
	buildCmd.StringVar(&distPath, "d", "dist/", "Path to the distribution directory (shorthand)")
	serveCmd := flag.NewFlagSet("serve", flag.ExitOnError)
	cleanCmd := flag.NewFlagSet("clean", flag.ExitOnError)

	switch os.Args[1] {
	case "build":
		buildCmd.Parse(os.Args[2:])
		build.Run(srcPath, distPath)
	case "serve":
		serveCmd.Parse(os.Args[2:])
		serve.Run()
	case "clean":
		cleanCmd.Parse(os.Args[2:])
		clean.Run()
	default:
		log.Fatal("expected an action subcommand (build, serve or clean)")
	}
}
