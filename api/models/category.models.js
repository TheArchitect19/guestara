import mongoose from "mongoose"; // Import Mongoose library for MongoDB interactions

// Define a schema for the Category model
const CategorySchema = new mongoose.Schema({
  name: {
    type: String, // The name of the category
    unique: true, // Ensure that the name is unique across documents
    required: true, // Make the name field required
    trim: true, // Automatically trim whitespace from the name
  },
  image: {
    type: String, // The URL or path to the category's image
    required: true, // Make the image field required
    trim: true, // Automatically trim whitespace from the image URL/path
  },
  description: {
    type: String, // A description of the category
    required: true, // Make the description field required
    trim: true, // Automatically trim whitespace from the description
  },
  tax_applicable: {
    type: Boolean, // Boolean field indicating if tax is applicable
    required: true, // Make the tax_applicable field required
    trim: true, // Trim is unnecessary for Boolean type, but no harm in having it
  },
  tax: {
    type: Number, // The tax percentage or amount applicable
    trim: true, // Automatically trim any whitespace (though not common for numbers)
  },
});

// Create the Category model using the schema, with the collection name "categories"
const CategoryModel = mongoose.model(
  "CategoryModel", // The name of the model
  CategorySchema, // The schema associated with the model
  "categories" // The name of the collection in MongoDB
);

export { CategoryModel }; // Export the Category model for use in other parts of the application
