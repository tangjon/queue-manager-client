#!/bin/bash
if [ -d ./documentation  ]; then
  cp -r ./documentation ../QMDOCS
	cd ..
	cd ./QMBUILDPROD
	git init .
	git remote add origin https://git.hanatrial.ondemand.com/p2000140239trial/queuemanagerdocumentation
	git add .
	git commit -m "Static Deploy"
	git push origin master --force
	cd ..
	rm -rf ./QMDOCS
else
   echo run "npm run compodoc" first
fi
echo "ctr-z or enter to exit"
read junk
