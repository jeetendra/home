import { connect } from "nats";

async function startService() {
    try {
        const nc = await connect({
            servers: 'nats://localhost:4222'
        });

        console.log('Service connected to NATS');

        // Create reply subscription
        const subscription = nc.subscribe('service.query');
        console.log('Service listening on "service.query"...');

        // Process requests
        for await (const msg of subscription) {
            try {
                const request = JSON.parse(msg.data);
                console.log('Request received:', request);

                // Simulate processing time
                await new Promise(resolve => setTimeout(resolve, 100));

                // Process request and create response
                const response = {
                    success: true,
                    timestamp: new Date().toISOString(),
                    data: {
                        requestId: request.id,
                        result: `Processed request ${request.id}`,
                        action: request.action
                    }
                };

                // Send response
                msg.respond(JSON.stringify(response));

            } catch (error) {
                // Send error response
                msg.respond(JSON.stringify({
                    success: false,
                    error: error.message
                }));
            }
        }

        // Handle graceful shutdown
        process.on('SIGINT', async () => {
            console.log('\nShutting down service...');
            await nc.drain();
            await nc.close();
            process.exit(0);
        });

    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

startService().catch(console.error);
