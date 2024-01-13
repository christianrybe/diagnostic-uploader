FROM node:lts-iron

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production --ignore-scripts

# Copy the rest of the app's source code from your host to the image filesystem.
COPY dist/* .

EXPOSE 8000

# Defines the command to run the app
CMD ["node", "app.js"]