function loadRepos() {
  element = document.getElementById("gitRepos");
  element.classList.toggle("undisplay-element");

  const loadingStatus = document.querySelector("#gitRepos");
  const loadingIcon = document.querySelector(".lds-ellipsis");

  const gitRepoUrl = "https://api.github.com/users/eddygrove/repos";

  async function getRepoData() {
    let response = await fetch(gitRepoUrl);
    const repoList = document.getElementById("gitRepos");

    if (response.ok) {
      let repoData = await response.json();
      loadingStatus.innerText = " ";
      // loadingIcon.classList.toggle("undisplay-element");
      console.log("loggar repoData: ", repoData);
      for (const item of repoData) {
        console.log("loggar item: ", item);
        if (Object.values(item).includes("split_the_bill")) {
          console.log("item found!");
          createRepoList(repoList, item.name, item.url, item.description);
        }
      }
    } else {
      console.log("HTTP-Error: " + response.status);
    }
  }

  function createRepoList(repoList, name, url, description) {
    const li = document.createElement("li");
    li.innerText = name + "\n " + url + "\n " + description;
    li.classList.add("gitHub-repo__li");
    repoList.appendChild(li);
  }

  getRepoData();
}

let btn = document.getElementById("btn");
btn.addEventListener("click", (event) => {
  let clickedButton = document.querySelector(".portfolio-list__button");
  clickedButton.classList.toggle("portfolio-list__button_clicked");
  loadRepos();
});
