import React from 'react';
import { storiesOf } from '@storybook/react';
import { medDateData, largeSignalChartData, medSignalChartData } from '../common/demo';
import { number, boolean, withKnobs, object, color } from '@storybook/addon-knobs';
import { RadialScatterPlot } from './RadialScatterPlot';
import { RadialScatterSeries, RadialScatterPoint } from './RadialScatterSeries';
import { RadialAxis, RadialAxisTickSeries, RadialAxisArcSeries } from '../common/Axis/RadialAxis';

storiesOf('Charts/Scatter Plot/Radial', module)
  .addDecorator(withKnobs)
  .add('Simple', () => {
    const innerRadius = number('Inner Radius', 80);
    const size = number('Size', 5);
    const animated = boolean('Animated', true);
    const fill = color('Fill', 'rgba(174, 52, 255, .5)');
    const tickCount = number('Axis Tick Count', 5);
    const arcCount = number('Axis Arc Count', 10);
    const data = object('Data', medDateData);

    return (
      <RadialScatterPlot
        height={450}
        width={450}
        data={data}
        innerRadius={innerRadius}
        series={
          <RadialScatterSeries
            animated={animated}
            point={
              <RadialScatterPoint
                size={size}
                fill={fill}
              />
            }
          />
        }
        axis={
          <RadialAxis
            ticks={
              <RadialAxisTickSeries
                count={tickCount}
              />
            }
            arcs={
              <RadialAxisArcSeries
                count={arcCount}
              />
            }
          />
        }
      />
    );
  }, { options: { showAddonPanel: true } })
  .add('Bubble', () => {
    const innerRadius = number('Inner Radius', .1);
    const animated = boolean('Animated', true);
    const fill = color('Fill', 'rgba(174, 52, 255, .5)');
    const tickCount = number('Axis Tick Count', 5);
    const arcCount = number('Axis Arc Count', 10);
    const data = object('Data', largeSignalChartData);

    return (
      <RadialScatterPlot
        height={450}
        width={450}
        data={data}
        innerRadius={innerRadius}
        series={
          <RadialScatterSeries
            animated={animated}
            point={
              <RadialScatterPoint
                fill={fill}
                size={v => v.meta.severity + 5}
              />
            }
          />
        }
        axis={
          <RadialAxis
            ticks={
              <RadialAxisTickSeries
                count={tickCount}
              />
            }
            arcs={
              <RadialAxisArcSeries
                count={arcCount}
              />
            }
          />
        }
      />
    );
  }, { options: { showAddonPanel: true } })
  .add('Symbols', () => {
    const innerRadius = number('Inner Radius', 80);
    const animated = boolean('Animated', true);
    const fill = color('Fill', 'rgba(174, 52, 255, .5)');
    const tickCount = number('Axis Tick Count', 5);
    const arcCount = number('Axis Arc Count', 10);
    const data = object('Data', medSignalChartData);

    return (
      <RadialScatterPlot
        height={450}
        width={450}
        data={data}
        innerRadius={innerRadius}
        series={
          <RadialScatterSeries
            animated={animated}
            point={
              <RadialScatterPoint
                fill={fill}
                symbol={d => {
                  const scale = d.meta.severity / 50;
                  const size = scale * 100;
                  return (
                    <g transform={`translate(-${size}, -${size})`}>
                      <polygon
                        points="225,10 100,210 350,210"
                        transform={`scale(${scale})`}
                        style={{
                          fill: 'rgba(206, 0, 62, .7)',
                          stroke: '#FF004D',
                          strokeWidth: 5
                        }}
                      />
                    </g>
                  );
                }}
              />
            }
          />
        }
        axis={
          <RadialAxis
            ticks={
              <RadialAxisTickSeries
                count={tickCount}
              />
            }
            arcs={
              <RadialAxisArcSeries
                count={arcCount}
              />
            }
          />
        }
      />
    );
  }, { options: { showAddonPanel: true } })
  .add('Resizable', () => (
    <div style={{ width: '50vw', height: '75vh', border: 'solid 1px red' }}>
      <RadialScatterPlot
        data={medDateData}
      />
    </div>
  ));
