import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookmarkContext = createContext();

const initialState = {
  bookmarkedItems: [],
};

const bookmarkReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_BOOKMARK':
      return { ...state, bookmarkedItems: [...state.bookmarkedItems, action.payload] };
    case 'REMOVE_BOOKMARK':
      return { ...state, bookmarkedItems: state.bookmarkedItems.filter(item => item.hash_id !== action.payload.hash_id) };
    case 'SET_BOOKMARKS':
      return { ...state, bookmarkedItems: action.payload };
    default:
      return state;
  }
};

const BookmarkProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookmarkReducer, initialState);

  useEffect(() => {
  // Load bookmarks from AsyncStorage when the component mounts
  const loadBookmarks = async () => {
    try {
      const savedBookmarks = await AsyncStorage.getItem('bookmarkedItems');
      if (!savedBookmarks) {
        // If there are no existing bookmarks, add the default item
        dispatch({ type: 'ADD_BOOKMARK', payload: { hash_id: 'MzcxIzI=', title : "Jumlah Penduduk Provinsi Sulawesi Tenggara , 2023", value : 2749010, unit : 'Jiwa' } });
      } else {
        dispatch({ type: 'SET_BOOKMARKS', payload: JSON.parse(savedBookmarks) });
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    }
  };

  loadBookmarks();
}, []);

  useEffect(() => {
    // Save bookmarks to AsyncStorage whenever the bookmarkedItems state changes
    const saveBookmarks = async () => {
      try {
        await AsyncStorage.setItem('bookmarkedItems', JSON.stringify(state.bookmarkedItems));
      } catch (error) {
        console.error('Error saving bookmarks:', error);
      }
    };

    saveBookmarks();
  }, [state.bookmarkedItems]);

  const addBookmark = (item) => dispatch({ type: 'ADD_BOOKMARK', payload: item });
  const removeBookmark = (item) => dispatch({ type: 'REMOVE_BOOKMARK', payload: item });

  return (
    <BookmarkContext.Provider value={{ bookmarkedItems: state.bookmarkedItems, addBookmark, removeBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};

const useBookmarkContext = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarkContext must be used within a BookmarkProvider');
  }
  return context;
};

export { BookmarkProvider, useBookmarkContext };