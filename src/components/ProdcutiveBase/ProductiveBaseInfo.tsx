import { FC } from "react";

type Props = {
  data: {
    id: string;
    address: string;
    name: string;
    route: string;
    state: string;
  };
};

const ProductiveBaseInfo: FC<Props> = ({ data }) => {
  const { address, name, route, state } = data;

  return (
    <div className="p-4 border rounded-lg shadow-lg max-w-md m-4">
      <h2 className="text-2xl font-semibold mb-2">{name}</h2>
      <p className="text-gray-600 mb-4">{address}</p>
      <div className="flex flex-col text-sm text-gray-500">
        <div className="flex justify-between">
          <span>Route:</span>
          <span>{route}</span>
        </div>
        <div className="flex justify-between">
          <span>State/Province:</span>
          <span>{state}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductiveBaseInfo;
