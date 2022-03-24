#!/bin/bash

# Use only in the EC2 instance

cd ~/risk-tool/
pm2 restart process.yml
pm2 save --force