# Use an official Node.js image
FROM node:22

# Install required packages (for `pdftoppm`)
RUN apt-get update && apt-get install -y poppler-utils


# Set the working directory
WORKDIR /src

# Install nodemon globally
RUN npm install -g nodemon

# Copy package.json & package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire application
COPY . .

# Expose the port (Change if your app uses a different port)
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
