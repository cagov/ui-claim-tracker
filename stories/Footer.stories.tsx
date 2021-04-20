import { Story, Meta } from '@storybook/react'

import { Footer } from '../components/Footer'

export default {
  title: 'component/Footer',
  component: Footer,
} as Meta

const Template: Story = (args) => <Footer {...args} />

export const Default = Template.bind({})
Default.args = {
  user: {},
}
