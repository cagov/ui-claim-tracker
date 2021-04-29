import { Story, Meta } from '@storybook/react'

import { Header, HeaderProps } from '../components/Header'

export default {
  title: 'Component/Page Section/Header',
  component: Header,
} as Meta

const Template: Story<HeaderProps> = (args) => <Header {...args} />

export const LoggedIn = Template.bind({})
LoggedIn.args = {
  user: {},
}
