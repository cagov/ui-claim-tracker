import { Story, Meta } from '@storybook/react'
import { withNextRouter } from 'storybook-addon-next-router'

import { ClaimDetails as ClaimDetailsComponent, ClaimDetailsProps } from '../components/ClaimDetails'

export default {
  title: 'Component/Page Section/Claim Details',
  component: ClaimDetailsComponent,
  decorators: [withNextRouter],
  argTypes: {
    programType: {
      control: {
        type: 'text',
      },
    },
    benefitYear: {
      control: {
        type: 'text',
      },
    },
    claimBalance: {
      control: {
        type: 'text',
      },
    },
    weeklyBenefitAmount: {
      control: {
        type: 'text',
      },
    },
    lastPaymentIssued: {
      control: {
        type: 'text',
      },
    },
    extensionType: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta

const Template: Story<ClaimDetailsProps> = (args) => <ClaimDetailsComponent {...args} />

export const ClaimDetails = Template.bind({})
ClaimDetails.args = {
  programType: 'Unemployment Insurance (UI)',
  benefitYear: '3/21/2020 - 3/20/2021',
  claimBalance: '$508.00',
  weeklyBenefitAmount: '$120.00',
  lastPaymentIssued: '$120.00 on 4/29/21',
  extensionType: 'Tier 2 Extension',
}
