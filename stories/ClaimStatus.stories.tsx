import { Story, Meta } from '@storybook/react'
import { withNextRouter } from 'storybook-addon-next-router'

import { ClaimStatus as ClaimStatusComponent, ClaimStatusProps } from '../components/ClaimStatus'

export default {
  title: 'Component/Page Section/Claim Status',
  component: ClaimStatusComponent,
  decorators: [withNextRouter],
} as Meta

const Template: Story<ClaimStatusProps> = (args) => <ClaimStatusComponent {...args} />

export const ClaimStatus = Template.bind({})
ClaimStatus.args = {}
