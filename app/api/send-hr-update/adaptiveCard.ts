import { ReportType } from './sendHRUpdates.types';

export default function getAdaptiveCardJson(
  reports: ReportType[],
  managerName: string
) {
  const objs = reports.map((report: ReportType) => ({
    type: 'ColumnSet',
    id: 'a1e100d4-32eb-23a2-1efe-ee427dabbc61',
    columns: [
      {
        type: 'Column',
        id: '9a761dbd-9793-09ce-eb6e-0009f96713c0',
        padding: {
          top: 'Small',
          bottom: 'None',
          left: 'None',
          right: 'None',
        },
        width: 'auto',
        items: [
          {
            type: 'Input.Toggle',
            id: `${report.name}`,
            title: ' ',
            value: 'true',
            wrap: false,
            label: `${report.name} ${report.title}`,
          },
        ],
        spacing: 'None',
      },
      {
        type: 'Column',
        id: '5be4e78f-0516-88b9-3c8a-aaa4a363c891',
        padding: 'None',
        width: 'auto',
        spacing: 'None',
        items: [
          {
            type: 'Image',
            url: report.image,
            spacing: 'None',
            size: 'Small',
            style: 'Person',
            altText: `${report.name} Avatar`,
          },
        ],
      },
      {
        type: 'Column',
        id: 'bc3069ca-e365-0acb-825a-d0088fde0017',
        padding: 'None',
        width: 'stretch',
        spacing: 'Small',
        items: [
          {
            type: 'TextBlock',
            id: '6a77917-41b7-7959-2d35-bb5f1bfc1a97',
            text: report.name,
            wrap: true,
          },
          {
            type: 'TextBlock',
            id: '38552ef-2a05-e130-d308-456843e0e74d',
            text: report.title,
            wrap: true,
            spacing: 'None',
            size: 'Small',
            color: 'Light',
          },
        ],
      },
    ],
    padding: 'None',
  }));

  const unchecked = reports.reduce((acc, report) => {
    acc[report.name] = `{{${report.name}.value}}`;
    return acc;
  }, {} as Record<string, string>);

  const body = JSON.stringify({
    changes: {
      manager: managerName,
      dateReceived: new Date().toISOString().split('T')[0],
      unchecked,
      userInput: `{{userInput.value}}`,
    },
  });

  return {
    $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
    type: 'AdaptiveCard',
    version: '1.0',
    body: [
      {
        type: 'Container',
        id: '0bdaded9-7b2d-fb8b-c298-ac819fd31288',
        padding: 'Default',
        spacing: 'None',
        items: [
          {
            type: 'TextBlock',
            id: '50c52578-8e51-1512-aeb1-5a714e8b460b',
            text: 'Confirm your team',
            wrap: true,
            size: 'Large',
            weight: 'Bolder',
            style: 'heading',
          },
        ],
        separator: true,
      },
      {
        type: 'Container',
        id: '47295af6-a6b8-fd4f-f90f-018d01f8e130',
        padding: 'Default',
        spacing: 'None',
        items: [
          {
            type: 'TextBlock',
            id: '3f5e8bb4-217c-ab02-0c24-097aa57151eb',
            text: 'Uncheck if no longer a direct report:',
            wrap: true,
            spacing: 'None',
            size: 'Small',
          },
          ...objs,
          {
            type: 'ColumnSet',
            columns: [
              {
                type: 'Column',
                id: '0095e2dc-7895-9e9c-6899-34bca110c4a4',
                padding: 'None',
                width: 'auto',
                items: [
                  {
                    type: 'TextBlock',
                    id: '0efd81e7-0282-2ae4-faf2-2569bd6a9a9d',
                    text: 'Enter any team members not listed or title changes:',
                    wrap: true,
                  },
                ],
              },
            ],
            padding: 'None',
          },
          {
            type: 'Input.Text',
            id: 'userInput',
            spacing: 'Small',
          },
          {
            type: 'ActionSet',
            id: 'cabbf18e-fa8c-ff66-e2d9-6626bb1b841e',
            actions: [
              {
                type: 'Action.Http',
                id: '7e6a701f-815f-2a67-4af1-a316b59c8e83',
                title: 'Submit',
                method: 'POST',
                url: 'https://eoqi2k24c81qufm.m.pipedream.net',
                body,
                isPrimary: true,
                style: 'positive',
              },
            ],
            horizontalAlignment: 'Center',
          },
        ],
        separator: true,
      },
    ],
    padding: 'None',
    '@type': 'AdaptiveCard',
    '@context': 'http://schema.org/extensions',
  };
}
