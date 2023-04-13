// Require the framework and instantiate it
require('dotenv').config()
const fastify = require('fastify')({ logger: process.env.LOGGER })
const mysqlpool = require('./lib/mysql')

// Declare a route
fastify.get('/', async (request, reply) => {
    const [rows, fields] = await mysqlpool.query("SELECT 1");
    return { rows }
})

// Run the server!
const start = async () => {
    try {
        await fastify.listen({ port: process.env.PORT })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()