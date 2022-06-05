FROM node:alpine

WORKDIR /app

# Copy source 
COPY . .

# Install deps
RUN  npm install

# Build 
RUN npm run build

EXPOSE 3000

CMD ["npm","run","start"]