import { ItemModel } from "../models/items.models.js"; // Import the Item model

// Controller to search for items by name (case-insensitive)
const searchItem = async (req, res) => {
  try {
    const name = req.query.name; // Extract name query parameter
    const items = name
      ? await ItemModel.find({
          name: { $regex: name, $options: "i" }, // Perform case-insensitive search using regex
        })
      : []; // If no name is provided, return an empty array
    res.status(201).json({ ok: true, items: items }); // Respond with found items
  } catch (error) {
    res
      .status(500)
      .json({ ok: false, message: "Some error occurred", error: error }); // Handle any errors
  }
};

// Controller to update an item by ID
const updateItem = async (req, res) => {
  try {
    await ItemModel.updateOne({ _id: req.params.id }, req.body); // Update the item with the provided data
    res.status(201).json({ ok: true, message: "Updated successfully." }); // Respond with success status
  } catch (error) {
    res
      .status(500)
      .json({ ok: false, message: "Some error occurred", error: error }); // Handle any errors
  }
};

// Controller to get items with optional filters
const getItems = async (req, res) => {
  try {
    const nameFilter = req.query.name; // Extract name filter from query parameters
    const idFilter = req.query.id; // Extract id filter from query parameters

    let items = await ItemModel.find(); // Fetch all items from the database

    // Apply filters based on query parameters
    if (nameFilter && idFilter) {
      items = items.filter((c) => c.name === nameFilter && c._id === idFilter);
    } else if (nameFilter) {
      items = items.filter((c) => c.name === nameFilter);
    } else if (idFilter) {
      items = items.filter((c) => c._id.toString() === idFilter);
    } else {
      items = items.map((c) => c.name); // Return only item names if no filters are applied
    }
    res.status(200).json({ ok: true, items: items }); // Respond with the filtered items
  } catch (error) {
    res
      .status(500)
      .json({ ok: false, message: "Some error occurred", error: error }); // Handle any errors
  }
};

// Controller to get items by category ID
const getCategoryItems = async (req, res) => {
  try {
    const categoryId = req.params.id; // Extract category ID from the request parameters
    const items = await ItemModel.find({ category: categoryId }); // Find items by category ID
    res.status(200).json({ ok: true, items: items }); // Respond with found items
  } catch (error) {
    // Handle any errors, but mistakenly returns ok: true (should be false)
    res
      .status(200)
      .json({ ok: true, message: "Some error occurred", error: error });
  }
};

// Controller to get items by subcategory ID
const getSubCategoryItems = async (req, res) => {
  try {
    const subcategoryId = req.params.id; // Extract subcategory ID from the request parameters
    const items = await ItemModel.find({ subcategory: subcategoryId }); // Find items by subcategory ID
    res.status(200).json({ ok: true, items: items }); // Respond with found items
  } catch (error) {
    // Handle any errors, but mistakenly returns ok: true (should be false)
    res
      .status(200)
      .json({ ok: true, message: "Some error occurred", error: error });
  }
};

export {
  getItems,
  getCategoryItems,
  getSubCategoryItems,
  updateItem,
  searchItem,
};
