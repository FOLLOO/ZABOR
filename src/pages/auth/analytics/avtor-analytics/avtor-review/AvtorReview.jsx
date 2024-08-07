import React from 'react'

import styles from './avtor-review.module.css'
import global from '../../../../../global.module.css'

import Notification from '../../../../../components/notifications/Notification'
import SettingsBlock from '../../../../../components/toolbar/settings-block/SettingsBlock'
import InputDporDown from '../../../../../components/ui/input/input-dropdown/InputDporDown'

import { ResponsiveLine } from '@nivo/line'
import CardLittle from '../../../../../components/post/post-cards/card-little/CardLittle'
import Tab from '../../../../../components/ui/tab/Tab'
import { useLocation } from 'react-router-dom'
function AvtorReview (props) {

  const { hash } = useLocation();

  const data = [
    {
      "id": "japan",
      "color": "hsl(34, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 84
        },
        {
          "x": "helicopter",
          "y": 106
        },
        {
          "x": "boat",
          "y": 300
        },
        {
          "x": "train",
          "y": 236
        },
        {
          "x": "subway",
          "y": 113
        },
        {
          "x": "bus",
          "y": 1
        },
        {
          "x": "car",
          "y": 67
        },
        {
          "x": "moto",
          "y": 81
        },
        {
          "x": "bicycle",
          "y": 218
        },
        {
          "x": "horse",
          "y": 8
        },
        {
          "x": "skateboard",
          "y": 46
        },
        {
          "x": "others",
          "y": 141
        }
      ]
    },
    {
      "id": "france",
      "color": "hsl(263, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 260
        },
        {
          "x": "helicopter",
          "y": 81
        },
        {
          "x": "boat",
          "y": 179
        },
        {
          "x": "train",
          "y": 1
        },
        {
          "x": "subway",
          "y": 170
        },
        {
          "x": "bus",
          "y": 247
        },
        {
          "x": "car",
          "y": 218
        },
        {
          "x": "moto",
          "y": 67
        },
        {
          "x": "bicycle",
          "y": 168
        },
        {
          "x": "horse",
          "y": 127
        },
        {
          "x": "skateboard",
          "y": 56
        },
        {
          "x": "others",
          "y": 69
        }
      ]
    },
    {
      "id": "us",
      "color": "hsl(160, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 2
        },
        {
          "x": "helicopter",
          "y": 163
        },
        {
          "x": "boat",
          "y": 117
        },
        {
          "x": "train",
          "y": 122
        },
        {
          "x": "subway",
          "y": 136
        },
        {
          "x": "bus",
          "y": 79
        },
        {
          "x": "car",
          "y": 164
        },
        {
          "x": "moto",
          "y": 165
        },
        {
          "x": "bicycle",
          "y": 217
        },
        {
          "x": "horse",
          "y": 149
        },
        {
          "x": "skateboard",
          "y": 57
        },
        {
          "x": "others",
          "y": 137
        }
      ]
    },
    {
      "id": "germany",
      "color": "hsl(100, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 47
        },
        {
          "x": "helicopter",
          "y": 83
        },
        {
          "x": "boat",
          "y": 195
        },
        {
          "x": "train",
          "y": 228
        },
        {
          "x": "subway",
          "y": 102
        },
        {
          "x": "bus",
          "y": 212
        },
        {
          "x": "car",
          "y": 240
        },
        {
          "x": "moto",
          "y": 143
        },
        {
          "x": "bicycle",
          "y": 171
        },
        {
          "x": "horse",
          "y": 211
        },
        {
          "x": "skateboard",
          "y": 262
        },
        {
          "x": "others",
          "y": 131
        }
      ]
    },
    {
      "id": "norway",
      "color": "hsl(27, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 264
        },
        {
          "x": "helicopter",
          "y": 265
        },
        {
          "x": "boat",
          "y": 286
        },
        {
          "x": "train",
          "y": 207
        },
        {
          "x": "subway",
          "y": 210
        },
        {
          "x": "bus",
          "y": 266
        },
        {
          "x": "car",
          "y": 61
        },
        {
          "x": "moto",
          "y": 57
        },
        {
          "x": "bicycle",
          "y": 276
        },
        {
          "x": "horse",
          "y": 71
        },
        {
          "x": "skateboard",
          "y": 115
        },
        {
          "x": "others",
          "y": 125
        }
      ]
    }
  ]
  const Diagram = ({date}) => {
    return (
      <div className={styles.diagram}>
        <ResponsiveLine
          data={date}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle',
            truncateTickAt: 0
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle',
            truncateTickAt: 0
          }}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabel="data.yFormatted"
          pointLabelYOffset={-12}
          enableTouchCrosshair={true}
          useMesh={true}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
        ></ResponsiveLine>
      </div>
    )
  }

  const tabContent = [
    { id: 11 , title: 'Просмотры',  content: <Diagram date={data}/>  },
    { id: 11 , title: 'Подписки',   content: <Diagram date={data}/> },
  ]

  return (
    <div className={`${styles.grid}`}>
      <div className={styles.column}>
        <Tab items={tabContent} />
      <SettingsBlock title={'Комментарии под постом'} descripton={'Статистика отображает посты за выбранный период.'}>
        <Notification type={'com-post'}/>
        <Notification type={'com-post'}/>
        <Notification type={'com-post'}/>
        <Notification type={'com-post'}/>
      </SettingsBlock>
      </div>
      <div className={`${styles.rightMenu} ${styles.flex}`}>
        <InputDporDown />
        <h3>Публикации</h3>
        <CardLittle />
      </div>
    </div>
  )
}

export default AvtorReview