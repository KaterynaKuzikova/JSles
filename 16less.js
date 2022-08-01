
const inpE = document.getElementById("inp");
const containerE = document.getElementById("container");
const errorE = document.getElementById("err");
const avatarE = document.getElementById("avatar");
const repositorsE = document.getElementById("repositors");
const followersE = document.getElementById("followers");
const followingE = document.getElementById("following");
const btnE = document.getElementById("btn");
let user = null;

const git = new GitHub();

btnE.addEventListener("click", onGetInfo);
const ERROR_MSG = {
    404: "Not found",
    500: "Server is not avaliable",
}

function onGetInfo(e){
    git.getUser(inpE.value).then((u) =>{
        user = u;
        renderInfo(user);
    }).catch((e) =>{
    onDelete();
    error(e);
    });
    clearInfo();
}

function renderInfo(data){
    avatarE.innerHTML = 'avatar: ' + data.avatar_url;
    repositorsE.innerHTML = 'repositors: ' + data.public_repos;
    followersE.innerHTML = 'followers: ' + data.followers;
    followingE.innerHTML = 'following: ' + data.following;
}

function clearInfo(){
    inpE.value = "";
}

function onDelete(id){
    containerE.parentNode.removeChild(containerE);
}


function error(errorCode){
    errorE.innerHTML = ERROR_MSG[errorCode];
}

