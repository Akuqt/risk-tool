#!/bin/bash
cd /home/ubuntu/risk-tool

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

npm i -g pm2

cmd="pm2 stop all"
$cmd
status=$?

if [ $status -eq 0 ]; then
  pm2 start all
else
  pm2 start release/web/index.js --name f
  pm2 start release/api/index.js --name b
fi