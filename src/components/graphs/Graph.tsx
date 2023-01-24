// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/radar
import { ResponsiveRadar } from '@nivo/radar';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveRadar = ({ data /* see data tab */ }: any) => (
  <ResponsiveRadar
    data={data}
    keys={['chardonay', 'carmenere', 'syrah']}
    indexBy="taste"
    valueFormat=">-.2f"
    margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
    borderColor={{ from: 'color', modifiers: [] }}
    gridLabelOffset={30}
    dotSize={9}
    dotColor={{ from: 'color', modifiers: [] }}
    dotBorderWidth={1}
    dotBorderColor={{ from: 'color', modifiers: [] }}
    enableDotLabel={true}
    dotLabel="value"
    colors={{ scheme: 'set1' }}
    fillOpacity={0}
    motionConfig={{
      mass: 1,
      tension: 460,
      friction: 48,
      clamp: true,
      precision: 0.01,
      velocity: 0,
    }}
    legends={[
      {
        anchor: 'top-left',
        direction: 'column',
        translateX: -50,
        translateY: -40,
        itemWidth: 80,
        itemHeight: 20,
        itemTextColor: '#999',
        symbolSize: 12,
        symbolShape: 'circle',
        effects: [
          {
            on: 'hover',
            style: {
              itemTextColor: '#000',
            },
          },
        ],
      },
    ]}
  />
);

export default MyResponsiveRadar;
