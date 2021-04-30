import { Story, Meta } from '@storybook/react'
import { withNextRouter } from 'storybook-addon-next-router'

import { ClaimCardDetails } from '../components/ClaimCardDetails'

export default {
  title: 'Component/Page Section/ClaimCardDetails',
  component: ClaimCardDetails,
  decorators: [withNextRouter],
} as Meta

const Template: Story = (args) => <ClaimCardDetails {...args} />

export const Default = Template.bind({})
Default.args = {}
