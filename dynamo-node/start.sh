#!/bin/sh

# Function to stop the Docker container
stop_docker() {
  echo "Stopping Docker container..."
  docker stop dynamodb-local
}

# Trap the EXIT signal to stop the Docker container
trap stop_docker EXIT

# Start Docker container
echo "Starting Docker container..."
docker run --rm -d -p 9000:8000 --name dynamodb-local amazon/dynamodb-local

# Check if Docker container is running
echo "Checking if Docker container is running..."
if ! docker ps | grep -q dynamodb-local; then
  echo "Docker container is not running. Exiting..."
  exit 1
fi

# Wait for DynamoDB Local to be ready
echo "Waiting for DynamoDB Local to be ready..."
while ! curl -s http://localhost:9000 > /dev/null; do
  echo "Waiting for DynamoDB Local to be ready..."
  sleep 2
done

# Check if the port is accessible
echo "Checking if the port is accessible..."
curl -s http://localhost:9000 || { echo "Port 9000 is not accessible"; exit 1; }

# Start the application
echo "Starting the application..."
npm start
