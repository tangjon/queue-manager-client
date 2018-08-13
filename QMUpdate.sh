#!/usr/bin/env node
#!/usr/bin/env nodemon
#!/usr/bin/env git

# This will bring this project up to date with the repo. All changes to this directory will be lost.
echo "============================================"
echo "RUNNING UPDATE TOOL"
echo "============================================"

git fetch --all
git reset --hard origin/master
git pull
echo "============================================"
echo "Script Running Complete"
echo "============================================"
read