import {render, screen} from '../../Js/test-utils';
import {translate} from '../../Js/methods';
import Welcome from './Welcome';
import Stories from './Stories';


describe('Welcome component renders correctly', () => {

    const translateWrapper = text => translate(text, 'en');
    
    const user = {
        first_name: 'John',
        last_name: 'Smith'
    }

    it("displays user name correctly", () => {
        render(<Welcome user={user} translate={translateWrapper}/>, {});
        expect(screen.getByText("Welcome back, John")).toBeInTheDocument();
    })
})

describe("Stories component renders correctly", () => {

    it("renders preloader while fetching stories", () => {
        render(<Stories stories={null} />, {});
        expect(screen.queryByTestId('prefetch')).toBeInTheDocument();
    })

    it("displays no stories message when no stories are found", () => {
        render(<Stories stories={[]} />, {});
        expect(screen.queryByText('No stories available!')).toBeInTheDocument();
    })

    it("displays stories when loaded", () => {
        const stories = [
            {id: 1, title: 'Story1', created: Date.now(), author: {nickname: 'Joe', user: {fullname: 'Joe Wheeler'}}},
            {id: 2, title: 'Story2', created: Date.now(), author: {nickname: 'Joe', user: {fullname: 'Joe Wheeler'}}},
        ]

        render(<Stories stories={stories} />, {});
        expect(screen.queryByText('Story1')).toBeInTheDocument();
        expect(screen.queryByText('Story2')).toBeInTheDocument();
    })
})