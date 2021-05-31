const dirName = "<your_ojs_directory_name>";
const journalName = "<your_journal_name>";

const DCIdentifier = document.querySelector('meta[name="DC.Identifier"]');
const imgs = document.querySelectorAll('#jatsParserFullText img');

const submissionId = Number(DCIdentifier.getAttribute('content'));
const fileId = syncFetch(`/betterOJS/file_id_finder.php?submissionId=${submissionId}&expected=xml`);
const stageId = 5;

imgs.forEach(img=>{
    const src = img.getAttribute('src');
    const imageId = syncFetch(`/betterOJS/file_id_finder.php?submissionId=${submissionId}&expected=img&imageName=${src}`);
    let newUrl = `/${dirName}/index.php/${journalName}/article/downloadFullTextAssoc/${submissionId}/${fileId}/${imageId}`;
    img.src = newUrl;
});

function syncFetch(url){
    const async = false;

    let xhr = new XMLHttpRequest();

    xhr.open('GET',url,async);
    xhr.send();

    let response = xhr.responseText;
    if(response == "" || response == undefined || response == null){
        let resStatus;
        if(response == ""){
            resStatus = "an empty string";
        } else {
            resStatus = response;
        }
        console.warn(`There is an error in your syncFetch request.\nThe response is ${resStatus}. Please check your URL, which is ${url}.`);
    }
    return response;
}
