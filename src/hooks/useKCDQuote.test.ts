import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react-dom/test-utils';
import { quotes, useKCDQuote } from './useKCDQuote';

describe("useKCDQuote", () => {

    it("should return the first quote on initial render", () => {
        // when:
        const { result } = renderHook(() => useKCDQuote());
        
        // then:
        expect(result.current.currentQuote).toBe(quotes[0]);
    });

    it("should return the next quote when calling nextQuote", () => {
        // given:
        const { result } = renderHook(() => useKCDQuote());
        
        // when: asking for the next quote
        act(() => {
            result.current.nextQuote();
        });

        // then: the quote should be updated to contain the next quote
        expect(result.current.currentQuote).toBe(quotes[1]);
    });

    it("should return the same quote upon re-render", () => {
        // given:
        const { result, rerender } = renderHook(() => useKCDQuote());
        act(() => {
            result.current.nextQuote();
        });
        
        // when: re-rendering the component
        rerender();

        // then: the quote stays the same
        expect(result.current.currentQuote).toBe(quotes[1]);
    });

    it("should loop through all quotes", () => {
        // given:
        const { result } = renderHook(() => useKCDQuote());
        
        // when: looping through all quotes
        for (let i = 0; i < quotes.length; i++) {
            act(() => {
                result.current.nextQuote();
            });
        }

        // then: the quote stays the same
        expect(result.current.currentQuote).toBe(quotes[0]);
    });

});