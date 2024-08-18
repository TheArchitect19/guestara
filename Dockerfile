FROM node:latest

# Set the working directory in the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json files into the working directory
COPY package*.json .

# Install the application dependencies
RUN npm install

# Install nodemon globally (useful for development, consider using only in development mode)
RUN npm install -g nodemon

# Copy the rest of the application code into the working directory
COPY . .

# Specify the command to run the application
CMD ["npm", "start"]
