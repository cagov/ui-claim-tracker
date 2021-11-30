import { Story, Meta } from '@storybook/react'
import { NextSteps as NextStepsComponent, NextStepsProps } from '../components/NextSteps'

export default {
  title: 'Component/Atoms/Next Steps',
  component: NextStepsComponent,
} as Meta

const Template: Story<NextStepsProps> = (args) => <NextStepsComponent {...args} />

export const NextSteps = Template.bind({})
NextSteps.args = {
  header: 'EDD Next Steps',
  nextSteps: [
    {
      i18nKey: 'claim-status:scenarios.scenario1.your-next-steps.0.text',
    },
  ],
}
