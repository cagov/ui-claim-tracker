import { Story, Meta } from '@storybook/react'

import { ClaimSummary as ClaimSummaryComponent, ClaimSummaryProps } from '../components/ClaimSummary'

export default {
  title: 'Component/Atoms/ClaimSummary',
  component: ClaimSummaryComponent,
} as Meta

const Template: Story<ClaimSummaryProps> = (args) => <ClaimSummaryComponent {...args} />

export const ClaimSummary = Template.bind({})
ClaimSummary.args = {
  summary: [
    {
      i18nKey: 'claim-status:scenarios.scenario2.summary.0.text',
    },
    {
      i18nKey: 'claim-status:scenarios.scenario2.summary.1.text',
    },
  ],
  appointment: {
    date: new Date(),
  },
}
