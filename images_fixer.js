/* 
	Paramètres à modifier :
	dirName (laisser vide en cas d'accès via le nom de domaine, ou mettre "ojs2" en cas d'accès via l'IP)
	journalName
*/
const dirName = "<your_ojs_directory_name>";
const journalName = "<your_journal_name>";

const DCIdentifier = document.querySelector('meta[name="DC.Identifier"]');
const imgs = document.querySelectorAll('#jatsParserFullText img');

const submissionId = Number(DCIdentifier.getAttribute('content'));
const stageId = 5;

let fileId;
if(dirName == "" || dirName == null || dirName == undefined){
    fileId = syncFetch(`/public/journals/4/betterOJS/file_id_finder.php?submissionId=${submissionId}&expected=xml`);
} else {
    fileId = syncFetch(`/${dirName}/public/journals/4/betterOJS/file_id_finder.php?submissionId=${submissionId}&expected=xml`);
}

imgs.forEach(img=>{

    const src = img.getAttribute('src');
    let imageId;
    let newUrl;

    if(dirName == "" || dirName == null || dirName == undefined){

        imageId = syncFetch(`/public/journals/4/betterOJS/file_id_finder.php?submissionId=${submissionId}&expected=img&imageName=${src}`);
        newUrl = `/index.php/${journalName}/article/downloadFullTextAssoc/${submissionId}/${fileId}/${imageId}`;

    } else {

        imageId = syncFetch(`/${dirName}/public/journals/4/betterOJS/file_id_finder.php?submissionId=${submissionId}&expected=img&imageName=${src}`);
        newUrl = `/${dirName}/index.php/${journalName}/article/downloadFullTextAssoc/${submissionId}/${fileId}/${imageId}`;

    }

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

