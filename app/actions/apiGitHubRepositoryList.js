export const GET_API_GITHUB_PUBLIC_LIST = "GET_API_GITHUB_PUBLIC_LIST";
export const GET_API_GITHUB_PUBLIC_LIST_SUCCESS = "GET_API_GITHUB_PUBLIC_LIST_SUCCESS";
export const GET_API_GITHUB_PUBLIC_LIST_ERROR = "GET_API_GITHUB_PUBLIC_LIST_ERROR";

export const CLEAN_RESULT = "GITHUB_PUBLIC_LIST_CLEAN_RESULT";

export const apiGetGitHubList = (since) => ({
  type: GET_API_GITHUB_PUBLIC_LIST,
  since
});

export const cleanResult = () => ({
  type: CLEAN_RESULT
});
