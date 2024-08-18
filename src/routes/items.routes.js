import { Router } from "express"; // Import the Router class from Express
import { createCategoryItem } from "../controllers/category.controllers.js"; // Import controller function to create an item in a category
import { createSubCategoryItem } from "../controllers/subcategory.controllers.js"; // Import controller function to create an item in a subcategory
import {
  getCategoryItems, // Import controller function to get items by category
  getItems, // Import controller function to get all items or apply filters
  getSubCategoryItems, // Import controller function to get items by subcategory
  searchItem, // Import controller function to search items
  updateItem, // Import controller function to update an item
} from "../controllers/items.controller.js"; // Import all item-related controller functions

const router = Router(); // Create a new router instance

// Route to create a new item in a specific category
/**
 * @swagger
 * /category/{id}/createItem:
 *   post:
 *     summary: Create a new item in a specific category
 *     tags: [Item]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Laptop
 *               description:
 *                 type: string
 *                 example: High-performance laptop
 *               price:
 *                 type: number
 *                 example: 999.99
 *     responses:
 *       201:
 *         description: Item created.
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Some error occurred.
 */

router.post("/category/:id/createItem", createCategoryItem);

// Route to create a new item in a specific subcategory
/**
 * @swagger
 * /subcategory/{id}/createItem:
 *   post:
 *     summary: Create a new item in a specific subcategory
 *     tags: [Item]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The subcategory ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Smartphone
 *               description:
 *                 type: string
 *                 example: Latest model smartphone
 *               price:
 *                 type: number
 *                 example: 799.99
 *     responses:
 *       201:
 *         description: Item created.
 *       404:
 *         description: Subcategory not found.
 *       500:
 *         description: Some error occurred.
 */
router.post("/subcategory/:id/createItem", createSubCategoryItem);

// Route to update an existing item by its ID
/**
 * @swagger
 * /item/{id}/update:
 *   post:
 *     summary: Update an existing item by its ID
 *     tags: [Item]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Laptop Pro
 *               description:
 *                 type: string
 *                 example: Updated description for the laptop
 *               price:
 *                 type: number
 *                 example: 1199.99
 *     responses:
 *       201:
 *         description: Updated successfully.
 *       500:
 *         description: Some error occurred.
 */
router.post("/item/:id/update", updateItem);

// Route to get all items or apply filters based on query parameters
/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get all items or apply filters based on query parameters
 *     tags: [Item]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by item name
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: Filter by item ID
 *     responses:
 *       200:
 *         description: A list of items
 *       500:
 *         description: Some error occurred.
 */
router.get("/items", getItems);

// Route to search for items based on query parameters
/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search for items by name
 *     tags: [Item]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: The name of the item to search for
 *     responses:
 *       201:
 *         description: Items found.
 *       500:
 *         description: Some error occurred.
 */
router.get("/search", searchItem);

// Route to get all items belonging to a specific category

/**
 * @swagger
 * /category/{id}/items:
 *   get:
 *     summary: Get all items belonging to a specific category
 *     tags: [Item]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       200:
 *         description: A list of items in the category
 *       500:
 *         description: Some error occurred.
 */
router.get("/category/:id/items", getCategoryItems);

// Route to get all items belonging to a specific subcategory
/**
 * @swagger
 * /subcategory/{id}/items:
 *   get:
 *     summary: Get all items belonging to a specific subcategory
 *     tags: [Item]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The subcategory ID
 *     responses:
 *       200:
 *         description: A list of items in the subcategory
 *       500:
 *         description: Some error occurred.
 */
router.get("/subcategory/:id/items", getSubCategoryItems);

export default router; // Export the router for use in other parts of the application
