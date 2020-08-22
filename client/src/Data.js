import config from './config';

export default class Data {
  // used to make the GET and POST requests to the REST API
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
      const url = config.apiBaseUrl + path;

      // configuration object that lets you control a number of different settings
      // sends a request with the HTTP method along with request headers and a stringified body
      const options = {
          method,
          headers: {
              'Content-Type': 'application/json; charset=utf-8',
          },
      };

      if(body !== null) {
          options.body = JSON.stringify(body);
      }

      // Check if auth is required 
      if(requiresAuth) {
        const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);

        options.headers['Authorization'] = `Basic ${encodedCredentials}`;
      }

      return fetch(url, options);
  }

  // makes a GET request to the /users endpoint, and returns a JSON object
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  // makes a POST request, sending the new user data to the /users endpoint
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
}