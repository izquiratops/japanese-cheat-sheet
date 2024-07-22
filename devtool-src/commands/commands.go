package commands

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"slices"

	"github.com/evanw/esbuild/pkg/api"
	"github.com/tdewolff/minify/v2"
	"github.com/tdewolff/minify/v2/css"
	"github.com/tdewolff/minify/v2/html"

	"esbuild-tool/assets"
)

func loadAndMinify(m *minify.M, distDirPath, fileType string) func(args api.OnLoadArgs) (api.OnLoadResult, error) {
	return func(args api.OnLoadArgs) (api.OnLoadResult, error) {
		srcFilePath := filepath.Clean(args.Path)
		srcDirPath := filepath.Dir(args.Path)

		fmt.Printf("handling file: %s\n", srcFilePath)
		content, err := os.ReadFile(srcFilePath)
		if err != nil {
			return api.OnLoadResult{}, err
		}

		// Move any resource coming from the src assets folder to dist assets folder
		if fileType == "text/html" {
			content, err = assets.HandleHtmlFile(content, srcDirPath, distDirPath)
			if err != nil {
				return api.OnLoadResult{}, err
			}
		}

		minified, err := m.String(fileType, string(content))
		if err != nil {
			return api.OnLoadResult{}, err
		}

		return api.OnLoadResult{
			Contents: &minified,
			Loader:   api.LoaderText,
		}, nil
	}
}

func Build(entryFilePath, distDirPath string, enableMinify bool) {
	m := minify.New()
	m.AddFunc("text/html", html.Minify)
	m.AddFunc("text/css", css.Minify)

	result := api.Build(api.BuildOptions{
		EntryPoints:       []string{entryFilePath},
		Bundle:            true,
		Metafile:          true,
		MinifyWhitespace:  enableMinify,
		MinifyIdentifiers: enableMinify,
		MinifySyntax:      enableMinify,
		Outdir:            distDirPath,
		Write:             true,
		Loader: map[string]api.Loader{
			".html": api.LoaderText,
			".css":  api.LoaderText,
		},
		Plugins: []api.Plugin{
			{
				Name: "html",
				Setup: func(build api.PluginBuild) {
					build.OnLoad(api.OnLoadOptions{Filter: `\.html$`},
						loadAndMinify(m, distDirPath, "text/html"))
				},
			},
			{
				Name: "css",
				Setup: func(build api.PluginBuild) {
					build.OnLoad(api.OnLoadOptions{Filter: `\.css$`},
						loadAndMinify(m, distDirPath, "text/css"))
				},
			},
		},
	})

	if len(result.Errors) > 0 {
		log.Fatal(result.Errors)
	}

	fmt.Printf("build successfully done\n%s", result.Metafile)
}

func Serve(entryFilePath, distDirPath string, enableMinify bool) error {
	m := minify.New()
	m.AddFunc("text/html", html.Minify)
	m.AddFunc("text/css", css.Minify)

	buildOptions := api.BuildOptions{
		EntryPoints:       []string{entryFilePath},
		Bundle:            true,
		MinifyWhitespace:  enableMinify,
		MinifyIdentifiers: enableMinify,
		MinifySyntax:      enableMinify,
		Outdir:            distDirPath,
		Write:             true,
		Loader: map[string]api.Loader{
			".html": api.LoaderText,
			".css":  api.LoaderText,
		},
		Plugins: []api.Plugin{
			{
				Name: "html",
				Setup: func(build api.PluginBuild) {
					build.OnLoad(api.OnLoadOptions{Filter: `\.html$`},
						loadAndMinify(m, distDirPath, "text/html"))
				},
			},
			{
				Name: "css",
				Setup: func(build api.PluginBuild) {
					build.OnLoad(api.OnLoadOptions{Filter: `\.css$`},
						loadAndMinify(m, distDirPath, "text/css"))
				},
			},
		},
	}

	// Create a context for the build
	ctx, err := api.Context(buildOptions)
	if err != nil {
		log.Fatal("failed to create context:", err)
	}

	defer ctx.Dispose()

	// Watch for changes and rebuild
	watchErr := ctx.Watch(api.WatchOptions{})
	if watchErr != nil {
		log.Fatal("failed to start watch mode:", watchErr)
	}

	// Start the server
	result, serveErr := ctx.Serve(api.ServeOptions{
		Servedir: distDirPath,
		Port:     8080,
	})

	if serveErr != nil {
		log.Fatal("failed to start server:", serveErr)
	}

	fmt.Printf("server started on http://localhost:%d\n", result.Port)

	// Returning from main() exits immediately in Go.
	// Block forever so we keep watching and don't exit.
	<-make(chan struct{})

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

	fmt.Println("clean completed successfully.")
}
