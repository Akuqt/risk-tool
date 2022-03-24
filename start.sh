#!/bin/bash

# Use only in the EC2 instance

cmd="pm2 stop all"
$cmd
status=$?

if [ $status -eq 0 ]; then
  pm2 start all
  pm2 save --force
else
  pm2 start release/web/index.js --name frontend
  pm2 start release/api/index.js --name backend
  pm2 save --force
fi