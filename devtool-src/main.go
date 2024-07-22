package main

import (
	"flag"
	"fmt"
	"log"
	"os"
	"strconv"

	"esbuild-tool/commands"
)

type CommonFlags struct {
	Dist string
}

func defineCommonFlags(fs *flag.FlagSet) *CommonFlags {
	cf := &CommonFlags{}
	fs.StringVar(&cf.Dist, "dist", "dist/", "Path to the distribution directory")
	fs.StringVar(&cf.Dist, "d", "dist/", "Path to the distribution directory (shorthand)")

	return cf
}

type BundleFlags struct {
	CommonFlags
	Entry  string
	Minify string
}

func defineBundleCommonFlags(fs *flag.FlagSet) *BundleFlags {
	bcf := &BundleFlags{}

	cf := defineCommonFlags(fs)
	bcf.Dist = cf.Dist

	fs.StringVar(&bcf.Entry, "entry", "src/main.js", "Path to the entry point")
	fs.StringVar(&bcf.Entry, "e", "src/main.js", "Path to the entry point (shorthand)")
	fs.StringVar(&bcf.Minify, "minify", "false", "Enable JavaScript minification")
	fs.StringVar(&bcf.Minify, "m", "false", "Enable JavaScript minification (shorthand)")

	return bcf
}

func printHelp() {
	fmt.Println("Usage: esbuild-tool <command> [options]")
	fmt.Println("\nCommands:")
	fmt.Println("  build\tBuild the project")
	fmt.Println("  serve\tServe the project")
	fmt.Println("  clean\tClean the distribution directory")
	fmt.Println("  help\tShow this help message")
	fmt.Println("\nOptions:")
	fmt.Println("  -d, --dist string\tPath to the distribution directory (default \"dist/\")")
	fmt.Println("  -e, --entry string\tPath to the entry point (default \"src/main.js\")")
	fmt.Println("  -m, --minify string\tEnable JavaScript minification (default \"false\")")
}

func main() {
	buildCmd := flag.NewFlagSet("build", flag.ExitOnError)
	buildFlags := defineBundleCommonFlags(buildCmd)

	serveCmd := flag.NewFlagSet("serve", flag.ExitOnError)
	serveFlags := defineBundleCommonFlags(serveCmd)

	cleanCmd := flag.NewFlagSet("clean", flag.ExitOnError)
	cleanFlags := defineCommonFlags(cleanCmd)

	switch os.Args[1] {
	case "build":
		buildCmd.Parse(os.Args[2:])
		enableMinify, err := strconv.ParseBool(buildFlags.Minify)
		if err != nil {
			log.Fatal("--minify argument is not recognized")
		}
		commands.Build(buildFlags.Entry, buildFlags.Dist, enableMinify)
	case "serve":
		serveCmd.Parse(os.Args[2:])
		enableMinify, err := strconv.ParseBool(buildFlags.Minify)
		if err != nil {
			log.Fatal("--minify argument is not recognized")
		}
		commands.Serve(serveFlags.Entry, serveFlags.Dist, enableMinify)
	case "clean":
		cleanCmd.Parse(os.Args[2:])
		commands.Clean(cleanFlags.Dist)
	case "help":
		printHelp()
	default:
		log.Fatal("expected an action subcommand (build, serve or clean)")
	}
}
