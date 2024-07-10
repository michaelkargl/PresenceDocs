import type {Meta, StoryObj} from "@storybook/react";
import CanvasBanner from "../../src/components/canvas-banner";

const meta = {
    title: 'CanvasBanner',
    component: CanvasBanner,
    tags: ['autodocs']
} satisfies  Meta<typeof CanvasBanner>;


type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        children: (
            <span>Your colored text here</span>
        )
    }
}

export default meta;