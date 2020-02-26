import { randomNumber } from './utils';
import { range } from 'd3-array';
import moment from 'moment';

export const heatmapSimpleData = [
  {
    key: 'Lateral Movement',
    data: [
      {
        key: 'XML',
        data: 0
      },
      {
        key: 'JSON',
        data: 120
      },
      {
        key: 'HTTPS',
        data: 150
      },
      {
        key: 'SSH',
        data: 112
      }
    ]
  },
  {
    key: 'Discovery',
    data: [
      {
        key: 'XML',
        data: 100
      },
      {
        key: 'JSON',
        data: 34
      },
      {
        key: 'HTTPS',
        data: 0
      },
      {
        key: 'SSH',
        data: 111
      }
    ]
  },
  {
    key: 'Exploitation',
    data: [
      {
        key: 'XML',
        data: 70
      },
      {
        key: 'JSON',
        data: 1
      },
      {
        key: 'HTTPS',
        data: 110
      },
      {
        key: 'SSH',
        data: 115
      }
    ]
  },
  {
    key: 'Threat Intelligence',
    data: [
      {
        key: 'XML',
        data: 1
      },
      {
        key: 'JSON',
        data: 120
      },
      {
        key: 'HTTPS',
        data: 200
      },
      {
        key: 'SSH',
        data: 160
      }
    ]
  },
  {
    key: 'Breach',
    data: [
      {
        key: 'XML',
        data: 5
      },
      {
        key: 'JSON',
        data: 10
      },
      {
        key: 'HTTPS',
        data: 152
      },
      {
        key: 'SSH',
        data: 20
      }
    ]
  }
];

const yearStart = moment().startOf('year');
const marchStart = moment().startOf('year').add(2, 'month');

export const heatmapCalendarData = range(365).map(i => ({
  key: yearStart.clone().add(i, 'days').toDate(),
  data: randomNumber(0, 50)
}));

export const janHeatMapData = range(31).map(i => ({
  key: yearStart.clone().add(i, 'days').toDate(),
  data: randomNumber(0, 50)
}));

export const febHeatMapData = range(28).map(i => ({
  key: yearStart.clone().add(1, 'month').add(i, 'days').toDate(),
  data: randomNumber(0, 50)
}));

export const marchHeatMapData = range(31).map(i => ({
  key: yearStart.clone().add(2, 'month').add(i, 'days').toDate(),
  data: randomNumber(0, 50)
}));

export const heatmapCalendarOffsetData = range(365).map(i => ({
  key: marchStart.clone().add(i, 'days').toDate(),
  data: randomNumber(0, 50)
}));
