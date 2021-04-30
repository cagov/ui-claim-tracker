import { Story, Meta } from '@storybook/react'

import { Footer } from '../components/Footer'

export default {
  title: 'Component/Page Section/Footer',
  component: Footer,
} as Meta

const Template: Story = (args) => <Footer {...args} />

export const Default = Template.bind({})
Default.args = {
  user: {},
}
