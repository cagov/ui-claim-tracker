import { Story, Meta } from '@storybook/react'
import { NextSteps as NextStepsComponent, NextStepsProps } from '../components/NextSteps'

export default {
  title: 'Component/Page Section/Next Steps',
  component: NextStepsComponent,
} as Meta

const Template: Story<NextStepsProps> = (args) => <NextStepsComponent {...args} />

export const NextSteps = Template.bind({})
NextSteps.args = {
  nextSteps: [
    {
      i18nKey: 'work-in-progress.message',
    },
  ],
}
