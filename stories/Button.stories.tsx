import { Story, Meta } from '@storybook/react'
import { Button, ButtonProps } from '../components/Button'

export default {
  title: 'Component/Atoms/Button',
  component: Button,
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: 'Manage Claim',
}

export const Secondary = Template.bind({})
Secondary.args = {
  label: 'Secondary Button',
}
