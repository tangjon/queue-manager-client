#!/usr/bin/env node
#!/usr/bin/env nodemon
#!/usr/bin/env npm
#!/usr/bin/env git

# This will bring this project up to date with the repo. All changes to this directory will be lost.
echo "============================================"
echo "DEPLOYING QMTOOL FRONTEND"
echo "============================================"

# Compile and deploy to static files
npm run build-prod
read