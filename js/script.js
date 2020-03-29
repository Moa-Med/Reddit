const postsPerRequest = 100;
const maxPostsToFetch = 500;
const maxRequests = maxPostsToFetch/postsPerRequest ;

const responses = [] ;

const handleSubmit = (e) => {
    e.preventDefault();
    const subreddit = document.getElementById("subreddit").value;
    fetchPosts(subreddit);
}

const fetchPosts = async (subreddit,afterParam) => {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json?limit=${postsPerRequest}${afterParam ? '&after='+ afterParam : ''}`);

    const responseJson = await response.json();
    responses.push(responseJson);

    if(responseJson.data.after && response.length < maxRequests){
        fetchPosts(subreddit,responseJson.data.after);
        return;
    }
    parseResult(responses);
}

const parseResult = (responses) => {
    const allPosts = [];

    responses.forEach(response => {
        allPosts.push(...responses.data.children);
    });

    statsByUser = [];

    allPosts.forEach(({data:{author ,score}})=>{
        


    });



    displayRankings();
}

const displayRankings = () => {
    console.log("Bonjour Mohamed du courage")
}

const subredditSelectForm = document.getElementById("subreddit-select-form");
subredditSelectForm.addEventListener('submit',handleSubmit);