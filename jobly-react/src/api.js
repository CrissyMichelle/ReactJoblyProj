import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class consolidating methods that send/receive data from API
 *
 */

class JoblyApi {
  // the token for interaction with the API
  static token;

  // convenience method for communicating w/ API endpoints
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //  multiple ways of passing an authorization token exist;
    // provided approach here shows a way of passing the token in the headers
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    console.log("Using token in request: ", JoblyApi.token);
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** companies GET with optional search filters */
  static async getCompanies(filters = {}) {
    let res = await this.request(`companies`, filters);
    return res.companies;
  }

  /** jobs GET method */
  static async getJobs() {
    let res = await this.request(`jobs`);
    return res.jobs;
  }

  /** GET request for user details by username */
  static async getUser(username) {
    console.log("Sending request with token: ", this.token);
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  // function to handle user authentication
  static async authUser(formData) {
    let res = await this.request('auth/token', formData, 'post');
    console.log("Token received after auth: ", res.token);
    return { token: res.token, username: formData.username };
  }
  // send new user data to backend's register function
  static async registerUser(formData) {
    try {
      let res = await this.request('auth/register', formData, 'post');
      return { token: res.token, username: formData.username };
    } catch (err) {
      console.error("Registration error ", err);
      throw err;
    }
  }

  /** PATCH request for Edit Profile user data */ 
  static async updateUser(username, data) {
    console.log("Sending update data to backend: ", data);
    try {
      let res = await this.request(`users/${username}`, data, 'patch');
      console.log("Received update response: ", res);
      return res.user;
    } catch (err) {
      console.error("API Error: ", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }
}

export default JoblyApi;
