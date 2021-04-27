import { Story, Meta } from '@storybook/react'

import { Title } from '../components/Title'

export default {
  title: 'component/Title',
  component: Title,
} as Meta

const Template: Story = (args) => <Title {...args} />

export const Default = Template.bind({})
Default.args = {
  user: {},
}
