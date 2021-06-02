const articlesSummary=document.querySelectorAll(".article-summary.media");articlesSummary.forEach(e=>{e.onclick=(()=>{const r=e.querySelector(".media-heading>a").href;window.location.href=r})});
