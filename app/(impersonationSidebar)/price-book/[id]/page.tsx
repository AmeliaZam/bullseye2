import React from 'react';
import PriceBookForm from '@/pageComponents/PriceBookForm';
import db from '@/utils/db';

interface PriceBookPageParams {
  id: string;
}

interface PriceBookPageProps {
  params: PriceBookPageParams;
}

const PriceBookPage = async ({ params }: PriceBookPageProps) => {
  const { id } = params;

  try {
    const data = await db.price_book.findUnique({
      where: {
        price_book_id: BigInt(id),
      },
      select: {
        series: true,
        model: true,
        pricebook_team: true,
        cg: true,
        required: true,
        product_no: true,
        description: true,
        dealer_cost: true,
        msrp: true,
        discontinued: true,
        notes: true,
      },
    });

    return <PriceBookForm id={id} data={data} />;
  } catch {
    return <h1>Failed to fetch data from API</h1>;
  }
};

export default PriceBookPage;
