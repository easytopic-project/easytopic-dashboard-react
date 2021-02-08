import axios from "axios";

export default class API {
  static axios = axios.create();
  static urls = {}
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
}
