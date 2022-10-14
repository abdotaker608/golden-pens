import {render, screen, fireEvent, act, waitFor, cleanup} from '../../js/test-utils';
import NewStory from './NewStory';
import {store} from '../../Js/store';

beforeEach(() => cleanup());


describe('Cover Form component works correctly', () => {
    
    it("doesn't allow uploading of more than 1 file at a time", async () => {
        const {container} = render(<NewStory />, {});
        const files = [new File(['base64data'], 'one.jpg', {type: 'image/jpg'}), new File(['base64data'], 'two.jpg', {type: 'image/jpg'})];
        const loginUser = jest.fn(() => ({
            type: 'LOGIN_USER',
            payload: {}
        }))
        store.dispatch(loginUser());
        await act(() => waitFor(() => {
            fireEvent.drop(container.querySelector('.builder'), {dataTransfer: {
                files,
                items: files.map(file => ({
                    type: file.type,
                    kind: 'file',
                    getAsFile: () => file
                })),
                types: ['Files']
            }});
        }))
        expect(screen.queryByText("You can only upload 1 file at a time")).toBeInTheDocument();
    })

    it("doesn't allow uploading of files other than jpg and png", async () => {
        const {container} = render(<NewStory />, {});
        const loginUser = jest.fn(() => ({
            type: 'LOGIN_USER',
            payload: {}
        }))
        store.dispatch(loginUser());
        let file = new File(['base64data'], 'image.jpg', {type: 'image/jpg'});
        await act(() => waitFor(() => {
            fireEvent.drop(container.querySelector('.builder'), {dataTransfer: {
                files: [file],
                items: [file].map(file => ({
                    type: file.type,
                    kind: 'file',
                    getAsFile: () => file
                })),
                types: ['Files']
            }});
        }))
        expect(screen.queryByText("You can only upload JPEG and PNG images")).not.toBeInTheDocument();
        file = new File([JSON.stringify({key: 'value'})], 'file.json', {type: 'application/json'});
        await act(() => waitFor(() => {
            fireEvent.drop(container.querySelector('.builder'), {dataTransfer: {
                files: [file],
                items: [file].map(file => ({
                    type: file.type,
                    kind: 'file',
                    getAsFile: () => file
                })),
                types: ['Files']
            }});
        }))
        expect(screen.queryByText("You can only upload JPEG and PNG images")).toBeInTheDocument();
        file = new File(['base64data'], 'image.png', {type: 'image/png'});
        await act(() => waitFor(() => {
            fireEvent.drop(container.querySelector('.builder'), {dataTransfer: {
                files: [file],
                items: [file].map(file => ({
                    type: file.type,
                    kind: 'file',
                    getAsFile: () => file
                })),
                types: ['Files']
            }});
        }))
        expect(screen.queryByText("You can only upload JPEG and PNG images")).not.toBeInTheDocument();
    })

    it("doesn't allow uploading of files more than 2mb", async () => {
        const {container} = render(<NewStory />, {});
        let file = new File(['base64data'], 'image.jpg', {type: 'image/jpg'});
        Object.defineProperty(file, 'size', {value: 1024 * 1024 * 2, writable: false});
        await act(() => waitFor(() => {
            fireEvent.drop(container.querySelector('.builder'), {dataTransfer: {
                files: [file],
                items: [file].map(file => ({
                    kind: 'file',
                    type: file.type,
                    getAsFile: () => file
                })),
                types: ['Files']
            }})
        }))
        expect(screen.queryByText('File size must not exceed 2mb')).not.toBeInTheDocument();
        file = new File(['base64data'], 'image.jpg', {type: 'image/jpg'});
        Object.defineProperty(file, 'size', {value: 1024 * 1024 * 3, writable: false});
        await act(() => waitFor(() => {
            fireEvent.drop(container.querySelector('.builder'), {dataTransfer: {
                files: [file],
                items: [file].map(file => ({
                    kind: 'file',
                    type: file.type,
                    getAsFile: () => file
                })),
                types: ['Files']
            }})
        }))
        expect(screen.queryByText('File size must not exceed 2mb')).toBeInTheDocument();
    })
})

describe("Info form works correctly", () => {

    it("validates title correctly", () => {
        render(<NewStory />, {});
        let input = screen.getByLabelText('Title');
        fireEvent.change(input, {target: {value: 'TITLE'}});
        expect(input).toHaveClass('is-valid');
        fireEvent.change(input, {target: {value: ''}});
        expect(input).toHaveClass('is-invalid');
        expect(screen.queryByText('This field is required!')).toBeInTheDocument();
    })
})
