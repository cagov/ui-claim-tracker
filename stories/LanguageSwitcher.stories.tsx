import { Story, Meta } from '@storybook/react'

import { LanguageSwitcher as LanguageSwitcherComponent, LanguageSwitcherProps } from '../components/LanguageSwitcher'

export default {
  title: 'Component/Atoms/Language Switcher',
  component: LanguageSwitcherComponent,
} as Meta

const Template: Story<LanguageSwitcherProps> = (args) => <LanguageSwitcherComponent {...args} />

export const LanguageSwitcher = Template.bind({})
LanguageSwitcher.args = {}
