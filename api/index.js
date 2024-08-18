import express from "express"; // Import the Express framework
import connectToDatabase from "./db/conn.js"; // Import the database connection function
import categoryRoutes from "./routes/category.routes.js"; // Import routes for category management
import subCategoryRoutes from "./routes/subcategory.routes.js"; // Import routes for subcategory management
import itemRoutes from "./routes/items.routes.js"; // Import routes for item management
import swaggerUi from 'swagger-ui-express'; // Import swagger-ui-express for serving Swagger UI
import swaggerDocs from './swagger.js'; // Import Swagger documentation configuration

const app = express(); // Initialize an Express application
const port = 5000; // Define the port number where the app will listen

app.use(express.json()); // Middleware to parse incoming JSON requests

// Use the imported routes. These routes will be mounted on the app.
app.use(categoryRoutes); // Routes related to categories
app.use(subCategoryRoutes); // Routes related to subcategories
app.use(itemRoutes); // Routes related to items



// Serve Swagger UI at the /api endpoint
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Define a simple GET route for the root URL
app.get("/", (req, res) => {
  res.send("Hello World!"); // Send a basic response to any GET request on the root URL
});

// Establish the connection to the database before starting the server
connectToDatabase()
  .then(() => {
    // If the connection is successful, start the server
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`); // Log the port number
    });
  })
  .catch((e) => {
    // If there's an error while connecting to the database, log it
    console.log("Error while connecting to the DB", e.message);
  });
