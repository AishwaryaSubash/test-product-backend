import { Prisma } from "@prisma/client";
import { client } from "../prisma-client/prisma";
import {
  AddProductDto,
  EditProductDto,
  GetOneProductDto,
} from "./dto/product.dto";

async function getAllProducts() {
  try {
    const products = await client.product.findMany();
    // console.log(products);
    return { fetched: true, products: products };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return { fetched: false, message: e };
    } else {
      return { fetched: false, message: e };
    }
  }
}

async function getOneProduct(productData: GetOneProductDto) {
  try {
    const product = await client.product.findUniqueOrThrow({
      where: {
        id: productData.id,
      },
    });
    return { fetched: true, product: product };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return { fetched: false, message: e };
    } else {
      return { fetched: false, message: e };
    }
  }
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
    // return product;
    return { added: true, product: product };
  } catch (e) {
    console.log(e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return { added: false, message: e };
    } else {
      return { added: false, message: e };
    }
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
    // return edited;
    return { edited: true, product: edited };
  } catch (e) {
    console.log(e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return { edited: false, message: e };
    } else {
      return { edited: false, message: e };
    }
  }
}

export { addProduct, getAllProducts, editProduct, getOneProduct };
