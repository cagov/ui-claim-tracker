import { Story, Meta } from '@storybook/react'

import { Appointment as AppointmentComponent, AppointmentProps } from '../components/Appointment'

export default {
  title: 'Component/Atoms/Appointment',
  component: AppointmentComponent,
} as Meta

const Template: Story<AppointmentProps> = (args) => <AppointmentComponent {...args} />

export const Appointment = Template.bind({})
Appointment.args = {
  appointment: {
    date: new Date(),
  },
}
