import { Photo } from "../interfaces/photo";

//uma pasta chamada teste, que nela ficarão os artefatos, as funções utilitárias para teste desse módulo.
//Simula o consumo da api
export function buildPhotoList(): Photo[] {
    const photos = [] as Photo[];
  
    for (let i = 0; i < 8; i++) {
      photos.push({
        id: i + 1,
        url: '',
        description: ''
      })
    }
    return photos;
  }