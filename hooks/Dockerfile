FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 8002

ENV DATABASE_URL=postgresql://postgres:postgres@postgres:5432/macrobridge
ENV JWT_SECRET=my_jwt_secret

CMD ["npm", "run", "start"]