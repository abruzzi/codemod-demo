import { featureToggle } from "./utils/featureToggle";
import type { Product } from "./types.ts";

type ProductListProps = {
  list: Product[];
};

const ProductListLegacy = (props: ProductListProps) => {
  return (
    <ul>
      {props.list.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
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
  const extra = featureToggle("feature-product-list-enhance")
    ? {
        productCount: props.list.length,
        enhanced: true,
      }
    : undefined;

  return featureToggle("feature-product-list-enhance") ? (
    <NewProductList {...props} {...extra} />
  ) : (
    <ProductListLegacy {...props} />
  );
};

export { ProductList };
