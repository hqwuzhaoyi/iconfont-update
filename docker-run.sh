docker run --name iconfont-update -d \
-p 3006:3006 \
-e GIT_EMAIL= \
-e GIT_NAME="" \
-e GIT_REPO="http://${GIT_NAME}:${GIT_PASSWORD}@10.15.111.8:8888/plugins1/sdata-icon.git" \
iconfont-update:latest