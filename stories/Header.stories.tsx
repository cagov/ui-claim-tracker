import { Story, Meta } from '@storybook/react'

import { Header as HeaderComponent, HeaderProps } from '../components/Header'

export default {
  title: 'Component/Page Section/Header',
  component: HeaderComponent,
} as Meta

const Template: Story<HeaderProps> = (args) => <HeaderComponent {...args} />

export const Header = Template.bind({})
Header.args = {}
