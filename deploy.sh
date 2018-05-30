#!/bin/bash
if [ -d ./build-prod  ]; then
  cp -r ./build-prod ../QMBUILDPROD
	cd ..
	cd ./QMBUILDPROD
	git init .
	git remote add origin https://gitlab.com/tangjon/Queue-Manager-Build.git
	git add .
	git commit -m "Static Deploy"
	git push origin master --force
	cd ..
	rm -rf ./QMBUILDPROD
else
   echo run "npm run build-prod" first
fi
echo "ctr-z or enter to exit"
read junk
