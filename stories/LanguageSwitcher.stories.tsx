import { Story, Meta } from '@storybook/react'
import { withNextRouter } from 'storybook-addon-next-router'

import { LanguageSwitcher as LanguageSwitcherComponent, LanguageSwitcherProps } from '../components/LanguageSwitcher'

export default {
  title: 'Component/Atoms/Language Switcher',
  component: LanguageSwitcherComponent,
  decorators: [withNextRouter],
} as Meta

const Template: Story<LanguageSwitcherProps> = (args) => <LanguageSwitcherComponent {...args} />

export const LanguageSwitcher = Template.bind({})
LanguageSwitcher.args = {}
