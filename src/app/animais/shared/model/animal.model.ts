export interface Animal {
    id: number;
    postDate: Date;
    url: string;
    description: string;
    allowComments: boolean;
    likes: number;
    comments: number;
    userId: number;
}

/*
Vou criar um tipo. Então export type, 
o tipo nós vamos colocar como Animais.

Animais é um array de Animal. 
Então Animais = Array<Animal>;. Você até poderia colocar 
esse Array<Animal> aqui no serviço, só que desse jeito fica 
mais semântico, então ele vai receber Animais. E o que 
é Animais? É um array de Animal
*/
export type Animais = Array<Animal>;