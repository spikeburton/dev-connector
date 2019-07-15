import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  ADD_POST,
  DELETE_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from './types';

// Get posts
export const getPosts = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/api/posts');

      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.reponse.status }
      });
    }
  };
};

// Add like
export const addLike = postId => {
  return async dispatch => {
    try {
      const res = await axios.put(`/api/posts/like/${postId}`);

      dispatch({
        type: UPDATE_LIKES,
        payload: { postId, likes: res.data }
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
};

// Remove like
export const removeLike = postId => {
  return async dispatch => {
    try {
      const res = await axios.put(`/api/posts/unlike/${postId}`);

      dispatch({
        type: UPDATE_LIKES,
        payload: { postId, likes: res.data }
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
};

// Delete post
export const deletePost = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/posts/${id}`);

      dispatch({
        type: DELETE_POST,
        payload: id
      });

      dispatch(setAlert('Post Removed', 'success'));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
};

// Add post
export const addPost = formData => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const res = await axios.post('/api/posts', formData, config);

      dispatch({
        type: ADD_POST,
        payload: res.data
      });

      dispatch(setAlert('Post Created', 'success'));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
};

// Get a single post
export const getPost = id => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/posts/${id}`);

      dispatch({
        type: GET_POST,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.reponse.status }
      });
    }
  };
};

// Add Comment
export const addComment = (postId, formData) => {
  return async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post(
        `/api/posts/comment/${postId}`,
        formData,
        config
      );

      dispatch({
        type: ADD_COMMENT,
        payload: res.data
      })

      dispatch(setAlert('Comment Added', 'success'));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.reponse.status }
      });
    }
  };
};

// Delete Comment
export const deleteComment = (postId, commentId) => {
  return async dispatch => {
    try {
      await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

      dispatch({
        type: REMOVE_COMMENT,
        payload: commentId
      })
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.reponse.status }
      });
    }
  }
}
