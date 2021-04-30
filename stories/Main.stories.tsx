import { Story, Meta } from '@storybook/react'
import { withNextRouter } from 'storybook-addon-next-router'

import { Main } from '../components/Main'

export default {
  title: 'Component/Page Section/Main',
  component: Main,
  decorators: [withNextRouter],
} as Meta

const Template: Story = (args) => <Main {...args} />

export const Default = Template.bind({})
Default.args = {
  user: {},
}
