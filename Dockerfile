FROM node:16

RUN npm install -g pnpm

COPY analytics/src ./src

COPY analytics/package.json .
COPY analytics/pnpm-lock.yaml .
COPY analytics/tsconfig.json .

ARG repository_path=./
COPY $repository_path /repository

ENV REPOSITORY_PATH=/repository

RUN pnpm install
RUN pnpm run build

RUN echo $(pwd)
RUN echo $(ls -aR)

CMD [ "node", "build/index.js" ]
