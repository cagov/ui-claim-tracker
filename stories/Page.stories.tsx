import { Story, Meta } from '@storybook/react'
import { withNextRouter } from 'storybook-addon-next-router'

import Home from '../pages/claimstatus/index'

export default {
  title: 'Claim Tracker/Page',
  component: Home,
  decorators: [withNextRouter],
} as Meta

const Template: Story = (args) => <Home {...args} />

export const Default = Template.bind({})
Default.args = {}
