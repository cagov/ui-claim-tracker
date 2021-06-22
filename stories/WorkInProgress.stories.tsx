import { Story, Meta } from '@storybook/react'

import { WorkInProgress as WorkInProgressComponent } from '../components/WorkInProgress'

export default {
  title: 'Component/Page Section/Work In Progress',
  component: WorkInProgressComponent,
} as Meta

const Template: Story = (args) => <WorkInProgressComponent {...args} />

export const WorkInProgress = Template.bind({})
WorkInProgress.args = {
  user: {},
}
