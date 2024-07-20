package build

import (
	"bytes"
	"fmt"
	"io"
	"log"
	"os"
	"path/filepath"

	"golang.org/x/net/html"

	"github.com/evanw/esbuild/pkg/api"
	"github.com/tdewolff/minify/v2"
	minCss "github.com/tdewolff/minify/v2/css"
	minHtml "github.com/tdewolff/minify/v2/html"
)

const MINIFY_JAVASCRIPT = false

func MoveFile(sourcePath, entryPath, destPath string) error {
	inputFile, err := os.Open(entryPath)
	if err != nil {
		return fmt.Errorf("couldn't open source file: %v", err)
	}

	defer inputFile.Close()

	outputFile, err := os.Create(destPath)
	if err != nil {
		return fmt.Errorf("couldn't open dest file: %v", err)
	}

	defer outputFile.Close()

	_, err = io.Copy(outputFile, inputFile)
	if err != nil {
		return fmt.Errorf("couldn't copy to dest from source: %v", err)
	}

	return nil
}

func handleAssets(htmlBytes []byte, srcDirPath, distDirPath string) ([]byte, error) {
	document, err := html.Parse(bytes.NewReader(htmlBytes))
	if err != nil {
		return nil, fmt.Errorf("error parsing HTML: %w", err)
	}

	var replaceSVG func(*html.Node) error
	replaceSVG = func(n *html.Node) error {
		if n.Type == html.ElementNode && n.Data == "img" {
			for i, attr := range n.Attr {
				if attr.Key == "src" && bytes.HasSuffix([]byte(attr.Val), []byte(".svg")) {
					srcAbsPath, err := filepath.Abs(filepath.Join(srcDirPath, attr.Val))
					if err != nil {
						return fmt.Errorf("error getting absolute path for source: %v", err)
					}

					distAbsPath, err := filepath.Abs(filepath.Join(distDirPath, filepath.Base(attr.Val)))
					if err != nil {
						return fmt.Errorf("error getting absolute path for destination: %v", err)
					}

					err = MoveFile(attr.Val, srcAbsPath, distAbsPath)
					if err != nil {
						return fmt.Errorf("error moving file: %v", err)
					}

					// Setting the new src attribute as ./filename because everything is moved at the same path level
					n.Attr[i].Val = filepath.Base(attr.Val)

					fmt.Printf("replaced SVG source: %s -> %s\n", srcAbsPath, distAbsPath)
					break
				}
			}
		}

		for c := n.FirstChild; c != nil; c = c.NextSibling {
			if err := replaceSVG(c); err != nil {
				return err
			}
		}

		return nil
	}

	replaceSVG(document)

	var buf bytes.Buffer
	err = html.Render(&buf, document)
	if err != nil {
		return nil, fmt.Errorf("error rendering HTML: %w", err)
	}

	return buf.Bytes(), nil
}

func loadAndMinify(m *minify.M, distDirPath, fileType string) func(args api.OnLoadArgs) (api.OnLoadResult, error) {
	return func(args api.OnLoadArgs) (api.OnLoadResult, error) {
		srcFilePath := filepath.Clean(args.Path)
		srcDirPath := filepath.Dir(args.Path)

		fmt.Printf("bundling file: %s\n", srcFilePath)
		content, err := os.ReadFile(srcFilePath)
		if err != nil {
			return api.OnLoadResult{}, err
		}

		if fileType == "text/html" {
			// Move any resource coming from the src assets folder to dist assets folder
			content, err = handleAssets(content, srcDirPath, distDirPath)
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

func Run(entryPath string, distPath string) {
	m := minify.New()
	m.AddFunc("text/html", minHtml.Minify)
	m.AddFunc("text/css", minCss.Minify)

	result := api.Build(api.BuildOptions{
		EntryPoints:       []string{entryPath},
		Bundle:            true,
		MinifyWhitespace:  MINIFY_JAVASCRIPT,
		MinifyIdentifiers: MINIFY_JAVASCRIPT,
		MinifySyntax:      MINIFY_JAVASCRIPT,
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
						loadAndMinify(m, distPath, "text/html"))
				},
			},
			{
				Name: "css",
				Setup: func(build api.PluginBuild) {
					build.OnLoad(api.OnLoadOptions{Filter: `\.css$`},
						loadAndMinify(m, distPath, "text/css"))
				},
			},
		},
	})

	if len(result.Errors) > 0 {
		log.Fatal(result.Errors)
	}
}
