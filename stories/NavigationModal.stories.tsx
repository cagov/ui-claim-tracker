import { Story, Meta } from '@storybook/react'
import { NavigationModal as NavigationModalComponent, NavigationModalProps } from '../components/NavigationModal'

export default {
  title: 'Component/Atoms/Navigation Modal',
  component: NavigationModalComponent,
} as Meta

const Template: Story<NavigationModalProps> = (args) => <NavigationModalComponent {...args} />

let showWarning = true

function handleModalState() {
  showWarning = !showWarning
}

export const NavigationModal = Template.bind({})
NavigationModal.args = {
  url: 'edd-ca-gov',
  modalState: handleModalState,
  showWarningModal: true,
}
