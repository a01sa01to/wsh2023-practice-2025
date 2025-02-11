import { type FC, lazy } from 'react';
import * as Router from 'react-router-dom';

const NotFound = lazy(() => import('../../../pages/NotFound').then(mod => ({ default: mod.NotFound })));
const Order = lazy(() => import('../../../pages/Order').then(mod => ({ default: mod.Order })));
const OrderComplete = lazy(() => import('../../../pages/OrderComplete').then(mod => ({ default: mod.OrderComplete })));
const ProductDetail = lazy(() => import('../../../pages/ProductDetail').then(mod => ({ default: mod.ProductDetail })));
const Top = lazy(() => import('../../../pages/Top').then(mod => ({ default: mod.Top })));

import { useScrollToTop } from './hooks';

export const Routes: FC = () => {
  useScrollToTop();

  return (
    <Router.Routes>
      <Router.Route element={<Top />} path="/" />
      <Router.Route element={<ProductDetail />} path="/product/:productId" />
      <Router.Route element={<Order />} path="/order" />
      <Router.Route element={<OrderComplete />} path="/order/complete" />
      <Router.Route element={<NotFound />} path="*" />
    </Router.Routes>
  );
};
