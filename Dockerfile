FROM node:16

RUN npm install -g pnpm

ARG repository_path=./
COPY $repository_path /repository
ENV REPOSITORY_PATH=/repository

COPY analytics/src analytics/src
COPY analytics/package.json analytics
COPY analytics/pnpm-lock.yaml analytics
COPY analytics/tsconfig.json analytics

RUN cd /analytics
RUN pnpm install
RUN pnpm run build

RUN echo $(pwd)
RUN echo $(ls -aR)

CMD [ "node", "/analytics/build/index.js" ]
