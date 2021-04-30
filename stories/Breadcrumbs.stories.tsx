import { Story, Meta } from '@storybook/react'

import { Breadcrumbs } from '../components/Breadcrumbs'

export default {
  title: 'Component/Atoms/Breadcrumbs',
  component: Breadcrumbs,
} as Meta

const Template: Story = (args) => <Breadcrumbs {...args} />

export const Default = Template.bind({})
Default.args = {
  user: {},
}
