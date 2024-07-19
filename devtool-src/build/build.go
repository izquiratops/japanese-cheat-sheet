package build

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"regexp"

	"github.com/evanw/esbuild/pkg/api"
	"github.com/tdewolff/minify/v2"
	"github.com/tdewolff/minify/v2/css"
	"github.com/tdewolff/minify/v2/html"
)

const distPath = "/dist"
const regexSvgPattern = `<img[^>]+src="([^"]+\.svg)"`

func handleSvgAssets(content []byte) (api.OnLoadResult, error) {
	regex, err := regexp.Compile(regexSvgPattern)
	if err != nil {
		fmt.Println("Error compiling regex:", err)
		return api.OnLoadResult{}, err
	}

	matches := regex.FindAllStringSubmatch(string(content), -1)

	for _, match := range matches {
		if len(match) > 1 { // match[0] is the full match, match[1] is the first capture group
			cleanPath := filepath.Base(match[1])
			finalPath := filepath.Join(distPath, cleanPath)

			fmt.Println("Found .svg file:", match[1])
			fmt.Println("Modified .svg file path:", finalPath)
		}
	}

	return api.OnLoadResult{}, nil
}

func loadAndMinify(m *minify.M, fileType string) func(args api.OnLoadArgs) (api.OnLoadResult, error) {
	return func(args api.OnLoadArgs) (api.OnLoadResult, error) {
		content, err := os.ReadFile(args.Path)
		if err != nil {
			return api.OnLoadResult{}, err
		}

		handleSvgAssets(content)

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

func Run() {
	m := minify.New()
	m.AddFunc("text/html", html.Minify)
	m.AddFunc("text/css", css.Minify)

	result := api.Build(api.BuildOptions{
		EntryPoints:       []string{"src/main.js"},
		Bundle:            true,
		MinifyWhitespace:  false,
		MinifyIdentifiers: false,
		MinifySyntax:      false,
		Outdir:            distPath,
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
						loadAndMinify(m, "text/html"))
				},
			},
			{
				Name: "css",
				Setup: func(build api.PluginBuild) {
					build.OnLoad(api.OnLoadOptions{Filter: `\.css$`},
						loadAndMinify(m, "text/css"))
				},
			},
		},
	})

	if len(result.Errors) > 0 {
		log.Fatal(result.Errors)
	}
}
