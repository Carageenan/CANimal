FROM node:16.14

WORKDIR /user/local/orchestrator

ENV PASSWORD_REDIS = dqqg4xi2Q611YSjiyKfCjWl31uFcr1Vf

COPY package.json package-lock.json /user/local/orchestrator/

RUN npm install && npm cache clean --force

COPY ./ ./

CMD ["npm", "run", "start"]
