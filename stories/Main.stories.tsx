import { Story, Meta } from '@storybook/react'

import { Main } from '../components/Main'

export default {
  title: 'component/Main',
  component: Main,
} as Meta

const Template: Story = (args) => <Main {...args} />

export const Default = Template.bind({})
Default.args = {
  user: {},
}
