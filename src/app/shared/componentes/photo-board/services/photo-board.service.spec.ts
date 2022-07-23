import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PhotoBoardService } from './photo-board.service';
import { Photo } from '../interfaces/photo';

const mockData = {
  api: 'http://localhost:3000/photos',
  data: [
    {
      id: 1,
      description: 'example 1',
      url: ''
    } as Photo,
    {
      id: 2,
      description: 'example 2',
      url: ''
    } as Photo,
    {
      id: 3,
      description: 'example 3',
      url: ''
    } as Photo,
  ]
}

fdescribe(PhotoBoardService.name, () => {
  let service: PhotoBoardService;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], //HttpClientTestingModule, ele vai sobrescrever o provider padrão do HttpClient
      providers: [PhotoBoardService]
    }).compileComponents();

    service = TestBed.inject(PhotoBoardService);
    httpController = TestBed.inject(HttpTestingController); //Assim como qualquer serviço, pode ser injetado através de TestBed.inject, porém é necessário que o módulo HttpClientTestingModule tenha sido importado pelo módulo do teste.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });



  //Existe o beforeEach, mas também tem o afterEach, nele nós fazemos afterEach(() => httpController.verify()) para ele checar se você não perdeu algo, checar se tem alguma requisição que você fez nesse teste que você não deu uma resposta, porque você precisa dar. 
  //Exemplo de teste de service quando existe a alteração de dados quando recebido do backEnd
  afterEach(() => httpController.verify())
  it(`#${PhotoBoardService.prototype.getPhotos.name}
    should return photos with description in uppercase`, done => {

    service.getPhotos().subscribe(photos => {
      expect(photos[0].description).toBe(photos[0].description.toUpperCase());
      expect(photos[1].description).toBe(photos[1].description.toUpperCase());
      expect(photos[2].description).toBe(photos[2].description.toUpperCase());
      done();
    });

    //Então a chamada do httpController tem que ser depois. Porque ele tem que esperar ser realizada uma requisição para depois saber o que vai fazer com ela.
    //A chamada expectOne, tem que ficar depois da realização do seu subscribe, que dispara a requisição para o backend. Vou explicar o porquê. Quando você está fazendo essa requisição da linha 36 a linha 40, você fez, é como se o httpClient estivesse esperando agora alguém decidir qual vai ser a resposta dele
    // Espera uma requisição para mockData.api. Se ela for feita, você vai fazer um flush, o dado que o httpClient vai mandar não é do backend, é um dado falso. E vai ser .flush(mockData.data). Ele vai me retornar esse dado.
    // Você está programando pelo httpController que se uma requisição for feita para o endereço http://localhost:3000/photos, você vai substituir os dados com esse dado id, description, src. Como o meu subscribe vai ter passado, vai ser disparado, quando ele fizer essa requisição, ele vai receber os dados que está dentro do mockData.data
    httpController.expectOne(mockData.api)
    .flush(mockData.data);

  });
});
