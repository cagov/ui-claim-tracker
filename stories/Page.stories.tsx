import { Story, Meta } from '@storybook/react'

import Home, { HomeProps } from '../pages/index'
import apiGatewayStub from '../utils/apiGatewayStub'
import { programTypeNames } from '../utils/getClaimDetails'
import getScenarioContent, { ScenarioType, ScenarioTypeNames } from '../utils/getScenarioContent'
import { getNumericEnumKeys } from '../utils/numericEnum'

// See https://storybook.js.org/docs/riot/essentials/controls#dealing-with-complex-values
export default {
  title: 'Claim Status Tracker/Page',
  component: Home,
  argTypes: {
    scenario: {
      options: getNumericEnumKeys(ScenarioType),
      defaultValue: 0,
      control: {
        type: 'select',
        labels: ScenarioTypeNames,
      },
    },
    programType: {
      options: Object.values(programTypeNames),
      defaultValue: 'UI',
      control: {
        type: 'select',
        labels: programTypeNames,
      },
    },
    hasCertificationWeeksAvailable: {
      control: {
        type: 'boolean',
      },
    },
    hasClaimDetails: {
      control: {
        type: 'boolean',
      },
    },
    userArrivedFromUioMobile: {
      control: {
        type: 'boolean',
      },
    },
    errorCode: {
      control: {
        type: 'number',
      },
    },
  },
} as Meta

// Extend HomeProps to add a complex story value
interface StoryHomeProps extends HomeProps {
  scenario: number
  programType: string
  hasCertificationWeeksAvailable: boolean
  hasClaimDetails: boolean
}

const Template: Story<StoryHomeProps> = ({ ...args }) => {
  args.scenarioContent = getScenarioContent(
    apiGatewayStub(args.scenario, args.hasCertificationWeeksAvailable, args.hasClaimDetails, args.programType),
  )
  return <Home {...args} />
}

export const Default = Template.bind({})
Default.args = {
  errorCode: null,
}

export const Errorred = Template.bind({})
Errorred.args = { errorCode: 500 }

export const Maintenance = Template.bind({})
Maintenance.args = { enableMaintenancePage: 'enabled', ...Default.args }

export const TimedOut = Template.bind({})
TimedOut.args = { timedOut: true, ...Default.args }
