//definir api
const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCc7_woMAIVIW2mAr1rPCsFQ&part=snippet%2Cid&order=date&maxResults=10'


//agregando referencia del elemento dónde queremos colocar el llamado de la api
const content=null||document.getElementById("content")

//definir opciones de conexión de api
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '37d94d5ccbmshf3c8f135a3f1889p11ce55jsnebef264b4ccf',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
};

//función asíncrona para recuperar los datos de la api
async function fetchData(urlApi){
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}

//función que se ejecuta automáticamente y se llama a sí misma
(async () => {
    try{
        const videos = await fetchData(API);
        //generar un template string para la iteración de elementos recuperados en "const=videos"
        let view=`
        ${videos.items.map(video=>`
          <a href="https://youtube.com/watch?v=${video.id.videoId}" target="_blank">
            <div class="w-80 mt-px mb-2.5 cursor-pointer overflow-hidden border">
              <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
              <h3 class="text-sm text-gray-700 text-center">
                ${video.snippet.title}
              </h3>
            </div>
          </a>`).slice(0,10).join('')}
        `;
        //añadir arreglo de items a elemento "content"
        content.innerHTML=view;

    } catch(error) {

      //reto: añadir página de error
      console.log(error);
    }
})();


