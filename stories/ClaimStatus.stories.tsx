import { Story, Meta } from '@storybook/react'

import { ClaimStatus as ClaimStatusComponent, ClaimStatusProps } from '../components/ClaimStatus'

export default {
  title: 'Component/Page Section/Main/Claim Section/Claim Status',
  component: ClaimStatusComponent,
} as Meta

const Template: Story<ClaimStatusProps> = (args) => <ClaimStatusComponent {...args} />

export const ClaimStatus = Template.bind({})
ClaimStatus.args = {
  heading: 'claim-status:scenarios.scenario4.heading',
  summary: {
    paragraphs: [{ i18nKey: 'claim-status:scenarios.scenario4.summary.0.text' }],
    appointment: null,
  },
  yourNextSteps: [{ i18nKey: 'claim-status:scenarios.scenario4.your-next-steps.0.text' }],
  eddNextSteps: [{ i18nKey: 'claim-status:scenarios.scenario4.edd-next-steps.0.text' }],
}
