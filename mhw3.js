const CONTENUTI=[
    {
        titolo:'Crunches',
        immagine:'',
        id:''
    },
    
    {
        titolo:'Crunch Inclinati',
        immagine:'',
        id:''
    },
    
    {
        titolo:'Hyperextensions',
        immagine:'',
        id:''
    },
    
    {
        titolo:'Bench Press(presa stretta)',
        immagine:'',
        id:''
    },
    
    {
        titolo:'Bicipiti al pulley',
        immagine:'',
        id:''
    },
    {
        titolo:'Bicipiti con manubri',
        immagine:'',
        id:''
    },
    {
        titolo:'Stacco',
        immagine:'',
        id:''
    },
    {
        titolo:'Dips alle parallele',
        immagine:'',
        id:''
    },
    {
        titolo:'Dips su panca',
        immagine:'',
        id:''
    },
    {
        titolo:'Alzate laterali',
        immagine:'',
        id:''
    },
    {
        titolo:'Tirate al mento(bilanciere piccolo)',
        immagine:'',
        id:''
    },
    {
        titolo:'Bicipiti a martello',
        immagine:'',
        id:''
    },
    {
        titolo:'Bicipiti alla corda',
        immagine:'',
        id:''
    },
    {
        titolo:'Push-up',
        immagine:'',
        id:''
    },
    {
        titolo:'French-press',
        immagine:'',
        id:''
    },
    {
        titolo:'Tricipiti un manubrio',
        immagine:'',
        id:''
    },
    {
        titolo:'Squat',
        immagine:'',
        id:''
    },
    {
        titolo:'Bench Press',
        immagine:'',
        id:''
    },
    {
        titolo:'Tirate al mento(bilanciere grande)',
        immagine:'',
        id:''
    },
    {
        titolo:'Trazioni inverse',
        immagine:'',
        id:''
    },

]

const exe_selezionati=[];

const exerices_key='d6908488de27fe20034dc0616e4653902e4cf206';
const img_endpoin='https://wger.de/api/v2/exerciseimage/';
const app_id='ab39e35c';
const app_key='dda0bbfd59dab43e8cf0a1e2f0dc6bf7';
const app_endpoint='https://api.edamam.com/search';

function onResponse(response){
    console.log('Risposta ricevuta');
    return response.json();
}

const form=document.querySelector("form");
form.addEventListener("submit",search);

function search(event){
    event.preventDefault();
    const content=document.querySelector('#content').value;
    if(!content){
        alert("inserisci testo nella barra di ricerca");
    }else{
        const text=encodeURIComponent(content);
        const app_request=app_endpoint+'?app_id='+app_id+'&app_key='+app_key+'&q='+text;
        fetch(app_request,
            {
                method:'POST',
                headers:{
                'Content-Type':'application/json',
                'mode':'no-cors'
                }
         }).then(onResponse).then(onJSONapp);

    }
}


 function onJSONapp(json){
    console.log(json);
    const lib=document.querySelector("#food");
    lib.innerHTML='';
    if(exe_selezionati.length!==0){
        const cards=document.querySelectorAll("section#esercizi div.card");
        const sez=document.querySelector("section#esercizi div");
        for(card of cards){
            
            sezione.removeChild(card);
        }
        for(sel of exe_selezionati){
            exe_selezionati.splice(exe_selezionati.indexOf(sel),1);
        }
    }
    const risultati=json.hits;
    var cal=(risultati[0].recipe.calories)/10;
    const calorie=Math.floor(cal);
    const image=risultati[0].recipe.image;
    const blocco=document.createElement('div');
    blocco.classList.add('blocco');
    const img=document.createElement('img');
    img.src=image;
    const testo=document.createElement('h1');
    testo.textContent='Calorie assunte(100gr): '+calorie+'cal';
    blocco.appendChild(img);
    blocco.appendChild(testo);
    lib.appendChild(blocco);
    if(calorie<100){
        for(let i=0;i<4;i++){
            let j= Math.floor(Math.random()*(20-0))+0;
            console.log(j);
            exe_selezionati.push(CONTENUTI[j]);
            sezione=document.querySelector("section#esercizi div.show-case");
            crea_nodo(sezione,CONTENUTI[j]);
        }
        document.querySelector("section#esercizi").classList.remove("hide");
        document.querySelector("section#esercizi").classList.add("show");
       }
    else if(calorie>300){
        for(let i=0;i<6;i++){
            let j= Math.floor(Math.random()*(20-0))+0;
            console.log(j);
            exe_selezionati.push(CONTENUTI[j]);
            sezione=document.querySelector("section#esercizi div.show-case");
            crea_nodo(sezione,CONTENUTI[j]);
        }
        document.querySelector("section#esercizi").classList.remove("hide");
        document.querySelector("section#esercizi").classList.add("show");
    }
    else if(calorie>100 && calorie<300){
        for(let i=0;i<5;i++){
            let j= Math.floor(Math.random()*(20-0))+0;
            console.log(j);
            exe_selezionati.push(CONTENUTI[j]);
            sezione=document.querySelector("section#esercizi div.show-case");
            crea_nodo(sezione,CONTENUTI[j]);
        }
        document.querySelector("section#esercizi").classList.remove("hide");
        document.querySelector("section#esercizi").classList.add("show");
    }
}



const img_request=img_endpoin+'?key='+exerices_key+'?format=json&limit=118';
fetch(img_request).then(onResponse).then(onJSONimg);

function onJSONimg(json){
    console.log(json);
    const risultati=json.results;
    let num_results=risultati.length;
    if(num_results>20)
    num_results=20;
    for(let i=0;i<num_results;i++){
        const cont=risultati[i];
        const identificativo=cont.exercise;
        CONTENUTI[i].id=identificativo;
        const img=cont.image;
        CONTENUTI[i].immagine=img;
    }
    console.log(CONTENUTI);
}

function crea_nodo(sezione,elemento){
    const nodo=document.createElement("div");
    nodo.classList.add("card");
    const immagine=document.createElement("img");
    immagine.src=elemento.immagine;
    immagine.classList.add("image");
    const about=document.createElement("div");
    const titolo=document.createElement("h5");
    titolo.textContent=elemento.titolo;
    const serie=document.createElement('form');
    const num_serie=document.createElement('select');
    const testo=document.createElement('p');
    testo.textContent='Seleziona il numero di serie';
    for(let i=0;i<6;i++){
        const numero=document.createElement('option');
        numero.textContent=''+i;
        num_serie.appendChild(numero);
        serie.appendChild(num_serie);
    }
    about.appendChild(titolo);
    about.appendChild(testo);
    about.appendChild(serie);
    nodo.appendChild(immagine);
    nodo.appendChild(about);
    nodo.dataset.codice=elemento.id;
    sezione.appendChild(nodo);
}


