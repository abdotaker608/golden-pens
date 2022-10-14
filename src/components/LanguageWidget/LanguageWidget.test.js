import {render, screen, fireEvent} from '../../Js/test-utils';
import LanguageWidget from './LanguageWidget';
import LanguageSelector from './LanguageSelector';
import {store} from '../../Js/store';

describe("Test configuration", () => {
    it("starts with default language", () => {
        const {getByText} = render(<LanguageWidget />, {});
        expect(getByText('English (U.S)')).toBeInTheDocument();
        render(<LanguageSelector lang='en' />, {})
        expect(screen.getByRole('list').querySelector('.active')).toHaveTextContent('English (U.S)');
    })

    it("switches between languages successfully", () => {
        render(<LanguageWidget />, {});
        fireEvent.click(screen.getByTestId('lang-widget-test'), {});
        
        expect(store.getState().lang).toBe('en');
        expect(screen.getByRole('list').querySelector('.active')).toHaveTextContent('English (U.S)');
        expect(screen.getByTestId('lang-widget-test')).toHaveTextContent('English (U.S)');

        const switchLanguageTo = jest.fn((lang) => ({type: 'SWITCH_LANGUAGE', payload: lang}));
        store.dispatch(switchLanguageTo('ar'));

        expect(store.getState().lang).toBe('ar');
        expect(screen.getByRole('list').querySelector('.active')).toHaveTextContent('العربية');
        expect(screen.getByTestId('lang-widget-test')).toHaveTextContent('العربية');
    })
})