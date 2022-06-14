FROM node:16

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY analytics/src ./src

COPY analytics/package.json .
COPY analytics/tsconfig.json .

ENV REPOSITORY_ROOT .
RUN mkdir repository

VOLUME $REPOSITORY_ROOT /repository

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

RUN npm run build
# Bundle app source

CMD [ "node", "build/index.js" ]