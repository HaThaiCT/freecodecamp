const  authorContainer = document.getElementById("author-container");
const loadMoreBtn = document.getElementById("load-more-btn");
fetch("https://cdn.freecodecamp.org/curriculum/news-author-page/authors.json")
    .then((res) => res.json())
    .then((data) => {
        authorDataArr = data;
        displayAuthors(authorDataArr.slice(startingIndex,endingIndex));
    })
    .catch((err) => console.error(`There was an error: ${err}`))
    
    let startingIndex = 0;
    let endingIndex = 8;
    let authorDataArr = [];

    const displayAuthors = (authors) => {
        authors.forEach((author, index) => {
            authorContainer.innerHTML += 
                `<div id="${index}" class="user-card">
                    <h2 class="author-name">${author.author}</h2>
                    <img class="user-img" src="${author.image}" alt="${author.author} avatar">
                    <div class="purple-divider"> </div>
                    <p class="bio">${author.bio.length > 50 ? author.bio.slice(0,49) + "..." : author.bio}</p>
                    <a class="author-link" href="${author.url}" target="_blank">${author.author}'s author page</a>
                </div>`
        });
    }

    const fetchMoreAuthors = () => {
        startingIndex += 8;
        endingIndex += 8;
        if(authorDataArr.length <= endingIndex) {
            loadMoreBtn.disabled = true;
            loadMoreBtn.textContent = "No more data to load";
        }
        displayAuthors(authorDataArr.slice(startingIndex,endingIndex));
    }

    loadMoreBtn.addEventListener("click",fetchMoreAuthors);