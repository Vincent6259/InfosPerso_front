FROM node:20.19.3-alpine3.22 AS builder

WORKDIR /app

COPY ./package.json .

RUN npm install -g pnpm@latest-10

RUN pnpm i

COPY . .

ENV VITE_API_LOCAL_URL=http://localhost:3000/

RUN pnpm build

FROM nginx:latest

COPY --from=builder /app/dist /usr/share/nginx/html/
COPY --from=builder /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
