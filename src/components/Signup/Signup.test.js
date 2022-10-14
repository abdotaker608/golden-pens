import {fireEvent, screen, render, cleanup} from '../../Js/test-utils';
import Signup from './Signup';
import {store} from '../../Js/store';


beforeEach(() => {
    cleanup();
    render(<Signup />, {});
});


describe('Signup form validations working as expected', () => {

    it('validates firstname input correctly', () => {
        const firstNameInput = screen.getByPlaceholderText('John');
        fireEvent.change(firstNameInput, {target: {value: 'John'}});
        expect(screen.queryByText('This field is required!')).not.toBeInTheDocument();
        fireEvent.change(firstNameInput, {target: {value: ''}});
        expect(screen.queryByText('This field is required!')).toBeInTheDocument();
    })

    it("validates lastname input correctly", () => {
        const lastNameInput = screen.getByPlaceholderText('Smith');
        fireEvent.change(lastNameInput, {target: {value: 'Smith'}});
        expect(screen.queryByText('This field is required!')).not.toBeInTheDocument();
        fireEvent.change(lastNameInput, {target: {value: ''}});
        expect(screen.queryByText('This field is required!')).toBeInTheDocument();
    })

    it("validates email input correctly", () => {
        const emailInput = screen.getByPlaceholderText('John@example.com');
        fireEvent.change(emailInput, {target: {value: 'John@example.com'}});
        expect(screen.queryByText('This field is required!')).not.toBeInTheDocument();
        expect(screen.queryByText('Please enter a valid email address!')).not.toBeInTheDocument();
        fireEvent.change(emailInput, {target: {value: ''}});
        expect(screen.queryByText('This field is required!')).toBeInTheDocument();
        fireEvent.change(emailInput, {target: {value: "Invalid-Format"}});
        expect(screen.queryByText('Please enter a valid email address!')).toBeInTheDocument();
    })

    it("validates password input correctly", async () => {
        const passwordInput = screen.getByTestId('pass-input');
        fireEvent.change(passwordInput, {target: {value: '123456789'}});
        expect(screen.queryByText('Password must be between 8 to 20 characters!')).not.toBeInTheDocument();
        fireEvent.change(passwordInput, {target: {value: '123'}});
        expect(screen.queryByText('Password must be between 8 to 20 characters!')).toBeInTheDocument();
        fireEvent.change(passwordInput, {target: {value: '12341234'}});
        expect(passwordInput).toHaveClass('is-valid');
        fireEvent.change(passwordInput, {target: {value: '1234567890123456789022'}});
        expect(passwordInput).toHaveClass('is-invalid');
    })

    it("validates confirm password input correctly", async () => {
        const passwordInput = screen.getByTestId('pass-input');
        const conPwInput = screen.getByTestId('conpw-input');

        //Note that to trigger the validation for confirm password input we need to pass the password input validation
        //which requires it to have a length between 8-20 characters
        fireEvent.change(passwordInput, {target: {value: '123456789'}});
        expect(screen.queryByText("Passwords don't match")).toBeInTheDocument();
        fireEvent.change(conPwInput, {target: {value: '123456789'}});
        expect(conPwInput).toHaveClass('is-valid');
        fireEvent.change(conPwInput, {target: {value: '12341234'}});
        expect(conPwInput).toHaveClass('is-invalid');
        fireEvent.change(passwordInput, {target: {value: '12341234'}});
        expect(conPwInput).toHaveClass('is-valid');
        fireEvent.change(passwordInput, {target: {value: '1234123422'}});
        expect(conPwInput).toHaveClass('is-invalid');

    })

})