import type { FC } from 'react';
import { FaArrowLeft, FaArrowRight, FaCheckCircle, FaPlay, FaShoppingCart, FaUser } from 'react-icons/fa';

const Icons = {
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaPlay,
  FaShoppingCart,
  FaUser,
};

type Props = {
  type: keyof typeof Icons;
  width: number;
  height: number;
  color: string;
};

export const Icon: FC<Props> = ({ color, height, type, width }) => {
  const Icon = Icons[type];
  return (
    <span className={type} style={{ color, height, width }}>
      <Icon />
    </span>
  );
};
