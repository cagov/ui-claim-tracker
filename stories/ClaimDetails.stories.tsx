import { Story, Meta } from '@storybook/react'
import { withNextRouter } from 'storybook-addon-next-router'

import { ClaimDetails as ClaimDetailsComponent, ClaimDetailsProps } from '../components/ClaimDetails'

export default {
  title: 'Component/Page Section/Claim Details',
  component: ClaimDetailsComponent,
  decorators: [withNextRouter],
} as Meta

const Template: Story<ClaimDetailsProps> = (args) => <ClaimDetailsComponent {...args} />

export const ClaimDetails = Template.bind({})
ClaimDetails.args = {}
