import { Story, Meta } from '@storybook/react'
import { NextStepsList as NextStepsListComponent, NextStepsListProps } from '../components/NextStepsList'

export default {
  title: 'Component/Atoms/Next Steps List',
  component: NextStepsListComponent,
} as Meta

const Template: Story<NextStepsListProps> = (args) => <NextStepsListComponent {...args} />

export const NextStepsList = Template.bind({})
NextStepsList.args = {
  nextSteps: [
    [
      {
        i18nKey: 'claim-status:scenarios.scenario1.your-next-steps.0.text',
      },
      {
        i18nKey: 'Sub bullet 1',
      },
      {
        i18nKey: 'Sub bullet 2',
      },
      {
        i18nKey: 'Sub bullet 3',
      },
      {
        i18nKey: 'Sub bullet 4',
      },
    ],
  ],
}
