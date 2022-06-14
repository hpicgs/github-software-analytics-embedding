FROM node:16

RUN npm install -g pnpm

# Create app directory
WORKDIR /analytics

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY analytics/src ./src

COPY analytics/package.json .
COPY analytics/pnpm-lock.yaml .
COPY analytics/tsconfig.json .

ARG repository_path=./
COPY $repository_path /repository

ENV REPOSITORY_ROOT=/repository

RUN pnpm install
# If you are building your code for production
# RUN npm ci --only=production

RUN pnpm run build
# Bundle app source

CMD [ "node", "build/index.js" ]