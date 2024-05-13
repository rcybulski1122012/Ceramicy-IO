FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm ci && npm cache clean --force
COPY . .
EXPOSE 5173
CMD ["npm", "run","dev","--","--host","0.0.0.0"]
