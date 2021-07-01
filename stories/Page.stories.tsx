import { Story, Meta } from '@storybook/react'
import { withNextRouter } from 'storybook-addon-next-router'

import Home, { HomeProps } from '../pages/index'
import getScenarioContent, { ScenarioType, ScenarioTypeKey } from '../utils/getScenarioContent'
import apiGatewayStub from '../utils/apiGatewayStub'

// See https://storybook.js.org/docs/riot/essentials/controls#dealing-with-complex-values
export default {
  title: 'Claim Tracker/Page',
  component: Home,
  decorators: [withNextRouter],
  argTypes: {
    scenario: {
      options: Object.keys(ScenarioType),
      mapping: Object.keys(ScenarioType), // return the key instead of the value
      defaultValue: 'BaseNoPending',
      control: {
        type: 'select',
        labels: ScenarioType,
      },
    },
  },
} as Meta

// Extend HomeProps to add a complex story value
interface StoryHomeProps extends HomeProps {
  scenario: ScenarioTypeKey
}

const Template: Story<StoryHomeProps> = ({ ...args }) => {
  args.scenarioContent = getScenarioContent(apiGatewayStub(ScenarioType[args.scenario]))
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
