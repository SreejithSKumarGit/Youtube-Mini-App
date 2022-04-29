firstPage();
document.getElementById("searchBtn").addEventListener('click',getData);
async function getData()
{   
    try {
    let searchValue=document.getElementById("searchValue").value;
    let url=`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${searchValue}&type=videos&key=AIzaSyBD9Egj3GBF6tX62IHQCfqQxX5p-5qlBE0`;
    let res= await fetch(url);
    let data=await res.json();
    displayData(data.items);
    
} 
catch (error) {
    
    console.log("Error :" + error);
}
      
}
async function firstPage()
{
    try {
        let url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=20&key=AIzaSyBD9Egj3GBF6tX62IHQCfqQxX5p-5qlBE0`;
        let res= await fetch(url);
        let data=await res.json();
        displayFirstData(data.items);   
    } catch (error) {
        console.log("Error :" + error);
    }
}
const displayFirstData=(data)=>{
    document.getElementById("resultDiv").innerHTML="";
    data.forEach((video) => {
        const {
          id,
          snippet:  {
              title,
              thumbnails:{
                  medium:{url},
              },
          },
        }=video;
        let videoCard=document.createElement('div');
        let thumbnail=document.createElement('img');
        thumbnail.src=url;
        let titles=document.createElement('h3');
        titles.textContent=title;
        videoCard.append(thumbnail,titles);
        document.getElementById("resultDiv").append(videoCard);
        videoCard.addEventListener('click',function()
        {
            setVideoId(id);
        });  
    });
}
const displayData=(data)=>{
    document.getElementById("resultDiv").innerHTML="";
    data.forEach((video) => {
        const {
          id:{ videoId },
          snippet:  {
              title,
              thumbnails:{
                  medium:{url},
              },
          },
        }=video;
        
        let videoCard=document.createElement('div');
        let thumbnail=document.createElement('img');
        thumbnail.src=url;
        let titles=document.createElement('h3');
        titles.textContent=title;
        videoCard.append(thumbnail,titles);
        document.getElementById("resultDiv").append(videoCard);
        videoCard.addEventListener('click',function()
        {
            setVideoId(videoId);
        });  
    });
}
function setVideoId(videoId)
{
    let videomemory;
    if(localStorage.getItem('videomemory')==null)
    {
        videomemory=[];
        localStorage.setItem('videomemory',JSON.stringify(videomemory));

    }
    videomemory=JSON.parse(localStorage.getItem('videomemory'));
    videomemory.push(videoId);
    localStorage.setItem('videomemory',JSON.stringify(videomemory));

    window.location.href='video.html';  
}
