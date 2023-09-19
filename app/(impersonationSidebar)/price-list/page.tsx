import PriceList from '@/pageComponents/PriceList';
import db from '@/utils/db';

const PriceListPage = async () => {
  try {
    const data = await db.price_book.findMany({
      select: {
        price_book_id: true,
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
    return <PriceList data={data} />;
  } catch {
    return <h1>Failed to fetch data from API</h1>;
  }
};

export default PriceListPage;
