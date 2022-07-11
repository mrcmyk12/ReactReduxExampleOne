import jsonPlaceholder from "../apis/jsonPlaceholder";
import _ from 'lodash'

export const fetchPostsAndUsers = () => async (dispatch, getState ) => {
	await dispatch(fetchPosts());
	
	//lodash function to get a post of all of the userId's and get the unique userIds
	const userIds = _.uniq(_.map(getState().posts, 'userId'));

	userIds.forEach(id => dispatch(fetchUser(id)));
}

export const fetchPosts = () => {
	return async (dispatch) => {
		const response = await jsonPlaceholder.get("/posts");

		dispatch({ type: "FETCH_POSTS", payload: response.data });
	};
};

export const fetchUser = (id) => {
	return async (dispatch) => {
		const response = await jsonPlaceholder.get(`/users/${id}`);

		dispatch({type: "FETCH_USER", payload: response.data})
	}
}

//MEMOIZATION VERSION
//we need this in order to make sure we don't make over 100 calls to the API
//memoization function makes just one function call when a particular function is called with particular 
//parameters
// export const fetchUser = id => dispatch => {
// 	_fetchUser(id,dispatch);
// };

// const _fetchUser = _.memoize(async (id,dispatch) => {
// 	const response = await jsonPlaceholder.get(`/users/${id}`);

// 	dispatch({ type: 'FETCH_USER', payload: response.data });
// });
