import { Router } from "express"; // Import the Router class from Express
import {
  createSubCategory, // Import the function to create a subcategory
  getSubCategories, // Import the function to get all subcategories or apply filters
  getSubCategoriesByParent, // Import the function to get subcategories by parent category
  updateSubCategory, // Import the function to update a subcategory
} from "../controllers/subcategory.controllers.js"; // Import controller functions for subcategories

const router = Router(); // Create a new router instance

// Route to create a new subcategory within a parent category
/**
 * @swagger
 * /subcategory/create/{id}:
 *   post:
 *     summary: Create a new subcategory within a parent category
 *     tags: [Subcategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The parent category ID
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
 *                 example: All electronic gadgets and devices
 *               tax_applicable:
 *                 type: boolean
 *                 example: true
 *               tax:
 *                 type: number
 *                 example: 18
 *     responses:
 *       201:
 *         description: Subcategory created successfully.
 *       404:
 *         description: Parent category not found.
 *       500:
 *         description: Some error occurred.
 */
router.post("/subcategory/create/:id", createSubCategory);

// Route to update an existing subcategory by its ID
/**
 * @swagger
 * /subcategory/update/{id}:
 *   post:
 *     summary: Update an existing subcategory by its ID
 *     tags: [Subcategory]
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
 *                 example: Updated Electronics
 *               description:
 *                 type: string
 *                 example: Updated description for the subcategory
 *               tax_applicable:
 *                 type: boolean
 *                 example: true
 *               tax:
 *                 type: number
 *                 example: 18
 *     responses:
 *       201:
 *         description: Updated successfully.
 *       500:
 *         description: Some error occurred.
 */
router.post("/subcategory/update/:id", updateSubCategory);

// Route to get all subcategories or apply filters based on query parameters
/**
 * @swagger
 * /subcategories:
 *   get:
 *     summary: Get all subcategories or apply filters based on query parameters
 *     tags: [Subcategory]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by subcategory name
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: Filter by subcategory ID
 *     responses:
 *       200:
 *         description: A list of subcategories
 *       500:
 *         description: Some error occurred.
 */
router.get("/subcategories", getSubCategories);

// Route to get subcategories belonging to a specific parent category
/**
 * @swagger
 * /{parent}/subcategories:
 *   get:
 *     summary: Get subcategories belonging to a specific parent category
 *     tags: [Subcategory]
 *     parameters:
 *       - in: path
 *         name: parent
 *         required: true
 *         schema:
 *           type: string
 *         description: The parent category ID
 *     responses:
 *       200:
 *         description: A list of subcategories under the parent category
 *       500:
 *         description: Some error occurred.
 */

router.get("/:parent/subcategories", getSubCategoriesByParent);

export default router; // Export the router for use in other parts of the application
