#!/bin/bash

cd /home/ubuntu/risk-tool

export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" 
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" 

npm i -g yarn
yarn set version stable
yarn install

cd apps/web/
yarn build
cd ..
cd api/
yarn build
cd ../..