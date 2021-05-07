import { Story, Meta } from '@storybook/react'
import { withNextRouter } from 'storybook-addon-next-router'

import { ClaimCardDetails as ClaimCardDetailsComponent, ClaimCardDetailsProps } from '../components/ClaimCardDetails'

export default {
  title: 'Component/Page Section/Claim Card Details',
  component: ClaimCardDetailsComponent,
  decorators: [withNextRouter],
} as Meta

const Template: Story<ClaimCardDetailsProps> = (args) => <ClaimCardDetailsComponent {...args} />

export const ClaimCardDetails = Template.bind({})
ClaimCardDetails.args = {}
