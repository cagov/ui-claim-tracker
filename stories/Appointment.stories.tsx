import { Story, Meta } from '@storybook/react'

import { Appointment as AppointmentComponent, AppointmentProps } from '../components/Appointment'

export default {
  title: 'Component/Atoms/Appointment',
  component: AppointmentComponent,
  argTypes: {
    date: {
      description: 'Please ignore the time picker',
      control: {
        type: 'date',
      },
    },
    start: {
      name: 'start time',
      table: {
        type: {
          summary: 'number',
        },
      },
      control: {
        type: 'number',
        min: 1,
        max: 12,
      },
    },
    end: {
      name: 'end time',
      table: {
        type: {
          summary: 'number',
        },
      },
      control: {
        type: 'number',
        min: 1,
        max: 12,
      },
    },
    timeSlot: {
      table: {
        disable: true,
      },
    },
  },
} as Meta

interface StoryAppointmentProps extends AppointmentProps {
  date: Date
  start?: number
  end?: number
}

const Template: Story<StoryAppointmentProps> = ({ ...args }) => {
  if (args.start && args.end) {
    args.timeSlot = {
      rangeStart: args.start,
      rangeEnd: args.end,
    }
  }
  return <AppointmentComponent {...args} />
}

export const Appointment = Template.bind({})
Appointment.args = {
  date: new Date(),
}
