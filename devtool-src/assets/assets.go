package assets

import (
	"bytes"
	"fmt"
	"io"
	"os"
	"path/filepath"

	"golang.org/x/net/html"
)

func moveFile(entryPath, destPath string) error {
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
					srcAbsPath, err := filepath.Abs(filepath.Join(srcDirPath, attr.Val))
					if err != nil {
						return fmt.Errorf("error getting absolute path for source: %v", err)
					}

					distAbsPath, err := filepath.Abs(filepath.Join(distDirPath, filepath.Base(attr.Val)))
					if err != nil {
						return fmt.Errorf("error getting absolute path for destination: %v", err)
					}

					err = moveFile(srcAbsPath, distAbsPath)
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
