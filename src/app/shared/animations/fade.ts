import { animate, style, transition, trigger } from "@angular/animations";

//para usar esse cara ver o modal.component.ts

export const fade = trigger(
    'fade', //Esse gatilho, a primeira coisa que você tem que dar é um nome para ele. Eu vou dar o nome fade
    [   //É uma lista de transições que você quer clicar para esse gatilho
        transition( //vou chamar a função transition que também vem lá do módulo Angular Animation
            //Então essa transição, você tem que dizer para ela se ela vai ser aplicada quando o elemento está entrando no DOM ou quando ele está saindo no DOM.        
            ':enter', //para você aplicar essa animação quando está entrando no DOM, você usa essa pseudoclasse do Angular :enter
            [
                //para efeito de animação, quando ele não está no DOM, eu quero que ele seja inicializado com estilo, aí eu vou importar a função style também do módulo Angular Animation.
                style({ opacity: 0}),  //Eu quero colocar um estilo e eu passo um objeto jaca script que me permite passar as propriedades scss. Eu vou dizer o opacity vai ser 0
                animate(1000, style({ opacity: 1 })) // Eu vou fazer um animate. Aí eu vou importar essa função animate do Angular Animation.
                //E eu vou fazer animate de quê? Vou colocar um valor absurdo aqui, mil de 1 segundo e vou dizer que depois de mil segundos o style vai para opacity 1.
            ]
        ),
        transition( 
        ':leave', //:leave, que é quando o elemento sai do DOM
        [   //Quando o elemento sai do DOM, eu não quero setar valor inicial nenhum, não faz sentido setar um valor inicial. O que eu quero é animar durante tantos segundos, durante 1 segundo animação que estava 1 para chegar até 0. Aí o Angular é inteligente para aplicar essa animação e quando ela termina, aí ele remove o elemento do DOM para nós
            animate(1000, style({ opacity: 0 }))
        ]
    )
    ]
);