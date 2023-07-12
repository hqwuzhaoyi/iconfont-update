#!/bin/sh
git config --global user.email "${GIT_EMAIL}"
git config --global user.name "${GIT_NAME}"
echo "GIT_EMAIL: ${GIT_EMAIL}"
echo "GIT_NAME: ${GIT_NAME}"
echo "GIT_REPO: ${GIT_REPO}"
pm2 start ecosystem.config.js --env production && pm2-runtime ecosystem.config.js --env production
