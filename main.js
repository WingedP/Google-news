

let newList = []
let additionalList = []
let pageNum = 1

let selectedNewsource =[]
let sourceNames = {}

//////////////////////////////////////////////////////////
//      CALL API          ////////////////////////////////
//////////////////////////////////////////////////////////
let callAPI= async()=>{
    let apiKey ='cdf3e919cd7146bf9fb9962bf5171580'
    let url=`http://newsapi.org/v2/everything?q=music&apiKey=${apiKey}`

    let data = await fetch(url);
    let result = await data.json();

    newList = result.articles;
    console.log("data:",data);
    console.log("json result:", result);
    console.log("article list:",newList);
    pageNum++
    render(newList)

}

let categoriesAPI=async(category)=>{
    let apiKey ='cdf3e919cd7146bf9fb9962bf5171580'
    let url=`http://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`
    let data = await fetch(url);
    let result = await data.json();
    
    let newList = result.articles;
    console.log("data:",data);
    console.log("json result:", result);
    console.log("article category list:",newList);
    render(newList)
    
}

let loadMore=async()=>{
    let apiKey ='cdf3e919cd7146bf9fb9962bf5171580'
    let url=`http://newsapi.org/v2/everything?q=game&apiKey=${apiKey}`
    let data = await fetch(url);
    let result = await data.json();
    let newData = result.articles
    pageNum++
    console.log('New list exist', newList)
    newList = newList.concat(newData)
    render(newList)
}





//////////////////////////////////////////////////////////
//              RENDER              //////////////////////
//////////////////////////////////////////////////////////
let render=(array)=>{

    let filteredItem = array.slice();
    document.getElementById("newsArea").innerHTML = "";
    if (selectedNewsource.length>0) {filteredItem=array.filter(array =>selectedNewsource.includes(array.source.name) && array)}
    console.log("this is filteredArticles 1", filteredItem)

    let htmlForNews = array.map((item)=>{

        return `
        <div id="news" style="display: flex; border: 1px solid gray; padding-left: 5px; padding-top: 10px; padding-bottom: 10px; margin-bottom: 20px">
        <img style=" width: 300px;"
            src="${item.urlToImage}"
            alt="">
        <div style="padding-left:8px">   
            <h4>${item.title}</h4>
            <h6>by ${item.author}   <span style="font-size:14px">from</span>   <span style="font-size:20px">${item.source.name}</span>  </h6>
            <p style="font-size:15px">${item.description}
            <a href="${item.url}">READ MORE?</a>
            </p>
            <div>${item.publishedAt}</div>
            
        </div>
    </div>
    ` 
    }).join('')
    document.getElementById('newsArea').innerHTML= htmlForNews;
    renderArticleCount(newList);
}


let renderArticleCount = (item) => {
        document.getElementById("numberOfArticles").innerHTML = `${item.length} of ${item.length}`;
    }



callAPI()
categoriesAPI()

