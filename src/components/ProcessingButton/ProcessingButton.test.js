import {render, screen} from '../../Js/test-utils';
import ProcessingButton from './ProcessingButton';

describe("Button Main Rendering", () => {
    it("renders correctly", () => {
        const {rerender} = render(<ProcessingButton processing={false}/>, {});
        let processingBtn = screen.getByTestId('processing-btn')
        expect(processingBtn).not.toBeDisabled();
        rerender(<ProcessingButton processing={true} />);
        expect(processingBtn).toBeDisabled();
    })
})