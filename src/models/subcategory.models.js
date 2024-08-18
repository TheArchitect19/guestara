import mongoose, { Schema } from "mongoose"; // Import Mongoose and Schema constructor

// Define the schema for the SubCategory model
const SubCategorySchema = new mongoose.Schema({
  name: {
    type: String, // The name of the subcategory
    unique: true, // Ensure that the name is unique across documents
    required: true, // Make the name field required
    trim: true, // Automatically trim whitespace from the name
  },
  image: {
    type: String, // The URL or path to the subcategory's image
    required: true, // Make the image field required
    trim: true, // Automatically trim whitespace from the image URL/path
  },
  description: {
    type: String, // A description of the subcategory
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
  parent: {
    type: Schema.Types.ObjectId, // Reference to the parent category
    ref: "CategoryModel", // Reference the Category model
  },
});

// Create the SubCategory model using the schema, with the collection name "subcategories"
const SubCategoryModel = mongoose.model(
  "SubCategoryModel", // The name of the model
  SubCategorySchema, // The schema associated with the model
  "subcategories" // The name of the collection in MongoDB
);

export { SubCategoryModel }; // Export the SubCategory model for use in other parts of the application
