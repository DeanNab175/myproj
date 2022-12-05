const repoTemplate = document.querySelector("[data-repo-template]")
const projectsContainer = document.getElementById("projects")
const reposDNID = [137197255, 365684298, 122710511, 436943506, 131506179, 157362200, 151953424, 489686429, 488164043, 534218367, 574493038]
const reposDID = [79026381]


/**
 * 
 * @param {*} endpoint -> github repos api 
 * @param {*} filteredID -> ID of repo to filter
 * @param {*} user -> the user name for the repo
 * 
 * Get all repos for the specific user filtered by repo ID
 */
function renderRepos(endpoint, filteredID, user) {
    fetch(endpoint)
    .then((response) => response.json())
    .then((repos) => {
        console.log(repos);
        const filteredRepos = repos.filter(item => {
            return filteredID.find((id) => item.id === id)
        })
        
        filteredRepos.map((data) => {
            const repoCard = repoTemplate.content.cloneNode(true).children[0]
            const title = repoCard.querySelector("[data-title]")
            const desc = repoCard.querySelector("[data-desc]")
            const link = repoCard.querySelector("[data-link]")
            const image = repoCard.querySelector("[data-img]")
            // const id = repoCard.querySelector("[data-id]")
            
            if(data.homepage !== null) {
                title.textContent = data.name
                desc.textContent = data.description
                // id.textContent = data.id
                link.setAttribute('href', data.homepage)
                if(data.id === 534218367) {
                    image.setAttribute('src', `images/screenshot.jpg`)
                } else {
                    image.setAttribute('src', `https://raw.githubusercontent.com/${user}/${data.name}/master/screenshot.jpg`)
                }
                
                projectsContainer.appendChild(repoCard)
            }
        })

    })
    .catch( error => console.log(error.message) )
}

renderRepos('https://api.github.com/users/DeanNab175/repos', reposDNID, 'DeanNab175')
renderRepos('https://api.github.com/users/Dean175/repos', reposDID, 'Dean175')