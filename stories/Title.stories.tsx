import { Story, Meta } from '@storybook/react'

import { Title as TitleComponent } from '../components/Title'

export default {
  title: 'Component/Atoms/Title',
  component: TitleComponent,
} as Meta

const Template: Story = (args) => <TitleComponent {...args} />

export const Title = Template.bind({})
Title.args = {}
