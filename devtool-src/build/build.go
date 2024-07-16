package build

import (
    "io/ioutil"
    "log"

    "github.com/evanw/esbuild/pkg/api"
    "github.com/tdewolff/minify/v2"
    "github.com/tdewolff/minify/v2/html"
)

func Run() {
    m := minify.New()
    m.AddFunc("text/html", html.Minify)

    result := api.Build(api.BuildOptions{
        EntryPoints:       []string{"src/main.js"},
        Bundle:            true,
        MinifyWhitespace:  true,
		MinifyIdentifiers: true,
		MinifySyntax:      true,
        Outfile:           "dist/bundle.js",
        Write:             true,
        Loader: map[string]api.Loader{
            ".html": api.LoaderText,
            ".css":  api.LoaderCSS,
        },
        Plugins: []api.Plugin{{
            Name: "html",
            Setup: func(build api.PluginBuild) {
                build.OnLoad(api.OnLoadOptions{Filter: `\.html$`},
                    func(args api.OnLoadArgs) (api.OnLoadResult, error) {
                        content, err := ioutil.ReadFile(args.Path)
                        if err != nil {
                            return api.OnLoadResult{}, err
                        }

                        minified, err := m.String("text/html", string(content))
                        if err != nil {
                            return api.OnLoadResult{}, err
                        }

                        return api.OnLoadResult{
                            Contents: &minified,
                            Loader:   api.LoaderText,
                        }, nil
                    })
            },
        }},
    })

    if len(result.Errors) > 0 {
        log.Fatal(result.Errors)
    }
}