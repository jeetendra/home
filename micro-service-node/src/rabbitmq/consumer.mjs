import  {  connect  }  from  'amqplib' ;

const  consumer  =  async  ()  =>  {
    const  connection  =  await  connect ( 'amqp://localhost' );
    const  channel  =  await  connection.createChannel();
    const  queue  =  'queue' ;

    await  channel.assertQueue(queue, {durable:  false });
    console.log( 'Waiting for messages in queue' );
    channel.consume(queue, (message)  =>  {
        console.log( `Received message:  ${message.content.toString()}` );
    }, {noAck:  true });
};

consumer().catch(console.error);

