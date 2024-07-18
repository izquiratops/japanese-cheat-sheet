package serve

import (
	"fmt"
	"os"

	"github.com/evanw/esbuild/pkg/api"
)

func Run() {
	// Define your build options
	buildOptions := api.BuildOptions{
		EntryPoints:       []string{"src/main.js"},
		Bundle:            true,
		MinifyWhitespace:  false,
		MinifyIdentifiers: false,
		MinifySyntax:      false,
		Outdir:            "dist",
		Write:             true,
		Loader: map[string]api.Loader{
			".html": api.LoaderText,
			".css":  api.LoaderText,
		},
	}

	// Create a context for the build
	ctx, err := api.Context(buildOptions)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Failed to create context: %v\n", err)
		os.Exit(1)
	}
	defer ctx.Dispose()

	// Start the server
	result, err2 := ctx.Serve(api.ServeOptions{
		Servedir: "dist",
		Port:     8080,
	})

	if err2 != nil {
		fmt.Fprintf(os.Stderr, "Failed to start server: %v\n", err2)
		os.Exit(1)
	}

	fmt.Printf("Server started on http://localhost:%d\n", result.Port)

	// Watch for changes and rebuild
	err3 := ctx.Watch(api.WatchOptions{})

	if err3 != nil {
		fmt.Fprintf(os.Stderr, "Failed to start watch mode: %v\n", err3)
		os.Exit(1)
	}

	// Returning from main() exits immediately in Go.
	// Block forever so we keep watching and don't exit.
	<-make(chan struct{})
}
