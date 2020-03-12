

let newList = []
let additionalList = []
let page = 1;

let selectedNewsource =[]
let sourceNames = {}

//////////////////////////////////////////////////////////
//      CALL API          ////////////////////////////////
//////////////////////////////////////////////////////////
let callAPI= async()=>{
    let apiKey ='cdf3e919cd7146bf9fb9962bf5171580'
    let url=`https://newsapi.org/v2/everything?q=music&page=${page}&apiKey=${apiKey}`

    let data = await fetch(url);
    let result = await data.json();

    newList = newList.concat(result.articles);
    console.log("data:",data);
    console.log("json result:", result);
    console.log("article list:",newList);
    render(newList)
    searchbySources()

}

let categoriesAPI=async(category)=>{
    let apiKey ='cdf3e919cd7146bf9fb9962bf5171580'
    let url=`https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`
    let data = await fetch(url);
    let result = await data.json();
    
    let newList = result.articles;
    console.log("data:",data);
    console.log("json result:", result);
    console.log("article category list:",newList);
    render(newList)
    
}


//NHAN'S OLD "LOAD MORE" BUTTON//
// let loadMore=async()=>{
//     let apiKey ='cdf3e919cd7146bf9fb9962bf5171580'
//     let url=`https://newsapi.org/v2/everything?q=game&apiKey=${apiKey}`
//     let data = await fetch(url);
//     let result = await data.json();
//     let newData = result.articles
//     pageNum++
//     console.log('New list exist', newList)
//     newList = newList.concat(newData)
//     render(newList)
// }




// let searchbySources =()=>{
//  let sourceNames = newList.map((item)=>item.source.name)
//  console.log("source name here:", sourceNames)
//  sourceNames.reduce((total, name)=>{
//     console.log("total IS HERE:",total)
//     if(name in total){total['name']++} else {total['name']=1}
//     return total;
//  },{})
// }


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


//NEW "LOAD MORE" BUTTON//
let loadMore = () => {
    page++; //2
    callAPI();
  };


callAPI()
categoriesAPI()

