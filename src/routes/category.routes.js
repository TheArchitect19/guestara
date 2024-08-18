import { Router } from "express"; // Import the Router class from Express
import {
  createCategory, // Import the function to handle category creation
  getCategories, // Import the function to handle fetching categories
  updateCategory, // Import the function to handle updating a category
  createCategoryItem
} from "../controllers/category.controllers.js"; // Import controller functions from the specified file

const router = Router(); // Create a new router instance

// Route to create a new category

/**
 * @swagger
 * /category/create:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Electronics
 *               description:
 *                 type: string
 *                 example: Category for electronic products
 *     responses:
 *       201:
 *         description: Category created.
 *       400:
 *         description: The category is already available.
 *       500:
 *         description: Some error occurred.
 */

router.post("/category/create", createCategory);

// Route to update an existing category by its ID

/**
 * @swagger
 * /category/update/{id}:
 *   post:
 *     summary: Update an existing category by ID
 *     tags: [Category]
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
 *                 example: Electronics and Gadgets
 *               description:
 *                 type: string
 *                 example: Updated description for the category
 *     responses:
 *       201:
 *         description: Updated successfully.
 *       500:
 *         description: Some error occurred.
 */

router.post("/category/update/:id", updateCategory);

// Route to get all categories or filter them based on query parameters

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories or filter them based on query parameters
 *     tags: [Category]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by category name
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: Filter by category ID
 *     responses:
 *       200:
 *         description: A list of categories
 *       500:
 *         description: Some error occurred.
 */
router.get("/categories", getCategories);


/**
 * @swagger
 * /category/{id}/item/create:
 *   post:
 *     summary: Create a new item within a category
 *     tags: [Category]
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
 *                 example: Smartphone
 *               description:
 *                 type: string
 *                 example: A new smartphone item in the Electronics category
 *               price:
 *                 type: number
 *                 example: 499.99
 *     responses:
 *       201:
 *         description: Item created.
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Some error occurred.
 */
router.post("/category/:id/item/create", createCategoryItem);

export default router; // Export the router for use in other parts of the application
