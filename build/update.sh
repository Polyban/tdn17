mkdir build/node_modules
cp -r `npm ls --prod --parseable |tail -n +2` build/node_modules
cd build
rm index.zip
zip -X -r index.zip index.js node_modules/
aws lambda update-function-code --function-name tdn2017 --zip-file fileb://index.zip
