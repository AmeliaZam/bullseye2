/* eslint-disable @typescript-eslint/naming-convention */
import { NextResponse } from 'next/server';
import arrayToJSON from '@/utils/arrayToJSON';
import db from '@/utils/db';
import { PriceBookRecordType } from '@/pageComponents/PriceList/PriceList.types';

// eslint-disable-next-line import/prefer-default-export
export async function POST(req: Request) {
  const { jsonData } = await req.json();

  const arrayToJSONData = arrayToJSON(jsonData);

  let offendingRow;
  try {
    const rowsToInsert = [];
    const rowsToUpdate = [];

    const existingRowPromises = arrayToJSONData.map(
      async (obj: PriceBookRecordType) => {
        const price_book_id = obj?.price_book_id;

        offendingRow = price_book_id;

        return db.price_book.findUnique({
          where: { price_book_id },
        });
      }
    );

    const existingRows = await Promise.all(existingRowPromises);

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < arrayToJSONData.length; i++) {
      const obj = arrayToJSONData[i];
      const existingRow = existingRows[i];

      const {
        price_book_id,
        series,
        model,
        pricebook_team,
        cg,
        required,
        product_no,
        description,
        dealer_cost,
        msrp,
        discontinued,
        notes,
      } = obj;

      if (existingRow) {
        const isDifferent =
          existingRow.series !== series ||
          existingRow.model !== model ||
          existingRow.pricebook_team !== pricebook_team ||
          existingRow.cg !== cg ||
          existingRow.required !== required ||
          existingRow.product_no !== product_no ||
          existingRow.description !== description ||
          existingRow.dealer_cost !== dealer_cost ||
          existingRow.msrp !== msrp ||
          existingRow.discontinued !== discontinued ||
          existingRow.notes !== notes;

        if (isDifferent) {
          rowsToUpdate.push({
            where: { price_book_id },
            data: {
              series,
              model,
              pricebook_team,
              cg,
              required,
              product_no,
              description,
              dealer_cost,
              msrp,
              discontinued,
              notes,
            },
          });
        }
      } else {
        rowsToInsert.push({
          series,
          model,
          pricebook_team,
          cg,
          required,
          product_no,
          description,
          dealer_cost,
          msrp,
          discontinued,
          notes,
        });
      }
    }

    if (rowsToInsert.length > 0) {
      await db.price_book.createMany({ data: rowsToInsert });
    }

    if (rowsToUpdate.length > 0) {
      await db.price_book.updateMany({ data: rowsToUpdate });
    }

    return NextResponse.json(
      {
        message: 'success',
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to import data',
        offendingRow: `${offendingRow}`,
      },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
}
