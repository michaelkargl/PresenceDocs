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
        padding: "1.5rem",
        children: (
            <span style={{ fontSize: '2rem'}}>Your colored text here</span>
        )
    }
}

export default meta;