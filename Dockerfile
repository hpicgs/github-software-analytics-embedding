FROM node:22-alpine

RUN apk add tokei
RUN npm install pnpm --location=global

ARG repository_path=./
COPY $repository_path /repository
ENV REPOSITORY_PATH=/repository

COPY analytics/src ./src
COPY analytics/package.json .
COPY analytics/pnpm-lock.yaml .
COPY analytics/tsconfig.json .
RUN mkdir /metrics

RUN pnpm install
RUN pnpm run build

RUN tokei /repository --output json > /metrics/metrics.json

CMD [ "node", "/build/index.js" ]
