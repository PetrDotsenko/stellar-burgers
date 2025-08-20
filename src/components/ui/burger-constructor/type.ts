import { TConstructorIngredient, TOrder } from '@utils-types';
import { ConstructorState } from '../../../services/slices/constructor-slice';

export type BurgerConstructorUIProps = {
  constructorItems: ConstructorState;
  orderRequest: boolean;
  price: number;
  orderModalData: TOrder | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
