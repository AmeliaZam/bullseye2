import { PrismaClient } from 'prisma/prisma-client';
import ExcelJS from 'exceljs';
import { promisify } from 'util';
import { NextApiRequest, NextApiResponse } from 'next';

promisify(require('fs').writeFile);

const prisma = new PrismaClient();

// fix for bigint ids in rjywa_prod db (https://github.com/prisma/studio/issues/614)
// eslint-disable-next-line no-extend-native
BigInt.prototype.toJSON = () => {
  return this.toString();
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await prisma.price_book.findMany({
      select: {
        price_book_id: true,
        price_list: true,
        series: true,
        description: true,
        model: true,
        dealer_cost: true,
        msrp: true,
        type_flag: true,
        pricebook_team: true,
        discontinued: true,
        required: true,
        notes: true,
      },
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Pricebook');
    worksheet.addRow([
      'price_book_id',
      'price_list',
      'series',
      'description',
      'model',
      'dealer_cost',
      'msrp',
      'type_flag',
      'pricebook_team',
      'discontinued',
      // "required",
      // "notes",
    ]);

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < data.length; i++) {
      data[i].price_book_id = data[i].price_book_id?.toString(); // exceljs displays value with quotes without conversion (ie "123" instead of 123)
      data[i].dealer_cost = data[i].dealer_cost?.toNumber(); // exceljs displays value with quotes without conversion (ie "123" instead of 123)
      data[i].msrp = data[i].msrp?.toNumber(); // exceljs displays value with quotes without conversion (ie "123" instead of 123)
      worksheet.addRow([
        data[i].price_book_id,
        data[i].price_list,
        data[i].series,
        data[i].description,
        data[i].model,
        data[i].dealer_cost,
        data[i].msrp,
        data[i].type_flag,
        data[i].pricebook_team,
        data[i].discontinued,
        data[i].required,
        data[i].notes,
      ]);
    }

    worksheet.autoFilter = 'A1:I1';
    worksheet.getColumn('A').width = 14;
    worksheet.getColumn('A').font = { size: 14, name: 'Arial' };
    worksheet.getColumn('B').width = 14;
    worksheet.getColumn('B').font = { size: 14, name: 'Arial' };
    worksheet.getColumn('C').width = 14;
    worksheet.getColumn('C').font = { size: 14, name: 'Arial' };
    worksheet.getColumn('D').width = 100;
    worksheet.getColumn('D').font = { size: 14, name: 'Arial' };
    worksheet.getColumn('E').width = 45;
    worksheet.getColumn('E').font = { size: 14, name: 'Arial' };
    worksheet.getColumn('F').width = 14;
    worksheet.getColumn('F').font = { size: 14, name: 'Arial' };
    worksheet.getColumn('G').width = 14;
    worksheet.getColumn('G').font = { size: 14, name: 'Arial' };
    worksheet.getColumn('H').width = 14;
    worksheet.getColumn('H').font = { size: 14, name: 'Arial' };
    worksheet.getColumn('I').width = 14;
    worksheet.getColumn('I').font = { size: 14, name: 'Arial' };
    worksheet.getColumn('J').width = 14;
    worksheet.getColumn('J').font = { size: 14, name: 'Arial' };
    worksheet.getColumn('K').width = 14;
    worksheet.getColumn('K').font = { size: 14, name: 'Arial' };
    worksheet.getColumn('L').width = 14;
    worksheet.getColumn('L').font = { size: 14, name: 'Arial' };

    const fileName = `pricebook-${new Date()
      .toISOString()
      .substring(0, 10)}.xlsx`;
    // const filePath = path.resolve(
    //   "public/",
    //   fileName
    // );
    // await workbook.xlsx.writeFile(filePath);
    const buffer = await workbook.xlsx.writeBuffer();

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.setHeader('Content-Length', buffer.length);
    res.write(buffer, 'binary');
    res.end();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
