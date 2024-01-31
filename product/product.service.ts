import { PrismaClient } from "@prisma/client";
import { AddProductDto, EditProductDto } from "./dto/product.dto";

const client = new PrismaClient();

async function getAllProducts() {
  const products = await client.product.findMany();
  console.log(products);
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
    console.log(product);
  } catch (e) {
    console.log(e);
  }
}

async function editProduct(productData: EditProductDto) {
  try {
    console.log(productData.price);
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
    console.log(edited);
  } catch (e) {
    console.log(e);
  }
}

export { addProduct, getAllProducts, editProduct };
