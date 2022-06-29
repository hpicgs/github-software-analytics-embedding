FROM node:16

RUN npm install -g pnpm

ARG repository_path=./
COPY $repository_path /repository
ENV REPOSITORY_PATH=/repository

COPY analytics/src ./src
COPY analytics/package.json .
COPY analytics/pnpm-lock.yaml .
COPY analytics/tsconfig.json .

RUN pnpm install
RUN pnpm run build

CMD [ "node", "/build/index.js" ]
