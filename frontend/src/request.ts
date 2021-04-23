import config from "./config";
import {LOCAL_STORAGE_TOKEN_KEY} from "./App";

interface RequestOptions {
  method?: string,
  path?: string,
  body?: any,
  isProtected?: boolean,
  authFailure?: () => any,
}

export default (options: RequestOptions) => {
  const defaultOptions: RequestOptions = {
    isProtected: true,
    path: '',
    method: 'GET',
  }

  options = {...defaultOptions, ...options}

  const fetchOptions: any = {
    method: options.method,
    headers: {
      'Content-Type': 'application/json'
    },
  }

  if (options.body) {
    fetchOptions.body = JSON.stringify(options.body)
  }

  if (options.isProtected) {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
    fetchOptions.headers['Authorization'] = `Bearer ${token}`
  }

  return fetch(`${config.api}/${options.path}`, fetchOptions)
    .then(response => {
      if (response.status < 300) {
        return response.json()
      } else if (response.status < 500) {
        options.authFailure && options.authFailure()
      } else if (response.status < 600) {
        // throw up
      }
    })
}
