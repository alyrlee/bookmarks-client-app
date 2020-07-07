import React from 'react';
import PropTypes from 'prop-types';
import Rating from '../Rating/Rating';
import config from '../config';
import './BookmarkItem.css';
import BookmarksContext from '../BookmarksContext'


function deleteBookmarkRequest(bookmarkId, cb) {
//fetch API
//DELETE
//headers

  fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      'authorization': `bearer ${config.API_KEY}`
    }
  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => Promise.reject(error))
      }
      return res.json()
    })
    .then(data => {
      cb(bookmarkId)
    })
    .catch(error => {
      console.error(error)
    })
}

export default function BookmarkItem(props) {
  return (
<BookmarksContext.Consumer>
     {(context) => (
    <li className='BookmarkItem'>
      <div className='BookmarkItem__row'>
        <h3 className='BookmarkItem__title'>
          <a
            href={props.url}
            target='_blank'
            rel='noopener noreferrer'>
            {props.title}
          </a>
        </h3>
        <Rating value={props.rating} />
      </div>
      <p className='BookmarkItem__description'>
        {props.description}
      </p>
      <div className='BookmarkItem__buttons'>
      <button
        className='BookmarkItem__description'
        onClick={() => {
           deleteBookmarkRequest(props.id, context.deleteBookmark,)
   }}
   >
                           Delete
                         </button>
                       </div>
                     </li>
                  )}
                </BookmarksContext.Consumer>
  )
}

BookmarkItem.defaultProps = {
  onClickDelete: () => {},
}

//added proptTypes for Bookmarl Item

BookmarkItem.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  desciption: PropTypes.string,
  rating: PropTypes.number.isRequired,
  onClickDelete: PropTypes.func,
}
