# Hey

If you want to serve in dev mode or build the project you have to use the thing inside "devtool-src". It's a cli build with Go, run `go build -ldflags "-w" -o ../devtool` inside the `devtool-src` folder to compile and use it with the following commands:

- dev build: To build inside the "dist" folder

- dev serve: To serve a dev mode site

- dev clean: To remove everything but the "index.html" file

https://stackoverflow.com/questions/61626493/slotted-css-selector-for-nested-children-in-shadowdom-slot/61631668#61631668