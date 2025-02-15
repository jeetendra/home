import * as protoLoader from '@grpc/proto-loader';
import * as grpc from '@grpc/grpc-js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROTO_PATH = join(__dirname, '../protos/service.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const { micro: { service: { node: { Greeter } } } } = grpc.loadPackageDefinition(packageDefinition);

// Create client
const client = new Greeter(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

// Test the service
client.sayHello({ name: 'World' }, (err, response) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('Greeting:', response.message);
});
