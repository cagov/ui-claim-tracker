import { Story, Meta } from '@storybook/react'

import { Maintenance as MaintenanceComponent } from '../components/Maintenance'

export default {
  title: 'Component/Atoms/Maintenance',
  component: MaintenanceComponent,
} as Meta

const Template: Story = (args) => <MaintenanceComponent {...args} />

export const Maintenance = Template.bind({})
Maintenance.args = {}
