FROM node:16

RUN npm install pnpm --location=global

ARG repository_path=./
COPY $repository_path /repository
ENV REPOSITORY_PATH=/repository

COPY analytics/src ./src
COPY analytics/package.json .
COPY analytics/pnpm-lock.yaml .
COPY analytics/tsconfig.json .

RUN pnpm install
RUN pnpm run build

RUN curl -vL --compressed https://github.com/XAMPPRocky/tokei/releases/download/v12.1.2/tokei-x86_64-unknown-linux-gnu.tar.gz --output tokei.tar.gz
RUN tar -xvf tokei.tar.gz

CMD [ "node", "/build/index.js" ]
