import path from "path";
import dotEnv from "dotenv";
import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import fastifyView from "@fastify/view";
import hbs from "hbs";
import { renderApp } from "./providers/renderApp";

// Config env variables
dotEnv.config();

// Read application port from env vars
const PORT = parseInt(process.env.APPLICATION_PORT) || 3000;

// Init fastify app
const app = fastify();

// Serve static files
app.register(fastifyStatic, {
  root: [
    path.join(__dirname, "../../public"),
    path.join(__dirname, "../../dist/client"),
  ],
  prefix: "/static/",
});

// Config view loader
app.register(fastifyView, {
  engine: {
    handlebars: hbs,
  },
});

// Config app routes
app.get("/*", async (request, reply) => {
  const { markup } = renderApp();

  return reply.view("./src/server/views/app.hbs", {
    markup,
  });
});

// Run the fastify server!
const run = async () => {
  try {
    await app.listen({
      port: PORT,
    });

    console.log(`App listening on port :${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

run();
