import { Story, Meta } from '@storybook/react'

import { Footer as FooterComponent } from '../components/Footer'

export default {
  title: 'Component/Page Section/Footer',
  component: FooterComponent,
} as Meta

const Template: Story = (args) => <FooterComponent {...args} />

export const Footer = Template.bind({})
Footer.args = {}
