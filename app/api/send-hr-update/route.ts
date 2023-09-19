import { NextResponse } from 'next/server';
import * as z from 'zod';
import {
  getAccessToken,
  getEmailRecipientsData,
  sendHRUpdate,
} from '@/utils/api';
import { ResponseType } from './sendHRUpdates.types';
import getAdaptiveCardJson from './adaptiveCard';

const GRANT_TYPE = 'client_credentials';
const RESOURCE = 'https://graph.microsoft.com';

const sendEmailSchema = z.object({
  emailSubject: z.string(),
  sendFrom: z.string(),
});

type BodyType = z.infer<typeof sendEmailSchema>;

// eslint-disable-next-line import/prefer-default-export
export async function POST(req: Request) {
  const body: BodyType = await req.json();
  try {
    sendEmailSchema.parse(body);
  } catch {
    return NextResponse.json({ message: 'Invalid body' }, { status: 400 });
  }
  const { emailSubject, sendFrom } = body;

  try {
    const [accessTokenResponse, emailReceipientsResponse] = await Promise.all([
      getAccessToken(GRANT_TYPE, RESOURCE),
      getEmailRecipientsData(),
    ]);

    const accessToken = accessTokenResponse.data.access_token;

    const sendEmailPromises = emailReceipientsResponse.data.rows.map(
      (receipient: ResponseType) => {
        const emailBody = `
        <html>
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <script type="application/adaptivecard+json">
              ${JSON.stringify(
                getAdaptiveCardJson(receipient.reports, receipient.managerName)
              )}
            </script>
          </head>
        </html>
      `;

        // <body>
        //       <!-- Additional email content -->
        //     </body>

        return sendHRUpdate(
          accessToken,
          sendFrom,
          emailSubject,
          emailBody,
          receipient.email
        );
      }
    );

    await Promise.all(sendEmailPromises);

    return NextResponse.json(
      {
        message: 'success',
      },
      { status: 200 }
    );
  } catch (e) {
    NextResponse.json({
      message: 'Failed to send email',
      status: 500,
    });
  }
}
