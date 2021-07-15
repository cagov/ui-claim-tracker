import { Story, Meta } from '@storybook/react'

import { ClaimStatus as ClaimStatusComponent, ClaimStatusProps } from '../components/ClaimStatus'
import { TransLineProps } from '../types/common'
import * as NextStepsStories from './NextSteps.stories'

export default {
  title: 'Component/Page Section/Claim Status',
  component: ClaimStatusComponent,
} as Meta

const Template: Story<ClaimStatusProps> = (args) => <ClaimStatusComponent {...args} />

export const ClaimStatus = Template.bind({})
ClaimStatus.args = {
  heading: 'claim-status:scenarios.scenario1.heading',
  summary: {
    i18nKey: 'claim-status:scenarios.scenario1.summary.text',
  },
}

const nextStepsArgs = NextStepsStories.NextSteps.args
if (nextStepsArgs) {
  ClaimStatus.args.yourNextSteps = nextStepsArgs.nextSteps as TransLineProps[]
}
