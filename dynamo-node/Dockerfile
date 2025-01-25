# Use the official Amazon DynamoDB Local image from Docker Hub
FROM amazon/dynamodb-local

# Expose the new port for DynamoDB Local
EXPOSE 9000

# Command to run DynamoDB Local on the new port
CMD ["-jar", "DynamoDBLocal.jar", "-sharedDb", "-port", "9000"]
