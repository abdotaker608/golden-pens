import {render, fireEvent, screen, cleanup} from '../../Js/test-utils';
import InfoForm from './InfoForm';
import {store} from '../../Js/store';
import {translate as trans} from '../../Js/methods';

beforeEach(() => {
    cleanup();
    store.dispatch({type: 'LOGIN_USER', payload: {}});
})


describe("Info form validates fields correctly", () => {

    it("validates title correctly", () => {
        render(<InfoForm story={{}} translate={text => trans(text, 'en')} lang='en' authToken={1}/>, {});
        const input = screen.getByPlaceholderText('Title');
        fireEvent.change(input, {target: {value: 'Title'}});
        expect(input).toHaveClass('is-valid');
        expect(screen.queryByText('This field is required!')).not.toBeInTheDocument();
        fireEvent.change(input, {target: {value: ''}});
        expect(input).toHaveClass('is-invalid');
        expect(screen.queryByText('This field is required!')).toBeVisible();
    })
})