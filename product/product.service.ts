import { client } from "../prisma-client/prisma";
import { AddProductDto, EditProductDto } from "./dto/product.dto";

async function getAllProducts() {
  const products = await client.product.findMany();
  // console.log(products);
  return products;
}

async function addProduct(productData: AddProductDto) {
  try {
    const product = await client.product.create({
      data: {
        productname: productData.productname,
        productdesc: productData.productdesc,
        price: productData.price,
        status: productData.status,
      },
    });
    // console.log(product);
    return product;
  } catch (e) {
    console.log(e);
  }
}

async function editProduct(productData: EditProductDto) {
  try {
    const edited = await client.product.update({
      where: {
        id: productData.id,
      },
      data: {
        productname: productData.productname,
        productdesc: productData.productdesc,
        price: productData.price,
        status: productData.status,
      },
    });
    // console.log(edited);
    return edited;
  } catch (e) {
    console.log(e);
  }
}

export { addProduct, getAllProducts, editProduct };
