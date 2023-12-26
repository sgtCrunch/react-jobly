import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;
  static username;
  static user;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
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

  /** Get details on a job by id. */
  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  /** Get jobs list can incude query specifications minSalary, hasEquity, and title*/
  static async getJobs(query = {}) {
    let res = await this.request(`jobs`, query);
    return res.jobs;
  }

  /** Get jobs list can incude query specifications minSalary, hasEquity, and title*/
  static async getCompanies(query = {}) {
    let res = await this.request(`companies`, query);
    return res.companies;
  }

  static async registerUser(userData) {
    let res = await this.request(`auth/register`, userData, 'post');
    this.token = res.token;
    this.username = userData.username;
    this.user = await this.getUser();
    this.user.token = this.token
    return this.user;
  }
  

  /** Using username and password return a token to login **/
  static async loginUser(loginInfo) {
    let res = await this.request(`auth/token`, loginInfo, "post");
    this.token = res.token;
    this.username = loginInfo.username;
    this.user = await this.getUser();
    this.user.token = this.token;
    return this.user;
  }

  static async updateUser(userData) {
    delete userData.username;
    let res = await this.request(`users/${this.username}`, userData, "patch");
    this.user = await this.getUser();
    return res.user;
  }

  static async getUser() {
    let res = await this.request(`users/${this.username}`);
    return res.user;
  }

  static async logout(){
    this.token = "";
    this.user = {};
    this.username = "";
  }

  static async refreshLogin(token, username) {
    this.token = token;
    this.username = username;
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async applyJob(id) {
    let res = await this.request(`users/${this.username}/jobs/${id}`, {}, "post");
    return res;
  }

}

export default JoblyApi;
// for now, put token ("testuser" / "password" on class)
/*JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";*/
