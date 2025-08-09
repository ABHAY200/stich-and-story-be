import { Router } from 'express'
import { getProducts, getProductById } from '../controllers/productController.js'

/**
 * Router that exposes product-related endpoints.
 * - GET / -> list products
 * - GET /:id -> get product by id
 */
const router = Router()

router.get('/', getProducts)
router.get('/:id', getProductById)

export default router

