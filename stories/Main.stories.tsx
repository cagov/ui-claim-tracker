import { Story, Meta } from '@storybook/react'
import { Main as MainComponent } from '../components/Main'
import { withNextRouter } from 'storybook-addon-next-router'

export default {
  title: 'Component/Page Section/Main',
  component: MainComponent,
  decorators: [withNextRouter],
} as Meta

const Template: Story = (args) => <MainComponent {...args} />

export const Main = Template.bind({})
Main.args = {}
