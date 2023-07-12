This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm i
```

then

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Docker

```bash
docker buildx build -t iconfont-update .
```

```bash
docker run --name iconfont-update -d \
-p 3006:3006 \
-e GIT_EMAIL= \
-e GIT_NAME="" \
-e GIT_REPO="http://${GIT_NAME}:${GIT_PASSWORD}@10.15.111.8:8888/plugins1/sdata-icon.git" \
iconfont-update:latest
```
