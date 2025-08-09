export interface Product {
  id: string
  title: string
  price: number
  description: string
  image: string
  category: string
}

// Minimal product projection aligned with frontend mock data
// id, title, image, description, price, category
export const products: Product[] = [
  {
    id: 'ww-001',
    title: 'Printed Pure Cotton Top',
    price: 679,
    description: 'Pure cotton top with contemporary printed motifs and relaxed fit.',
    image:
      'https://images.pexels.com/photos/28213774/pexels-photo-28213774.jpeg?cs=srgb&dl=pexels-tavsi-apparel-1772629605-28213774.jpg&fm=jpg',
    category: 'Women',
  },
  {
    id: 'ww-002',
    title: 'Ethnic Motifs Printed Kurta',
    price: 713,
    description: 'Straight fit kurta with ethnic motifs and breathable fabric.',
    image: 'https://www.libas.in/cdn/shop/files/1_33a25d6e-c493-49fd-9ae7-3e415440e6ee.jpg?v=1739181170',
    category: 'Women',
  },
  {
    id: 'ww-003',
    title: 'Women Printed Top',
    price: 499,
    description: 'Rustic printed top with flared hem and vibrant palette.',
    image: 'https://thejaipurloom.com/wp-content/uploads/2024/02/Picture3.jpg',
    category: 'Women',
  },
  {
    id: 'ww-004',
    title: 'Ethnic Motifs Cotton Kurti',
    price: 987,
    description: 'Breathable cotton kurti with delicate ethnic prints.',
    image:
      'https://cdn.sareeka.com/image/cache/data2024/blue-georgette-casual-kurti-in-plain-for-women-278882-1000x1375.jpg',
    category: 'Women',
  },
  {
    id: 'ww-005',
    title: 'Bandhani Printed Kurti',
    price: 1299,
    description: 'Classic bandhani printed kurti with contrast yoke.',
    image:
      'https://i.pinimg.com/videos/thumbnails/originals/e6/2c/ee/e62cee9d090c85476d551432e7c647ce.0000000.jpg',
    category: 'Women',
  },
]

