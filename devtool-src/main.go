package main

import (
	"flag"
	"log"
	"os"
	"strconv"

	"esbuild-tool/commands"
)

type CommonFlags struct {
	Entry  string
	Dist   string
	Minify string
}

func defineCommonFlags(fs *flag.FlagSet) *CommonFlags {
	cf := &CommonFlags{}

	fs.StringVar(&cf.Entry, "entry", "src/main.js", "Path to the entry point")
	fs.StringVar(&cf.Entry, "e", "src/main.js", "Path to the entry point (shorthand)")
	fs.StringVar(&cf.Dist, "dist", "dist/", "Path to the distribution directory")
	fs.StringVar(&cf.Dist, "d", "dist/", "Path to the distribution directory (shorthand)")
	fs.StringVar(&cf.Minify, "minify", "false", "Enable JavaScript minification")
	fs.StringVar(&cf.Minify, "m", "false", "Enable JavaScript minification (shorthand)")

	return cf
}

func main() {

	buildCmd := flag.NewFlagSet("build", flag.ExitOnError)
	buildFlags := defineCommonFlags(buildCmd)

	serveCmd := flag.NewFlagSet("serve", flag.ExitOnError)
	serveFlags := defineCommonFlags(serveCmd)

	cleanCmd := flag.NewFlagSet("clean", flag.ExitOnError)
	cleanFlags := defineCommonFlags(cleanCmd)

	switch os.Args[1] {
	case "build":
		buildCmd.Parse(os.Args[2:])
		enableMinify, err := strconv.ParseBool(buildFlags.Minify)
		if err != nil {
			log.Fatal("Minify argument is not recognized")
		}
		commands.Build(buildFlags.Entry, buildFlags.Dist, enableMinify)
	case "serve":
		serveCmd.Parse(os.Args[2:])
		enableMinify, err := strconv.ParseBool(buildFlags.Minify)
		if err != nil {
			log.Fatal("Minify argument is not recognized")
		}
		commands.Serve(serveFlags.Entry, serveFlags.Dist, enableMinify)
	case "clean":
		cleanCmd.Parse(os.Args[2:])
		commands.Clean(cleanFlags.Dist)
	default:
		log.Fatal("expected an action subcommand (build, serve or clean)")
	}
}
