import { Story, Meta } from '@storybook/react'

import { DateTime } from 'luxon'

import { ClaimSummary as ClaimSummaryComponent, ClaimSummaryProps } from '../components/ClaimSummary'

export default {
  title: 'Component/Atoms/Claim Summary',
  component: ClaimSummaryComponent,
} as Meta

const Template: Story<ClaimSummaryProps> = (args) => <ClaimSummaryComponent {...args} />

const exampleDate = DateTime.now().toString()
export const ClaimSummary = Template.bind({})
ClaimSummary.args = {
  paragraphs: [
    {
      i18nKey: 'claim-status:scenarios.scenario2.summary.0.text',
    },
    {
      i18nKey: 'claim-status:scenarios.scenario2.summary.1.text',
    },
  ],
  appointment: {
    date: exampleDate,
  },
}
