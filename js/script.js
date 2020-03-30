const postsPerRequest = 100;
const maxPostsToFetch = 500;
const maxRequests = maxPostsToFetch/postsPerRequest ;

const responses = [] ;

//takes the input from user
const handleSubmit = (e) => {
    e.preventDefault();
    const subreddit = document.getElementById("subreddit").value;
    fetchPosts(subreddit);
}

// fetch all the data and convert them to json 
const fetchPosts = async (subreddit,afterParam) => {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json?limit=${postsPerRequest}${afterParam ? '&after='+ afterParam : ''}`);
    const responseJson = await response.json();
    responses.push(responseJson);

    //if there is next page regarding the maxdatafetch , fetch again
    if(responseJson.data.after && response.length < maxRequests){
        fetchPosts(subreddit,responseJson.data.after);
        return;
    }
    parseResult(responses);
}


//convertir the json data to a list data
const parseResult = (responses) => {
    const allPosts = [];

    responses.forEach(response => {
        allPosts.push(...response.data.children);
    });

    statsByUser = [];

    allPosts.forEach(({data:{author ,score}})=>{
        statsByUser[author] = !statsByUser[author] ? {postCount : 1 , score} 
        :{
            postCount: statsByUser[author].postCount +1 ,
            score : statsByUser[score] + score,
         }
    });

    const userList = Object.keys(statsByUser).map(username=>({
        username,
        score : statsByUser[username].score,
        postCount : statsByUser[username].postCount,
    }));

    const sortedList = userList.sort((userA,userB)=> userB.score-userA.score);
    displayRankings(sortedList);
}

//displaying the data and adding link to the zebsite 
const displayRankings = (sortedList) => {
    const container = document.getElementById('results-container');
    sortedList.forEach(({ username, score, postCount }, i) => {
    rank = i +1;
    const userCard = document.createElement('a');
    userCard.href = `https://www.reddit.com/user/${username}`;
    userCard.classList.add('user-card');
    userCard.innerText = `${rank}. ${username} - ${postCount} post(s) - ${score} point(s)`;

    container.appendChild(userCard);
    });
};

const subredditSelectForm = document.getElementById("subreddit-select-form");
subredditSelectForm.addEventListener('submit',handleSubmit);