FROM node:24.5.0 AS build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:24.5.0 AS production

WORKDIR /app

COPY --from=build /app ./

EXPOSE 8888

ENTRYPOINT [ "npm", "run", "serve" ]