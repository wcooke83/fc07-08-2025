#!/bin/bash

echo "Clearing npm cache..."
npm cache clean --force

echo "Removing node_modules and package-lock.json..."
rm -rf node_modules
rm -f package-lock.json

echo "Reinstalling dependencies..."
npm install

echo "Cache cleared and dependencies reinstalled."
