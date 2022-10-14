import {store} from '../../Js/store';
import {render} from '../../Js/test-utils';
import Logout from './Logout';


describe('Logout works as expected', () => {
    it("Logsout user successfully", () => {
        const loginUser = jest.fn(() => ({type: 'LOGIN_USER', payload: {pk: 1}}));
        expect(store.getState().auth).toBeNull();
        store.dispatch(loginUser())
        expect(store.getState().auth).toStrictEqual({pk: 1});
        render(<Logout />, {});
        expect(store.getState().auth).toBeNull();
    })
})
