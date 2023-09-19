import { NextResponse } from 'next/server';
import db from '@/utils/db';

// eslint-disable-next-line import/prefer-default-export
export async function POST(req: Request) {
  const { pricebook } = await req.json();

  try {
    await db.price_book.create({
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
