import {render, screen, cleanup} from '../../Js/test-utils';
import AuthorCover from './AuthorCover';


beforeEach(cleanup);

describe("Author cover renders and performs as expected", () => {

    const author = {
        user: {
            fullname: 'John Smith',
            pk: 1
        },
        nickname: 'Johnny',
        followers: [2, 4, 9]
    }

    it("renders wihtout crashing", () => {
        render(<AuthorCover author={author} />, {});
        expect(screen.queryByText('Johnny')).toBeInTheDocument();
    })

    it("disables follow button when there is no user", () => {
        render(<AuthorCover author={author} user={null}/>, {});
        expect(screen.getByRole('button')).toBeDisabled();
    })

    it("disables follow button when the user is the author it self", () => {
        render(<AuthorCover author={author} user={{pk: author.user.pk}}/>, {});
        expect(screen.getByRole('button')).toBeDisabled();
    })

    it("enables follow button when there is a valid user", () => {
        render(<AuthorCover author={author} user={{pk: 2}}/>, {});
        expect(screen.getByRole('button')).not.toBeDisabled();
    })
})