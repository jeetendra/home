import * as protoLoader from '@grpc/proto-loader';
import * as grpc from '@grpc/grpc-js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROTO_PATH = join(__dirname, '../protos/service.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const { micro: { service: { node: { Greeter } } } } = grpc.loadPackageDefinition(packageDefinition);

// Implement the service
const sayHello = (call, callback) => {
  const { name } = call.request;
  callback(null, { message: `Hello ${name}!` });
};

// Create and start server
const startServer = () => {
  const server = new grpc.Server();
  server.addService(Greeter.service, { sayHello });
  
  server.bindAsync(
    '0.0.0.0:50051',
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error('Server failed to start:', err);
        return;
      }
      
      console.log(`Server running at http://0.0.0.0:${port}`);
    }
  );
};

startServer();