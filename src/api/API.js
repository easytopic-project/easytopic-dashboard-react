import axios from "axios";

export default class API {

  static axios = axios.create({
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });

  static urls = {
    fileServer: `${process.env.REACT_APP_FILE_SERVER_URL}/files`,
    pipeline: `${process.env.REACT_APP_API_URL}/pipeline`,
  };
  // Definir metodos para conversar com a api

  static async waitTimeout(time = 2000) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  static async getPipelines() {
    return await this.axios.get(`${this.urls.pipeline}/options`)
  }

  static async getStatus() {
    // Status do processo (?)
  }

  static getFileLink(file) {
    return `${this.urls.fileServer}/${file}`;
  }

  static async postFile(file) {
    return await this.axios.post(this.urls.fileServer, file);
  }

  static async deleteFile(file) {
    return await this.axios.delete(`${this.urls.fileServer}/${file.name}`, file);
  }

  static async postJob(obj, route) {
    console.log(obj);
    return await this.axios.post(`${this.urls.pipeline}/${route}`, obj);
  }

  static async getJob(id) {
    const [res] = await Promise.all([this.axios.get(`${this.urls.pipeline}/${id}`), this.waitTimeout()]);
    console.log(res);
    return res;
  }

  static async getJobs() {
    return await this.axios.get(this.urls.pipeline);
  }
}
