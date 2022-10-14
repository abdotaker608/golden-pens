import {render, screen, fireEvent, cleanup} from '../../Js/test-utils';
import Settings from './Settings';
import Info from './Info';
import Author from './Author';
import Security from './Security';
import {store} from '../../Js/store';
import {translate} from '../../Js/methods';


beforeEach(cleanup);


describe("Settings renders and functions correctly", () => {
    
    it("renders switches between settings windows correctly", () => {
        render(<Settings />, {});
        const loginUser = jest.fn(() => ({type: 'LOGIN_USER', payload: {}}));
        store.dispatch(loginUser());
        expect(screen.getByTestId('test-info')).toHaveClass('active');
        fireEvent.click(screen.getByTestId('test-security'));
        expect(screen.getByTestId('test-info')).not.toHaveClass('active');
        expect(screen.getByTestId('test-security')).toHaveClass('active');
    })
})

describe("Info validates fields correctly", () => {

    it("validates firstname correctly", () => {
        const translateWrapper = text => translate(text, 'en');
        render(<Info translate={translateWrapper} user={{first_name: 'John', last_name: 'Smith', email: 'John@example.com'}} />, {})
        let firstnameInput = screen.getByDisplayValue('John');
        fireEvent.change(firstnameInput, {target: {value: 'Joe'}});
        expect(firstnameInput).toHaveClass('is-valid');
        fireEvent.change(firstnameInput, {target: {value: ''}});
        expect(firstnameInput).toHaveClass('is-invalid');
    })

    it("validates lastname correctly", () => {
        const translateWrapper = text => translate(text, 'en');
        render(<Info translate={translateWrapper} user={{first_name: 'John', last_name: 'Smith', email: 'John@example.com'}} />, {})
        let lastnameInput = screen.getByDisplayValue('Smith');
        fireEvent.change(lastnameInput, {target: {value: 'Joe'}});
        expect(lastnameInput).toHaveClass('is-valid');
        fireEvent.change(lastnameInput, {target: {value: ''}});
        expect(lastnameInput).toHaveClass('is-invalid');
    })

    it("validates email correctly", () => {
        const translateWrapper = text => translate(text, 'en');
        render(<Info translate={translateWrapper} user={{first_name: 'John', last_name: 'Smith', email: 'John@example.com'}} />, {})
        let emailInput = screen.getByDisplayValue('John@example.com');
        //some invalid format for email
        fireEvent.change(emailInput, {target: {value: 'example.com'}});
        expect(emailInput).toHaveClass('is-invalid');
        fireEvent.change(emailInput, {target: {value: ''}});
        expect(emailInput).toHaveClass('is-invalid');
        fireEvent.change(emailInput, {target: {value: 'John@example.eg'}});
        expect(emailInput).toHaveClass('is-valid');
    })
})


