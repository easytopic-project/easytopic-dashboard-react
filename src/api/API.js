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
    pipeline: "http://localhost:3000/pipeline",
  };
  // Definir metodos para conversar com a api

  static async postForm() {
    // Postar o formulario de arquivos 
  }

  static async getPipelines() {
    // Receber lista de pipelines disponíveis (?)
  }

  static async getStatus() {
    // Status do processo (?)
  }

  static async postFile(file) {
    return await this.axios.post(this.urls.fileServer, file);
  }

  static async postJob(obj) {
    const data = {
      "file": obj,
    }
    return await this.axios.post(`${this.urls.pipeline}/ocr`, data);
  }

  static async getOcrJob(id) {
    return await this.axios.get(`${this.urls.pipeline}/${id}`);
  }
}
