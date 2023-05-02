const username: HTMLInputElement = document.querySelector("input[name='name']")
const container: HTMLElement = document.getElementById("card-container")

interface GithubResponse {
    login: string,
    avatar_url: string,
    repos_url: string,
    name: string,
    bio: string,
    public_repos: number,
    message?: "Not Found"
}

interface GithubRepoResponse{
    name: string,
    html_url: string,
    description: string,
    fork: boolean
}

function clearContainer(){
    container.innerHTML = ""
}

async function fetchUser(name: HTMLInputElement){
    const response = await fetch(`https://api.github.com/users/${name.value}`)
    const user: GithubResponse = await response.json()

    if(user.message){
        container.innerHTML += `
                <div class="not-found">
                    <p>Usuário não encontrado!</p>
                </div>
            `
    } else {
        const userRepos = await fetch(user.repos_url)
        const repos: GithubRepoResponse[] = await userRepos.json()

        container.innerHTML = `
        <div class="info-container">
            <img src="${user.avatar_url}">
            <ul class="user-info">
                <li>
                    <h2>${user.name}</h2>
                </li>
                <li>
                    <span>Login: </span>${user.login}
                </li>
                <li>
                    <span>Bio: </span>${user.bio ?? "-"}
                </li>
                <li>
                    <span>Repositórios Públicos: </span>${user.public_repos}
                </li>
            </ul>
        </div>
        `
        repos.forEach((repo) => {
            container.innerHTML += `
                <ul class="repos-info">
                    <li>
                        <span>Nome do repositório: </span>${repo.name}
                    </li>
                    <li>
                        <span>Descrição: </span>${repo.description ?? "-"}
                    </li>
                    <li>
                        <span>O repositório é um fork?</span> ${repo.fork ? 'Sim' : 'Não'}
                    </li>
                    <li class="link-li">
                        <span>Acessar repositório: </span><a href="${repo.html_url}" target="_blank"><img src="assets/arrow-up-right.svg" class="link-icon"></a>
                    </li>
                </ul>
            `
        })
    }
}

document.getElementById("btn").addEventListener('click', () => {
    clearContainer()
    fetchUser(username)
})

username.addEventListener('keypress', (ev) => {
    if(ev.key === "Enter"){
        clearContainer()
        fetchUser(username)
    }
})