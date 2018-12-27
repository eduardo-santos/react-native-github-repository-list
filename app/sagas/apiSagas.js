import {
  takeEvery, call, put,
} from 'redux-saga/effects';

import { 
  GET_API_GITHUB_PUBLIC_LIST,
  GET_API_GITHUB_PUBLIC_LIST_SUCCESS,
  GET_API_GITHUB_PUBLIC_LIST_ERROR,
 } from '../actions/apiGitHubRepositoryList';

// URLS
const BASE_URL = 'https://api.github.com';
export const URL_LIST_REPOSITORIES = `${BASE_URL}/repositories`;

// HEADERS
const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');

const createGet = () => ({ method: 'GET', headers });

// GENERAL RESPONSE HANDLER
function* handleCallResponse(response, actionTypeSuccess, actionTypeError) {
  try {
    const result = yield response.json();

    if (response.status !== 200) {
      let apiErrors = result.Errors ? result.Errors : [{ Message: 'Ocorreu um erro inesperado. Tente novamente.' }];

      if (response.status === 408) {
        apiErrors = [{ Message: 'O tempo limite da requisição foi atingido. Tente novamente.' }];
      }

      yield put({ type: actionTypeError, sagaErrors: { Errors: apiErrors } });
    } else {
      yield put({ type: actionTypeSuccess, sagaSuccessResult: result });
    }
  } catch (e) {
    yield put({ type: actionTypeError, sagaErrors: { Errors: [{ Message: e.message }] } });
  }
}

const getRepositoryList = (since) => fetch(`${URL_LIST_REPOSITORIES}?since=${since}`, createGet());

function* getApiRepositoryList(action) {
  const response = yield call(getRepositoryList, action.since);
  yield handleCallResponse(response, GET_API_GITHUB_PUBLIC_LIST_SUCCESS, GET_API_GITHUB_PUBLIC_LIST_ERROR);
}

export const apiSagas = [
  takeEvery(GET_API_GITHUB_PUBLIC_LIST, getApiRepositoryList),
];

export default apiSagas;
