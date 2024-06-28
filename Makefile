hello:
	echo "Hello World"

install-minifier:
	npm i @minify-html/node

minify:
	minhtml --output dist/index.html --minify-css --minify-js index.html
	minhtml --output dist/style.css --minify-css style.css