import { useEffect, useState, type FC } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import { Layout } from '../../components/application/Layout';
import { WidthRestriction } from '../../components/foundation/WidthRestriction';
import { ProductMediaListPreviewer } from '../../components/product/ProductMediaListPreviewer';
import { ProductOverview } from '../../components/product/ProductOverview';
import { ProductPurchaseSection } from '../../components/product/ProductPurchaseSeciton';
import { ReviewSection } from '../../components/review/ReviewSection';
import { GetProductDetailsQuery, type GetProductDetailsQueryResponse } from '../../graphql/queries';
import { useActiveOffer } from '../../hooks/useActiveOffer';
import { useAmountInCart } from '../../hooks/useAmountInCart';
import { useAuthUser } from '../../hooks/useAuthUser';
import { useProduct } from '../../hooks/useProduct';
import { useSendReview } from '../../hooks/useSendReview';
import { useUpdateCartItem } from '../../hooks/useUpdateCartItems';
import { useOpenModal } from '../../store/modal';
import { normalizeCartItemCount } from '../../utils/normalize_cart_item';

import styles from './ProductDetail.module.css';

export const ProductDetail: FC = () => {
  const { productId } = useParams();

  const [queryPause, setQueryPause] = useState(true);
  const [product, setProduct] = useState<GetProductDetailsQueryResponse['product'] | undefined>(undefined);

  const { product: _product, reloadProduct } = useProduct(Number(productId), queryPause);
  const { isAuthUser, reloadAuthUser } = useAuthUser();
  const { sendReview } = useSendReview();
  const { updateCartItem } = useUpdateCartItem();
  const handleOpenModal = useOpenModal();
  const { amountInCart } = useAmountInCart(Number(productId));
  const { activeOffer } = useActiveOffer(product?.offers ?? []);
  const handleError = useErrorHandler();

  useEffect(() => {
    setProduct((window as any).__data.product);
  }, []);

  const handleSubmitReview = ({ comment }: { comment: string }) => {
    sendReview({
      variables: {
        comment,
        productId: Number(productId),
      },
    }).then((res) => {
      if (res.error) throw handleError(res.error);
      setQueryPause(false);
      reloadProduct({ requestPolicy: 'network-only' });
      setProduct(_product)
    });
  };

  const handleUpdateItem = (productId: number, amount: number) => {
    updateCartItem({
      variables: { amount: normalizeCartItemCount(amount), productId },
    }).then((res) => {
      if (res.error) throw handleError(res.error);
      reloadAuthUser({ requestPolicy: 'network-only' });
    });
  };

  return (
    <>
      {product && (
        <Helmet>
          <title>{product.name}</title>
        </Helmet>
      )}
      <Layout>
        <WidthRestriction>
          <div className={styles.container}>
            <section className={styles.details}>
              <ProductMediaListPreviewer product={product} />
              <div className={styles.overview}>
                <ProductOverview activeOffer={activeOffer} product={product} />
              </div>
              <div className={styles.purchase}>
                <ProductPurchaseSection
                  amountInCart={amountInCart}
                  isAuthUser={isAuthUser}
                  onOpenSignInModal={() => handleOpenModal('SIGN_IN')}
                  onUpdateCartItem={handleUpdateItem}
                  product={product}
                />
              </div>
            </section>

            <section className={styles.reviews}>
              <h2 className={styles.reviewsHeading}>レビュー</h2>
              <ReviewSection hasSignedIn={isAuthUser} onSubmitReview={handleSubmitReview} reviews={product?.reviews} />
            </section>
          </div>
        </WidthRestriction>
      </Layout>
    </>
  );
};
