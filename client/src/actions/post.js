import axios from 'axios';
import { setAlert } from './alert';
import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from './types';

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
