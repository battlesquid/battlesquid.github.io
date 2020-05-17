const repositories = document.querySelector('#repositories');

const query = {
    query: "query {user(login:\"Battlesquid\") {bio,repositories(isFork:false, first:100) {nodes {repositoryTopics(first:5) {nodes {topic {name}}}name,description, primaryLanguage {name,color}, languages(first:100) {nodes {name}}}}}}"
};

const filterRepoData = repos => {
    const nodes = repos.data.user.repositories.nodes;
    let r = [];
    //filter out repos without topics
    r = nodes.filter(node => node.repositoryTopics.nodes.length > 0);

    //filter out repos not marked as complete
    r = r.filter(repo => repo.repositoryTopics.nodes.find(n => n.topic.name === 'sq-c0mplete') !== undefined);
    return { r, repos };
};

async function fetchGithubRepos() {
    const res = await fetch("https://api.github.com/graphql", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${atob('OGRkZDE5MTAwNjJhMGQwNjI3MDkyZmFmNDBjZTU4ZjMzZTcxY2Y5OA==')}`,
            "User-Agent": "Battlesquid"
        },
        body: JSON.stringify(query)
    })
    const json = await res.json();
    document.querySelector('#mini-bio').textContent = json.data.user.bio;
    return filterRepoData(json)
};

fetchGithubRepos()
    .then(res => {
        res.r.forEach(repo => {
            let s = '';

            repo.languages.nodes.forEach(node => s += `<div class='lang ${node.name.toLowerCase()}'></div>`);
            const wrapper = document.createElement('div');
            wrapper.className = 'repo';

            wrapper.innerHTML = `<div class='title'>${repo.name}</div><div class='desc'>${repo.description}</div><div class='bottom-nav'><div class='expand'>View Project</div><div class='langs'>${s}</div></div>`;

            wrapper.querySelector('.expand').addEventListener('click', e => {
                console.log(e.target.className);
            });
            repositories.appendChild(wrapper);
        });
    });