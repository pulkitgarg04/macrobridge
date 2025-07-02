# Marcobridge

A powerful automation platform that connects your favorite apps and services to create seamless workflows without code.

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pulkitgarg04/macrobridge.git
   cd macrobridge
   ```

2. **Install dependencies**
   ```bash
   cd client && npm install
   cd ../server && npm install
   cd ../processor && npm install
   cd ../worker && npm install
   cd ../hooks && npm install
   ```

3. **Set up environment variables**
   ```bash
   cp client/.env.example client/.env
   cp server/.env.example server/.env
   cp processor/.env.example processor/.env
   cp worker/.env.example worker/.env
   ```

4. **Configure database**
   ```bash
   cd hooks && npx prisma migrate dev
   cd ../server && npx prisma migrate dev
   cd ../processor && npx prisma migrate dev
   ```

5. **Start development servers**
   ```bash
   # Terminal 1: Start frontend
   cd client && npm run start
   
   # Terminal 2: Start backend
   cd server && npm run start
   
   # Terminal 3: Start processor
   cd processor && npm run start
   
   # Terminal 4: Start worker
   cd worker && npm run start

   # Terminal 5: Start hooks
   cd hooks && npm run start
   ```

6. Run kafka:
   ```bash
   docker run -p 9092:9092 apache/kafka:4.0.0
   docker exec -it <container_id> /bin/bash

   cd /opt/kafka
   ./kafka-topics.sh --create --topic zap-events --bootstrap-server localhost:9092
   ```

7. Open your browser at [http://localhost:3000](http://localhost:3000)

## Contributing


## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.