#!/bin/sh

set -e

cd "$(dirname "$0")"

npm i

rm -rf src/build

npx postcss -o src/build/style.css src/styles/style.css

rm -rf out
cp -r src out
