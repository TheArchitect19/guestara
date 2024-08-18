import { CategoryModel } from "../models/category.models.js"; // Import the Category model
import { SubCategoryModel } from "../models/subcategory.models.js"; // Import the SubCategory model

// Function to check if a category exists by its ID
const isCategoryPresent = async (id) => {
  try {
    const category = await CategoryModel.findById(id); // Find category by ID
    return category; // Return the category if found
  } catch (error) {
    return null; // Return null if an error occurs or category is not found
  }
};

// Controller to get subcategories by parent category ID
const getSubCategoriesByParent = async (req, res) => {
  const parentId = req.params.parent; // Extract parent category ID from request parameters
  let subcategories = await SubCategoryModel.find({ parent: parentId }); // Find subcategories by parent ID

  subcategories = subcategories.map((c) => c.name); // Map to subcategory names
  res.status(200).json({ subcategories: subcategories }); // Respond with the subcategory names
};

// Controller to get subcategories with optional filters
const getSubCategories = async (req, res) => {
  const nameFilter = req.query.name; // Extract name filter from query parameters
  const idFilter = req.query.id; // Extract id filter from query parameters
  let subcategories = await SubCategoryModel.find(); // Fetch all subcategories from the database

  // Apply filters based on query parameters
  if (nameFilter && idFilter) {
    subcategories = subcategories.filter(
      (c) => c.name === nameFilter && c._id === idFilter
    );
  } else if (nameFilter) {
    subcategories = subcategories.filter((c) => c.name === nameFilter);
  } else if (idFilter) {
    subcategories = subcategories.filter((c) => c._id.toString() === idFilter);
  } else {
    subcategories = subcategories.map((c) => c.name); // Return only subcategory names if no filters are applied
  }

  try {
    res.status(200).json({ ok: true, subcategories: subcategories }); // Respond with the filtered subcategories
  } catch (error) {
    res
      .status(500)
      .json({ ok: false, message: "Some error occurred", error: error }); // Handle any errors
  }
};

// Controller to create a new subcategory under a specific parent category
const createSubCategory = async (req, res) => {
  const categoryId = req.params.id; // Extract category ID from request parameters
  const category = await isCategoryPresent(categoryId); // Check if the parent category exists

  // If the parent category is not found, return a 404 error
  if (!category)
    return res
      .status(404)
      .json({ ok: false, message: "Parent category not found" });

  const subCategoryData = req.body; // Get subcategory data from request body

  // Set tax-related fields if not provided, using parent category's values as default
  if (!subCategoryData.tax_applicable) {
    subCategoryData.tax_applicable = category.tax_applicable;
  }
  if (!subCategoryData.tax) {
    subCategoryData.tax = category.tax;
  }
  subCategoryData.parent = categoryId; // Associate the new subcategory with the parent category

  try {
    const subCategoryDoc = new SubCategoryModel(subCategoryData); // Create a new subcategory document
    await subCategoryDoc.save(); // Save the subcategory to the database

    res
      .status(201)
      .json({ ok: true, message: "Subcategory created successfully." }); // Respond with success status
  } catch (error) {
    // Handle duplicate key error (e.g., subcategory already exists)
    if (error.code && error.code === 11000) {
      return res
        .status(400)
        .json({ ok: false, message: "The subcategory is already available." });
    }
    res
      .status(500)
      .json({ ok: false, message: "Some error occurred", error: error }); // Handle any other errors
  }
};

// Controller to update a subcategory by ID
const updateSubCategory = async (req, res) => {
  try {
    await SubCategoryModel.updateOne({ _id: req.params.id }, req.body); // Update the subcategory with the provided data
    res.status(201).json({ ok: true, message: "Updated successfully." }); // Respond with success status
  } catch (error) {
    res
      .status(500)
      .json({ ok: false, message: "Some error occurred", error: error }); // Handle any errors
  }
};

// Controller to create a new item under a specific subcategory
const createSubCategoryItem = async (req, res) => {
  try {
    const subcategoryId = req.params.id; // Extract subcategory ID from request parameters
    const subcategory = await SubCategoryModel.findById(subcategoryId); // Find the subcategory by ID

    // If the subcategory does not exist, return a 404 error
    if (!subcategory) {
      return res
        .status(404)
        .json({ ok: false, message: "Subcategory not found" });
    }

    const itemData = req.body; // Get item data from request body
    itemData.subcategory = subcategoryId; // Associate the new item with the subcategory

    await new ItemModel(itemData).save(); // Save the new item to the database
    res.status(201).json({ ok: true, message: "Item created." }); // Respond with success status
  } catch (error) {
    res
      .status(500)
      .json({ ok: false, message: "Some error occurred.", error: error }); // Handle any errors
  }
};

export {
  createSubCategory,
  getSubCategories,
  getSubCategoriesByParent,
  updateSubCategory,
  createSubCategoryItem,
};
