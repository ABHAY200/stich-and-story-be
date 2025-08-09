import { Request, Response } from 'express'
import { products, Product } from '../data/products.js'

/**
 * Represents an item in the shopping cart.
 */
export interface CartItem {
  /** Product identifier that matches a `Product.id`. */
  productId: string
  /** Quantity of the product to add to the cart (must be positive). */
  quantity: number
}

/**
 * Legacy cart item shape accepted for backward compatibility.
 * Example: { id: 'ww-001', qty: 2 }
 */
type LegacyCartItem = { id: string; qty: number }

/**
 * Represents a saved cart entry in memory.
 */
interface SavedCartRecord {
  id: string
  createdAt: string
  items: CartItem[]
}

/**
 * Represents a user object provided at checkout.
 */
interface CheckoutUser {
  id: string
  name: string
  email: string
}

/**
 * Represents the body for the checkout endpoint.
 */
interface CheckoutBody {
  user: CheckoutUser
  cart: SavedCartRecord | { items: CartItem[] }
  notes?: string | null
}

/**
 * Converts incoming cart items in either the current shape `{ productId, quantity }`
 * or the legacy shape `{ id, qty }` into normalized `CartItem[]`.
 * Returns `null` if validation fails.
 */
function normalizeCartItems(input: unknown): CartItem[] | null {
  if (!Array.isArray(input)) return null

  if (input.every((it) => it && typeof (it as CartItem).productId === 'string')) {
    const casted = input as CartItem[]
    const invalid = casted.some((it) => typeof it.quantity !== 'number' || it.quantity <= 0)
    return invalid ? null : casted
  }

  if (input.every((it) => it && typeof (it as LegacyCartItem).id === 'string')) {
    const legacy = input as LegacyCartItem[]
    const invalid = legacy.some((it) => typeof it.qty !== 'number' || it.qty <= 0)
    if (invalid) return null
    return legacy.map((it) => ({ productId: it.id, quantity: it.qty }))
  }

  return null
}

// In-memory stores for simulation
const cartsInMemory: SavedCartRecord[] = []
const ordersInMemory: Array<{
  id: string
  createdAt: string
  user: CheckoutUser
  cart: SavedCartRecord | { items: CartItem[] }
  notes: string | null
  status: 'confirmed'
}> = []

/**
 * GET /api/products
 * Returns the full list of available products.
 *
 * @param _req - Express request (unused)
 * @param res - Express response
 */
export function getProducts(_req: Request, res: Response): void {
  res.json(products)
}

/**
 * GET /api/products/:id
 * Returns a single product by id or 404 if not found.
 *
 * @param req - Express request with `params.id`
 * @param res - Express response
 */
export function getProductById(req: Request<{ id: string }>, res: Response): Response<Product | { error: string }> {
  const { id } = req.params
  const product = products.find((p) => p.id === id)
  if (!product) {
    return res.status(404).json({ error: 'Product not found' })
  }
  return res.json(product)
}

/**
 * POST /api/cart
 * Stores a cart in memory and returns the id.
 *
 * @param req - Express request with body as `CartItem[]`
 * @param res - Express response
 */
export function postCart(req: Request<unknown, unknown, unknown>, res: Response): Response {
  const normalizedItems = normalizeCartItems(req.body)
  if (!normalizedItems) {
    return res.status(400).json({ error: 'Body must be an array of cart items with productId/id and positive quantity/qty' })
  }

  const cartRecord: SavedCartRecord = {
    id: `cart_${Date.now()}`,
    createdAt: new Date().toISOString(),
    items: normalizedItems,
  }
  cartsInMemory.push(cartRecord)
  // eslint-disable-next-line no-console
  console.log('Cart saved:', cartRecord)

  return res.json({ success: true, message: 'Cart saved', cartId: cartRecord.id, itemsCount: normalizedItems.length })
}

/**
 * POST /api/checkout
 * Simulates order creation from a user and a cart.
 *
 * @param req - Express request with body as `CheckoutBody`
 * @param res - Express response
 */
export function postCheckout(req: Request<unknown, unknown, Partial<CheckoutBody> | any>, res: Response): Response {
  const { user, cart, notes } = (req.body as any) || {}
  if (!user || !cart) {
    return res.status(400).json({ error: 'Missing user or cart in request body' })
  }

  // Accept either: cart is array of items, or cart is { items: [...] }
  const itemsCandidate = Array.isArray(cart) ? cart : (cart && Array.isArray((cart as any).items) ? (cart as any).items : null)
  const normalizedItems = normalizeCartItems(itemsCandidate)
  if (!normalizedItems) {
    return res.status(400).json({ error: 'Cart items invalid. Expect array of items with productId/id and positive quantity/qty' })
  }

  const normalizedCart: SavedCartRecord | { items: CartItem[] } = {
    items: normalizedItems,
  }

  const order = {
    id: `order_${Date.now()}`,
    createdAt: new Date().toISOString(),
    user,
    cart: normalizedCart,
    notes: notes ?? null,
    status: 'confirmed' as const,
  }
  ordersInMemory.push(order)
  // eslint-disable-next-line no-console
  console.log('Order placed:', order)

  return res.json({ success: true, orderId: order.id, status: order.status })
}

