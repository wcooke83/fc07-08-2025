#!/bin/bash

echo "Cleaning up node_modules and .next directories..."
rm -rf node_modules
rm -rf .next

echo "Reinstalling dependencies..."
npm install

echo "Running build..."
npm run build

echo "Cleanup and rebuild complete."
