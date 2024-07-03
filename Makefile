# Define paths
SRC=src/main.js
DIST=dist
OUTFILE=$(DIST)/bundle.js

# esbuild command
ESBUILD=npx esbuild

# Default build task
build:
	$(ESBUILD) $(SRC) --bundle --loader:.html=text --minify --outfile=$(OUTFILE)

# Build with watch and serve at the same time
dev:
	$(ESBUILD) $(SRC) --bundle --loader:.html=text --watch --outfile=$(OUTFILE) --servedir=$(DIST)

# Clear the dist directory
clean:
	find $(DIST) -mindepth 1 ! -name 'index.html' -exec rm -rf {} +

.PHONY: build dev clean