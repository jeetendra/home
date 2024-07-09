const express = require('express');
const redis = require('redis');

async function pubsubInit() {
    const client = redis.createClient(6379,'127.0.0.1');
    await client.connect();

    client.subscribe("pubsub", function(message, channel){
        console.log(channel + ": " + message);
    });
  
    client.on("error", function(){
        console.log("Error in subscription");
    })
} 

pubsubInit();

async function connectRedis() {
    const redisClient = redis.createClient(6379,'127.0.0.1');

    redisClient.on('error', (err) => {
        console.log('Error occured while connecting or accessing redis server');
    });

    await redisClient.connect();

    if(! await redisClient.get('customer_name')) {
        //create a new record
        redisClient.set('customer_name','John Doe');
        console.log('Writing Property : customer_name');
    } else {
        let val = await redisClient.get('customer_name');
        console.log(`Reading property : customer_name - ${val}`);
    }
}



const PORT = 5001;

const app = express();

const router = express.Router();

app.use(express.json());

router.get('/', async (req,res) => {
    await connectRedis();
    res.status(200).json({
        message : "Sample Docker Redis Application"
    });
});

app.use(router);

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});