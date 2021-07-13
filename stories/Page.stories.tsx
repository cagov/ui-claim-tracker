import { Story, Meta } from '@storybook/react'
import { withNextRouter } from 'storybook-addon-next-router'

import Home, { HomeProps } from '../pages/index'
import getScenarioContent, { ScenarioType, ScenarioTypeNames } from '../utils/getScenarioContent'
import apiGatewayStub from '../utils/apiGatewayStub'
import { getNumericEnumKeys } from '../utils/numericEnum'

// See https://storybook.js.org/docs/riot/essentials/controls#dealing-with-complex-values
export default {
  title: 'Claim Tracker/Page',
  component: Home,
  decorators: [withNextRouter],
  argTypes: {
    scenario: {
      options: getNumericEnumKeys(ScenarioType),
      defaultValue: 0,
      control: {
        type: 'select',
        labels: ScenarioTypeNames,
      },
    },
    errorCode: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta

// Extend HomeProps to add a complex story value
interface StoryHomeProps extends HomeProps {
  scenario: number
}

const Template: Story<StoryHomeProps> = ({ ...args }) => {
  args.scenarioContent = getScenarioContent(apiGatewayStub(args.scenario))
  return <Home {...args} />
}

export const Default = Template.bind({})
Default.args = {
  errorCode: null,
}

export const TimedOut = Template.bind({})
TimedOut.args = { timedOut: true, ...Default.args }

export const Loading = Template.bind({})
Loading.args = { loading: true, ...Default.args }

export const Errorred = Template.bind({})
Errorred.args = { errorCode: 500 }
