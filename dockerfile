FROM node:20.19.3-alpine3.22 AS builder

WORKDIR /app

COPY ./package*.json .

RUN npm install -g pnpm@latest-10

RUN pnpm i

COPY . .

RUN pnpm build

FROM nginx:latest

COPY --from=builder /app/dist /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]