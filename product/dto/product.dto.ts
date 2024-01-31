export interface AddProductDto {
  productname: string;
  productdesc: string;
  status: string;
  price: number;
}

export interface EditProductDto {
  id: string;
  productname: string;
  productdesc: string;
  status: string;
  price: number;
}
