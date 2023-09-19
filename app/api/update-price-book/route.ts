import { NextResponse } from 'next/server';
import db from '@/utils/db';

// eslint-disable-next-line import/prefer-default-export
export async function PATCH(req: Request) {
  const { pricebook, pricebookId } = await req.json();

  try {
    await db.price_book.update({
      where: {
        price_book_id: BigInt(pricebookId),
      },
      data: {
        series: pricebook?.series,
        model: pricebook?.model,
        pricebook_team: pricebook?.pricebook_team,
        cg: pricebook?.cg,
        required: pricebook?.required,
        product_no: pricebook?.product_no,
        description: pricebook?.description,
        dealer_cost: pricebook?.dealer_cost,
        msrp: pricebook?.msrp,
        discontinued: pricebook?.discontinued,
        notes: pricebook?.notes,
      },
    });

    return NextResponse.json(
      {
        message: 'success',
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'failed',
      },
      { status: 500 }
    );
  }
}
