import { Meta, Story } from '@storybook/react';
import { TrendArrow, TrendArrowProps } from './TrendArrow';

export default {
  title: 'common/TrendArrow',
  component: TrendArrow,
  argTypes: {
    isRising: {
      type: 'string',
      description: 'Set type of button',
      defaultValue: 'false',
      options: ['true', 'false'],
      control: {
        type: 'radio',
      },
    },
  },
} as Meta;

const Template: Story<TrendArrowProps> = (args) => <TrendArrow {...args} />;

export const Up = Template.bind({});
Up.args = {
  isRising: true,
};

export const Down = Template.bind({});
Down.args = {
  isRising: false,
};
