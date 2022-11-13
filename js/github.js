function loadRepos() {
  element = document.getElementById("gitRepos");
  element.classList.toggle("hide");

  const loadingStatus = document.querySelector("#gitRepos");

  const gitRepoUrl = "https://api.github.com/users/eddygrove/repos";

  async function getRepoData() {
    let response = await fetch(gitRepoUrl);
    const repoList = document.getElementById("gitRepos");

    if (response.ok) {
      let repoData = await response.json();
      loadingStatus.innerText = " ";
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

loadRepos();
