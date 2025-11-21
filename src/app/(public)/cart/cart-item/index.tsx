/* eslint-disable @next/next/no-img-element */
import useCartStore from "@/store/cartStore";
import { ICartItem } from "@/types/backend";
import { formatPrice } from "@/utils/formatPrice";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Card, Space } from "antd";

interface CartItemProps {
  item: ICartItem;
}

const CartItem = ({ item }: CartItemProps) => {
  const { removeItem, increase, decrease } = useCartStore();
  return (
    <Card key={item.vaccine.id} className="!mb-4 rounded-xl shadow-sm border-0">
      <div className="hidden sm:flex items-start">
        <img
          src={item.vaccine.image}
          alt={item.vaccine.name}
          className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
        />

        <div className="flex-1 ml-4">
          <span className="mb-2">{item.vaccine.name}</span>
          <span className="block mb-2">{item.vaccine.country}</span>
          <span className="block mb-2 text-sm text-gray-600">
            {item.vaccine.descriptionShort.slice(0, 50)}
          </span>
          <span className="text-lg font-semibold text-blue-600">
            {formatPrice(item.vaccine.price)}
          </span>
        </div>

        <div className="flex flex-col items-end gap-3 ml-4">
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => removeItem(item.vaccine.id)}
            size="small"
          >
            Remove
          </Button>

          <Space align="center">
            <span>Qty:</span>
            <MinusCircleOutlined onClick={() => decrease(item.vaccine.id)} />
            <span className="px-2"> {item.quantity}</span>
            <PlusCircleOutlined onClick={() => increase(item.vaccine.id)} />
          </Space>

          <span className="text-lg font-semibold text-blue-600">
            {formatPrice(item.vaccine.price * item.quantity)}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default CartItem;
