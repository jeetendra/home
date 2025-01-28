# Micro Service Node

## Description
A simple gRPC microservice built with Node.js using ES Modules.

## Installation
```bash
yarn install
```

## Usage

### Start the Server
```bash
yarn server
```

### Run the Client (in a separate terminal)
```bash
yarn client
```

## Project Structure
```
.
├── src/
│   ├── server.mjs    # gRPC server implementation
│   └── client.mjs    # Test client
├── protos/
│   └── service.proto # Service definitions
└── package.json
```

## Service Definition
The service implements a simple greeting:
```protobuf
service Greeter {
  rpc SayHello (HelloRequest) returns (HelloResponse) {}
}
```

## License
ISC