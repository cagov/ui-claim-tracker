import { Story, Meta } from '@storybook/react'
import { TimeoutModal as TimeoutModalComponent, TimeoutModalProps } from '../components/TimeoutModal'

export default {
  title: 'Component/Atoms/Timeout Modal',
  component: TimeoutModalComponent,
} as Meta

const Template: Story<TimeoutModalProps> = (args) => <TimeoutModalComponent {...args} />

export const TimeoutModal = Template.bind({})
TimeoutModal.args = {
  timedOut: true,
}
