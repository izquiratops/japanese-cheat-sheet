package assets

import (
	"bytes"
	"esbuild-tool/utils"
	"fmt"
	"log"
	"os"
	"path/filepath"

	"golang.org/x/net/html"
)

func handleAsset(srcDirPath, distDirPath, assetRelPath string, target *string) error {
	srcAbsPath, err := filepath.Abs(filepath.Join(srcDirPath, assetRelPath))
	if err != nil {
		return fmt.Errorf("error getting absolute path for source: %v", err)
	}

	distAbsPath, err := filepath.Abs(filepath.Join(distDirPath, filepath.Base(assetRelPath)))
	if err != nil {
		return fmt.Errorf("error getting absolute path for destination: %v", err)
	}

	if _, err := os.Stat(distDirPath); os.IsNotExist(err) {
		message := fmt.Sprintf("directory %s does not exist.\n", distDirPath)
		log.Fatal(message)
	}

	// TODO: Check if the asset is already in the asset folder
	err = utils.MoveTo(srcAbsPath, distAbsPath)
	if err != nil {
		return fmt.Errorf("error moving file: %v", err)
	}

	// Setting the new src attribute as ./filename because everything is moved at the same path level
	*target = filepath.Base(assetRelPath)

	fmt.Printf("replaced SVG source: %s -> %s\n", srcAbsPath, distAbsPath)
	return nil
}

func HandleHtmlFile(htmlBytes []byte, srcDirPath, distDirPath string) ([]byte, error) {
	document, err := html.Parse(bytes.NewReader(htmlBytes))
	if err != nil {
		return nil, fmt.Errorf("error parsing HTML: %w", err)
	}

	var replaceAsset func(*html.Node) error
	replaceAsset = func(n *html.Node) error {
		// Handle SVG
		if n.Type == html.ElementNode && n.Data == "img" {
			for i, attr := range n.Attr {
				if attr.Key == "src" && bytes.HasSuffix([]byte(attr.Val), []byte(".svg")) {
					// TODO: Error handling is working here?
					handleAsset(srcDirPath, distDirPath, attr.Val, &n.Attr[i].Val)
					break
				}
			}
		}

		for c := n.FirstChild; c != nil; c = c.NextSibling {
			if err := replaceAsset(c); err != nil {
				return err
			}
		}

		return nil
	}

	replaceAsset(document)

	var buf bytes.Buffer
	err = html.Render(&buf, document)
	if err != nil {
		return nil, fmt.Errorf("error rendering HTML: %w", err)
	}

	return buf.Bytes(), nil
}