describe("Author validates fields correctly", () => {

    it("validates fb link correctly", () => {
        const translateWrapper = text => translate(text, 'en');
        render(<Author translate={translateWrapper} user={{author: {nickname: 'Joe', social: {fb: 'link', insta: '', twitter: ''}}}} />, {})
        let linkInput = screen.getByDisplayValue('link');
        fireEvent.change(linkInput, {target: {value: 'https://www.facebook.com/username'}});
        expect(linkInput).toHaveClass('is-valid');
        fireEvent.change(linkInput, {target: {value: 'www.facebook.com/username'}});
        expect(linkInput).toHaveClass('is-valid');
        fireEvent.change(linkInput, {target: {value: 'facebook.com/profile.php?id=2'}});
        expect(linkInput).toHaveClass('is-valid');
        fireEvent.change(linkInput, {target: {value: 'facebook.com/profile.php=2'}});
        expect(linkInput).toHaveClass('is-invalid');
        fireEvent.change(linkInput, {target: {value: 'facebook.com/another-username'}});
        expect(linkInput).toHaveClass('is-valid');
        fireEvent.change(linkInput, {target: {value: 'facebook.com/another..invalid'}});
        expect(linkInput).toHaveClass('is-invalid');
        fireEvent.change(linkInput, {target: {value: 'domain.com/username'}});
        expect(linkInput).toHaveClass('is-invalid');
    })

    it("validates insta link correctly", () => {
        const translateWrapper = text => translate(text, 'en');
        render(<Author translate={translateWrapper} user={{author: {nickname: 'Joe', social: {fb: '', insta: 'link', twitter: ''}}}} />, {})
        let linkInput = screen.getByDisplayValue('link');
        fireEvent.change(linkInput, {target: {value: 'https://www.instagram.com/username'}});
        expect(linkInput).toHaveClass('is-valid');
        fireEvent.change(linkInput, {target: {value: 'www.instagram.com/username'}});
        expect(linkInput).toHaveClass('is-valid');
        fireEvent.change(linkInput, {target: {value: 'instagram.com/username?id=2'}});
        expect(linkInput).toHaveClass('is-invalid');
        fireEvent.change(linkInput, {target: {value: 'instagram.com/__username__'}});
        expect(linkInput).toHaveClass('is-valid');
        fireEvent.change(linkInput, {target: {value: 'instagram.com/another-username'}});
        expect(linkInput).toHaveClass('is-invalid');
        fireEvent.change(linkInput, {target: {value: 'instagram.com/another.valid'}});
        expect(linkInput).toHaveClass('is-valid');
        fireEvent.change(linkInput, {target: {value: 'domain.com/username23'}});
        expect(linkInput).toHaveClass('is-invalid');
    })

    it("validates twitter link correctly", () => {
        const translateWrapper = text => translate(text, 'en');
        render(<Author translate={translateWrapper} user={{author: {nickname: 'Joe', social: {fb: '', insta: '', twitter: 'link'}}}} />, {})
        let linkInput = screen.getByDisplayValue('link');
        fireEvent.change(linkInput, {target: {value: 'https://www.twitter.com/username'}});
        expect(linkInput).toHaveClass('is-valid');
        fireEvent.change(linkInput, {target: {value: 'www.twitter.com/username'}});
        expect(linkInput).toHaveClass('is-valid');
        fireEvent.change(linkInput, {target: {value: 'twitter.com/username?id=2'}});
        expect(linkInput).toHaveClass('is-invalid');
        fireEvent.change(linkInput, {target: {value: 'twitter.com/__username__'}});
        expect(linkInput).toHaveClass('is-valid');
        fireEvent.change(linkInput, {target: {value: 'twitter.com/another-username'}});
        expect(linkInput).toHaveClass('is-invalid');
        fireEvent.change(linkInput, {target: {value: 'twitter.com/another.valid'}});
        expect(linkInput).toHaveClass('is-invalid');
        fireEvent.change(linkInput, {target: {value: 'twitter.com/Username50'}});
        expect(linkInput).toHaveClass('is-valid');
        fireEvent.change(linkInput, {target: {value: 'domain.com/username23'}});
        expect(linkInput).toHaveClass('is-invalid');
    })
})

describe("Security validates fields correctly", () => {

    it("validates current password correctly", () => {
        const translateWrapper = text => translate(text, 'en');
        render(<Security translate={translateWrapper} user={{}}/>, {});
        let passwordInput = screen.getByLabelText('Current Password');
        fireEvent.change(passwordInput, {target: {value: '1234'}});
        expect(passwordInput).toHaveClass('is-valid');
        fireEvent.change(passwordInput, {target: {value: ''}});
        expect(passwordInput).toHaveClass('is-invalid');
    })

    it("validates password correctly", () => {
        const translateWrapper = text => translate(text, 'en');
        render(<Security translate={translateWrapper} user={{}}/>, {});
        let passwordInput = screen.getByLabelText('Password');
        let conPwInput = screen.getByLabelText('Confirm Password');
        fireEvent.change(passwordInput, {target: {value: '1234'}});
        expect(passwordInput).toHaveClass('is-invalid');
        fireEvent.change(passwordInput, {target: {value: '1234512345123451234566'}});
        expect(passwordInput).toHaveClass('is-invalid');
        fireEvent.change(passwordInput, {target: {value: '12341234'}});
        expect(passwordInput).toHaveClass('is-valid');
        expect(conPwInput).toHaveClass('is-invalid');
        fireEvent.change(conPwInput, {target: {value: '1234123456'}});
        fireEvent.change(passwordInput, {target: {value: '1234123456'}});
        expect(conPwInput).toHaveClass('is-valid');
        expect(passwordInput).toHaveClass('is-valid');
    })

    it("validates confirm password correctly", () => {
        const translateWrapper = text => translate(text, 'en');
        render(<Security translate={translateWrapper} user={{}}/>, {});
        let passwordInput = screen.getByLabelText('Password');
        let conPwInput = screen.getByLabelText('Confirm Password');
        fireEvent.change(passwordInput, {target: {value: '12341234'}});
        expect(passwordInput).toHaveClass('is-valid');
        expect(conPwInput).toHaveClass('is-invalid');
        fireEvent.change(conPwInput, {target: {value: '1234123456'}});
        expect(conPwInput).toHaveClass('is-invalid');
        fireEvent.change(conPwInput, {target: {value: '12341234'}});
        expect(conPwInput).toHaveClass('is-valid');
    })
})