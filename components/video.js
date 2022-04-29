const playVideo=()=>
{
    let videoId=JSON.parse(localStorage.getItem('videomemory'))[0];
    let videoCard=document.createElement('div');
    let iframe=document.createElement('iframe');
    iframe.src=`https://www.youtube.com/embed/${videoId}`;
    iframe.allowFullscreen='allowFullscreen';
    videoCard.append(iframe);
    document.getElementById("playerDiv").append(videoCard);
    localStorage.removeItem('videomemory');
}
playVideo();
