import HttpService from "./HttpService";

class ProductService extends HttpService {
  constructor() {
    super();
  }

  getAllProducts() {
    return this.get(`/product`);
  }

  getProductById(productId: string) {
    return this.get(`/product/${productId}`);
  }

  createProduct(
    productData: {
      name: string;
      price: number;
      stock: number;
      description: string;
    },
    adminId: string
  ) {
    return this.post(`/product/admin/${adminId}`, productData);
  }

  updateProduct(
    productId: string,
    productData: Partial<{
      name: string;
      price: number;
      stock: number;
      description: string;
    }>,
    adminId: string
  ) {
    return this.put(`/product/admin/${adminId}/${productId}`, productData);
  }

  deleteProduct(productId: string, adminId: string) {
    return this.delete(`/product/admin/${adminId}/${productId}`);
  }
}

export default ProductService;
