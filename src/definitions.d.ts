interface Product {
  _id: string;
  title: string;
  description: string;
  image_path: string;
  in_stock: boolean;
  price: number;
}

interface ProductInCart extends Product {
  quantity: number;
}
