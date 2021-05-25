import { Story, Meta } from '@storybook/react'

import { Feedback as FeedbackComponent } from '../components/Feedback'

export default {
  title: 'Component/Page Section/Feedback',
  component: FeedbackComponent,
} as Meta

const Template: Story = (args) => <FeedbackComponent {...args} />

export const Feedback = Template.bind({})
Feedback.args = {
  user: {},
}
