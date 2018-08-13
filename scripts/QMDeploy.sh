#!/usr/bin/env node
#!/usr/bin/env nodemon
#!/usr/bin/env git

# This will bring this project up to date with the repo. All changes to this directory will be lost.
echo "============================================"
echo "RUNNING PRODUCTION DEPLOYMENT TOOL, DEPLOY TO 'C:\QM TOOL\QM TOOL FRONTEND PROJECT FOLDER\build-prod'"
echo "============================================"

npm run build-prod

echo "============================================"
echo "Script Running Complete"
echo "============================================"
read


