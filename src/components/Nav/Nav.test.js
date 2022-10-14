import {render, screen} from '../../Js/test-utils';
import Nav from './Nav';
import {store} from '../../Js/store';


describe("Nav Rendering", () => {
    it("renders without crashing", () => {
        render(<Nav />, {});
        expect(screen.getByTestId('mob-nav-test')).toBeInTheDocument();
        expect(screen.getByTestId('pc-nav-test')).toBeInTheDocument();
    })

    it("renders links correctly", () => {
        render(<Nav />, {});
        const loginUser = jest.fn(() => ({type: 'LOGIN_USER', payload: {pk: 1}}));
        expect(store.getState().auth).toBeNull();
        expect(screen.queryByText('Home')).toBeInTheDocument();
        expect(screen.queryByText('Dashboard')).toBeNull();
        store.dispatch(loginUser());
        expect(store.getState().auth).toStrictEqual({pk: 1});
        expect(screen.queryByText('Home')).toBeNull();
        expect(screen.queryByText('Dashboard')).toBeInTheDocument();
    })
})