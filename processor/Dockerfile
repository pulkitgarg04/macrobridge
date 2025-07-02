FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

ENV DATABASE_URL=postgresql://postgres:postgres@postgres:5432/macrobridge
ENV KAFKA_BROKER=kafka:9092

CMD ["npm", "run", "start"]