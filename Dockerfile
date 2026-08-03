FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
COPY artifacts/nivi-chat/package.json ./artifacts/nivi-chat/package.json
COPY lib/api-client-react/package.json ./lib/api-client-react/package.json

RUN npm ci

COPY . .

ENV NODE_ENV=production
ENV PORT=5173
ENV BASE_PATH=/

RUN npm run build --workspace @workspace/nivi-chat

FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/artifacts/nivi-chat/dist/public /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]