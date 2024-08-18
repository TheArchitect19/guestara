import { CategoryModel } from "../models/category.models.js"; // Import the Category model
import { ItemModel } from "../models/items.models.js"; // Import the Item model

// Controller to create a new category
const createCategory = async (req, res) => {
  try {
    const categoryDocument = new CategoryModel(req.body); // Create a new category document from the request body
    await categoryDocument.save(); // Save the category to the database
    res.status(201).json({ ok: true, message: "Category created." }); // Respond with success status
  } catch (error) {
    // Handle duplicate key error (e.g., category already exists)
    if (error.code && error.code === 11000) {
      res
        .status(400)
        .json({ ok: false, message: "The category is already available." });
    } else {
      // Handle any other errors
      res
        .status(500)
        .json({ ok: false, message: "Some error occurred", error: error });
    }
  }
};

// Controller to get categories with optional filters
const getCategories = async (req, res) => {
  try {
    const nameFilter = req.query.name; // Extract name filter from query parameters
    const idFilter = req.query.id; // Extract id filter from query parameters

    let categories = await CategoryModel.find(); // Fetch all categories from the database

    // Apply filters based on query parameters
    if (nameFilter && idFilter) {
      categories = categories.filter(
        (c) => c.name === nameFilter && c._id === idFilter
      );
    } else if (nameFilter) {
      categories = categories.filter((c) => c.name === nameFilter);
    } else if (idFilter) {
      categories = categories.filter((c) => c._id.toString() === idFilter);
    } else {
      categories = categories.map((c) => c.name); // Return only category names if no filters are applied
    }

    res.status(200).json({ ok: true, categories: categories }); // Respond with the filtered categories
  } catch (error) {
    res
      .status(500)
      .json({ ok: false, message: "Some error occurred", error: error });
  }
};

// Controller to update a category by ID
const updateCategory = async (req, res) => {
  try {
    await CategoryModel.updateOne({ _id: req.params.id }, req.body); // Update the category with the new data
    res.status(201).json({ ok: true, message: "Updated successfully." }); // Respond with success status
  } catch (error) {
    res
      .status(500)
      .json({ ok: false, message: "Some error occurred", error: error });
  }
};

// Controller to create a new item within a category
const createCategoryItem = async (req, res) => {
  try {
    const categoryId = req.params.id; // Extract category ID from the request parameters
    const category = await CategoryModel.findById(categoryId); // Find the category by ID

    // If the category does not exist, return a 404 error
    if (!category) {
      return res.status(404).json({ ok: false, message: "Category not found" });
    }

    const itemData = req.body;
    itemData.category = categoryId; // Associate the new item with the category ID

    await new ItemModel(itemData).save(); // Save the new item to the database
    res.status(201).json({ ok: true, message: "Item created." }); // Respond with success status
  } catch (error) {
    res
      .status(500)
      .json({ ok: false, message: "Some error occurred.", error: error });
  }
};

export { createCategory, getCategories, updateCategory, createCategoryItem }; // Export the controller functions
