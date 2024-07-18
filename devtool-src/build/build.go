package build

import (
	"fmt"
	"log"
	"os"

	"github.com/evanw/esbuild/pkg/api"
	"github.com/tdewolff/minify/v2"
	"github.com/tdewolff/minify/v2/css"
	"github.com/tdewolff/minify/v2/html"
)

func loadAndMinify(m *minify.M, fileType string) func(args api.OnLoadArgs) (api.OnLoadResult, error) {
	return func(args api.OnLoadArgs) (api.OnLoadResult, error) {
		content, err := os.ReadFile(args.Path)
		if err != nil {
			return api.OnLoadResult{}, err
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
		Outdir:            "dist",
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

	fmt.Println(`
    ########::: ######::: ##::: ##: ########: ####:
    ##.... ##: ##.... ##: ###:: ##: ##.....:: ####:
    ##:::: ##: ##:::: ##: ####: ##: ##::::::: ####:
    ##:::: ##: ##:::: ##: ## ## ##: ######:::: ##::
    ##:::: ##: ##:::: ##: ##. ####: ##...:::::..:::
    ##:::: ##: ##:::: ##: ##:. ###: ##:::::::'####:
    ########::. #######:: ##::. ##: ########: ####:
    ........::::.......:::..::::..::........::....:`)
}
