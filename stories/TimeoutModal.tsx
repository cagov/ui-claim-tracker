import { Story, Meta } from '@storybook/react'

import { TimeoutModal, TimeoutModalProps } from '../components/TimeoutModal'

export default {
  title: 'Component/Modal/Timeout Modal',
  component: TimeoutModal,
} as Meta

const Template: Story<TimeoutModalProps> = (args) => <TimeoutModal {...args} />

export const Default = Template.bind({})
Default.args = {}
