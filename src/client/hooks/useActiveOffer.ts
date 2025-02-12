import { useEffect, useState } from 'react';

import type { LimitedTimeOfferFragmentResponse } from '../graphql/fragments';
import { getActiveOffer } from '../utils/get_active_offer';

export function useActiveOffer(offers: LimitedTimeOfferFragmentResponse[]) {
  const [activeOffer, setActiveOffer] = useState<LimitedTimeOfferFragmentResponse | undefined>(undefined);

  useEffect(() => {
    const timer = setInterval(() => {
      const offer = getActiveOffer(offers);
      setActiveOffer(offer);
    }, 0);

    return () => {
      clearInterval(timer);
    };
  }, [offers]);

  return { activeOffer };
}
