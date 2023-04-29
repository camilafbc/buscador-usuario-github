const username = document.querySelector("input[name='name']");
const container = document.getElementById("card-container");
async function fetchUser(name) {
    const response = await fetch(`https://api.github.com/users/${name.value}`);
    const user = await response.json();
    if (user.message) {
        console.log("Usuário não encontrado!");
    }
    else {
        const userRepos = await fetch(user.repos_url);
        const repos = await userRepos.json();
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
                    <span>Bio: </span>${user.bio ?? ""}
                </li>
                <li>
                    <span>Repositórios Públicos: </span>${user.public_repos}
                </li>
            </ul>
        </div>
        `;
        repos.forEach((repo) => {
            container.innerHTML += `
                <ul class="repos-info">
                    <li>
                        <span>Nome do repositório: </span>${repo.name}
                    </li>
                    <li>
                        <span>Descrição: </span>${repo.description ?? "O repositório não possui descrição."}
                    </li>
                    <li>
                        <span>O repositório é um fork?</span> ${repo.fork ? 'Sim' : 'Não'}
                    </li>
                    <li>
                        <span></span><a href="${repo.html_url}">Link</a>
                    </li>
                </ul>
            `;
        });
    }
}
document.getElementById("btn").addEventListener('click', () => {
    fetchUser(username);
});
