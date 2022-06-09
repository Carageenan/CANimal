FROM node:16.14

WORKDIR /user/local/app

ENV JWT_SECRET = apaAjaBoleh

COPY package.json package-lock.json /user/local/app/

RUN npm install && npm cache clean --force

COPY ./ ./

CMD ["npm", "run", "start"]
