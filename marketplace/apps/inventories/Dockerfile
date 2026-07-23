FROM node:22-alpine AS dev
WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .

FROM node:22-alpine AS build

WORKDIR /app
COPY --from-development ./app/node_modules ./node_modules
COPY . .
RUN npm run build

RUN npm ci --only=production && npm cache clean --force

FROM node:22-alpine AS production
WORKDIR /app

COPY --from=build ./app/node_modules ./node_modules
COPY --from=build ./app/dist ./dist

ENV NODE_ENV=production
EXPOSE 12103

CMD ["node", "dist/main"]
