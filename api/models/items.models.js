import mongoose, { Schema } from "mongoose"; // Import Mongoose and Schema constructor

// Define the schema for the Item model
const ItemSchema = new mongoose.Schema({
  name: {
    type: String, // The name of the item
    unique: true, // Ensure that the name is unique across documents
    required: true, // Make the name field required
    trim: true, // Automatically trim whitespace from the name
  },
  image: {
    type: String, // The URL or path to the item's image
    required: true, // Make the image field required
    trim: true, // Automatically trim whitespace from the image URL/path
  },
  description: {
    type: String, // A description of the item
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
  base_amount: {
    type: Number, // The base price of the item before any discounts
    required: true, // Make the base_amount field required
  },
  discount: {
    type: Number, // The discount applied to the item
    required: true, // Make the discount field required
  },
  total_amount: {
    type: Number, // The total amount after discount, calculated before saving
  },
  subcategory: {
    type: Schema.Types.ObjectId, // Reference to the subcategory the item belongs to
    ref: "SubCategoryModel", // Reference the SubCategory model
  },
  category: {
    type: Schema.Types.ObjectId, // Reference to the category the item belongs to
    ref: "CategoryModel", // Reference the Category model
  },
});

// Pre-save hook to calculate total_amount before saving the item
ItemSchema.pre("save", function (next) {
  this.total_amount = this.base_amount - this.discount; // Calculate total_amount as base_amount minus discount
  next(); // Call next to proceed with the save operation
});

// Create the Item model using the schema, with the collection name "items"
const ItemModel = mongoose.model("ItemModel", ItemSchema, "items");

export { ItemModel }; // Export the Item model for use in other parts of the application
