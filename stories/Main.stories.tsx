import { Story, Meta } from '@storybook/react'
import { Main } from '../components/Main'
import { withNextRouter } from 'storybook-addon-next-router'

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
