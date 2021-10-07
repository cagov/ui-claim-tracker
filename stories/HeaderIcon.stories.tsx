import { Story, Meta } from '@storybook/react'

import { HeaderIcon as HeaderIconComponent, HeaderIconProps } from '../components/HeaderIcon'

export default {
  title: 'Component/Atoms/Header Icon',
  component: HeaderIconComponent,
} as Meta

const Template: Story<HeaderIconProps> = (args) => <HeaderIconComponent {...args} />

export const HeaderIcon = Template.bind({})
HeaderIcon.args = {
  link: 'www.google.com',
  label: 'Its Google!',
  icon: 'ca-gov-icon-home',
}
