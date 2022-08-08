import { Meta, Story } from '@storybook/react';
import { NextPrevButton, NextPrevButtonProps } from './NextPrevButton';

export default {
  title: 'common/NextPrevButton',
  component: NextPrevButton,
  argTypes: {
    type: {
      type: 'string',
      description: 'Set type of button',
      defaultValue: 'prev',
      options: ['prev', 'next'],
      control: {
        type: 'radio',
      },
    },
    color: {
      type: 'string',
      description: 'Set color of button',
      defaultValue: 'black',
      options: ['black', 'white'],
      control: {
        type: 'radio',
      },
    },
  },
} as Meta;

const Template: Story<NextPrevButtonProps> = (args) => (
  <NextPrevButton {...args} />
);

export const Next = Template.bind({});
Next.args = {
  type: 'next',
  color: 'white',
};

export const Prev = Template.bind({});
Prev.args = {
  type: 'prev',
  color: 'black',
};
