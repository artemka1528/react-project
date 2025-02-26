import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Dark } from 'shared/ui/Modal/Modal.stories';

export default {
    title: 'shared/Text',
    component: Text,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    title: 'Заголовок',
    text: 'text',
};

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
    title: 'Заголовок',
};
export const OnlyText = Template.bind({});
OnlyText.args = {
    text: 'text',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    title: 'Заголовок',
    text: 'text',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTitleDark = Template.bind({});
OnlyTitleDark.args = {
    title: 'Заголовок',
};
OnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTextDark = Template.bind({});
OnlyTextDark.args = {
    text: 'text',
};
OnlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const TextError = Template.bind({});
TextError.args = {
    text: 'text',
    theme: TextTheme.ERROR,
};
