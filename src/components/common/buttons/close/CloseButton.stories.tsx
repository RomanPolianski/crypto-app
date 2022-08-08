import { Meta, Story } from '@storybook/react';
import CloseButton, { CloseButtonProps } from './CloseButton';
import './CloseButton.module.scss';

export default {
  title: 'common/CloseButton',
  component: CloseButton,
  argTypes: {
    form: {
      type: 'string',
      description: 'Set Form of button',
      defaultValue: 'square',
      options: ['square', 'round'],
      control: {
        type: 'radio',
      },
    },
    variant: {
      type: 'string',
      description: 'Set Type of button',
      defaultValue: 'delete',
      options: ['delete', 'close'],
      control: {
        type: 'radio',
      },
    },
  },
} as Meta;

const Template: Story<CloseButtonProps> = (args) => <CloseButton {...args} />;

export const Close = Template.bind({});
Close.args = {
  form: 'round',
  variant: 'close',
};

export const Delete = Template.bind({});
Delete.args = {
  form: 'round',
  variant: 'delete',
};
