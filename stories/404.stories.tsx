import { Story, Meta } from '@storybook/react'

import Custom404, { Custom404Props } from '../pages/404'

// See https://storybook.js.org/docs/riot/essentials/controls#dealing-with-complex-values
export default {
  title: 'Claim Status Tracker/404',
  component: Custom404,
  argTypes: {
    userArrivedFromUioMobile: {
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta

const Template: Story<Custom404Props> = (args) => <Custom404 {...args} />

export const errored = Template.bind({})
errored.args = {}
