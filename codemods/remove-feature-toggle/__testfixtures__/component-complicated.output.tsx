import type { Product } from "./types.ts";

type ProductListProps = {
  list: Product[];
};

const NewProductList = (props: ProductListProps) => {
  return (
    <ul>
      {props.list.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};

const ProductList = (props: ProductListProps) => {
  const extra = {
    productCount: props.list.length,
    enhanced: true,
  };

  return (<NewProductList {...props} {...extra} />);
};

export { ProductList };