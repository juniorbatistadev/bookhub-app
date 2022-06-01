import { useCallback, useReducer } from "react";
import { searchBooksCall } from "../../utils/booksApi";

function searchBooksReducer(state, action) {
  switch (action.type) {
    case "SEARCH_BOOKS":
      return { ...state, isLoading: true };
    case "SEARCH_BOOKS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        books: action.payload.books,
        textSearched: action.payload.textSearched,
        page: 1,
      };
    case "SEARCH_BOOKS_ERROR":
      return { ...state, isLoading: false };
    case "SEARCH_BOOKS_LOAD_MORE":
      return {
        ...state,
        isLoadingMore: true,
      };
    case "SEARCH_BOOKS_LOAD_MORE_SUCCESS":
      return {
        ...state,
        isLoadingMore: false,
        books: [...state.books, ...action.payload],
        page: state.page + 1,
      };
    case "SEARCH_BOOKS_RESET":
      return {
        isLoading: false,
        isLoadingMore: false,
        isError: false,
        books: null,
        page: 1,
        textSearched: "",
      };
    default:
      state;
      break;
  }
}

export default function useSearchBooks() {
  const [state, dispatch] = useReducer(searchBooksReducer, {
    isLoading: false,
    isLoadingMore: false,
    isError: false,
    books: null,
    page: 1,
    textSearched: "",
  });

  const searchBooks = async (input) => {
    if (!input) {
      dispatch({ type: "SEARCH_BOOKS_RESET" });
      return;
    }

    try {
      dispatch({ type: "SEARCH_BOOKS" });

      const result = await searchBooksCall(input, 1);
      dispatch({
        type: "SEARCH_BOOKS_SUCCESS",
        payload: { books: result, textSearched: input },
        page: 1,
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: "SEARCH_BOOKS_ERROR" });
    }
  };

  const loadMoreBooks = async (input) => {
    dispatch({ type: "SEARCH_BOOKS_LOAD_MORE", payload: result });

    const result = await searchBooksCall(input, state.page + 1);
    dispatch({ type: "SEARCH_BOOKS_LOAD_MORE_SUCCESS", payload: result });
  };

  return { state, searchBooks, loadMoreBooks };
}
