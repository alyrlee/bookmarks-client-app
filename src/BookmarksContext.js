import React from 'react'

const BookmarksContext = React.createContext({
    bookmarks: [],
    addBokmark: () => {},
    deleteBookmark: () => {},
})