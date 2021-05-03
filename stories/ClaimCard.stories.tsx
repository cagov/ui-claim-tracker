import { Story, Meta } from '@storybook/react'
import { withNextRouter } from 'storybook-addon-next-router'

import { ClaimCard } from '../components/ClaimCard'

export default {
  title: 'Component/Page Section/ClaimCard',
  component: ClaimCard,
  decorators: [withNextRouter],
} as Meta

const Template: Story = (args) => <ClaimCard {...args} />

export const Default = Template.bind({})
Default.args = {
  user: {},
}
