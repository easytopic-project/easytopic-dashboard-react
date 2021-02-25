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
    fileServer: "http://localhost:3001/files",
    pipeline: "http://localhost:8080/pipeline",
  };
  // Definir metodos para conversar com a api

  static async waitTimeout(time = 2000) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  static async postForm() {
    // Postar o formulario de arquivos 
  }

  static async getPipelines() {
    return await this.axios.get(`${this.urls.pipeline}/options`)
  }

  static async getStatus() {
    // Status do processo (?)
  }

  static async postFile(file) {
    return await this.axios.post(this.urls.fileServer, file);
  }

  static async deleteFile(file) {
    return await this.axios.delete(`${this.urls.fileServer}/${file.name}`, file);
  }

  static async postOcrJob(obj, route) {
    console.log(obj);
    return await this.axios.post(`${this.urls.pipeline}/${route}`, obj);
  }

  static async getOcrJob(id) {
    const [res] = await Promise.all([this.axios.get(`${this.urls.pipeline}/${id}`), this.waitTimeout()]);
    console.log(res);
    return res;
  }
}
