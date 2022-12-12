(function isNotLoggedIN() {
    let accessToken = JSON.parse(localStorage.getItem("access-token"));

    if (!accessToken) {
        alert("You are not logged in, so please login");
        window.location.href = "/index.html";
    }
})();

const getUser = JSON.parse(localStorage.getItem("user"));

const username = document.querySelector("#username");
username.innerHTML = `Hi ${getUser.name}`;

// find an value and attribute
function createElement(config) {
    let elm = document.createElement(config["name"]);
    let attrs = config["attr"];
    if (attrs) {
        for (let attr in attrs) {
            elm.setAttribute(attr, attrs[attr]);
        }
    }
    if (config["content"]) {
        elm.innerHTML = config["content"];
    }
    return elm;
}

const showListOfPosts = async () => {
    const response = await fetch("/api/v1/posts");
    const finalOutput = await response.json();

    const getPostView = document.querySelector("#postsview");

    // for (let i = 0; i < finalOutput.data.length; i++) {
    //   const div = document.createElement("div");
    //   div.classList.add("card");

    //   const imgLink = document.createElement("a");
    //   // imgLink.setAttribute("href", `/api/v1/posts/${finalOutput.data[i]._id}`);
    //   imgLink.setAttribute("href", `/${finalOutput.data[i]._id}`);
    //   const image = document.createElement("img");
    //   image.setAttribute("src", finalOutput.data[i].photo);

    //   imgLink.appendChild(image);
    //   div.appendChild(imgLink);

    //   const h3 = document.createElement("h3");
    //   h3.textContent = finalOutput.data[i].title;

    //   div.appendChild(h3);

    //   const h4 = document.createElement("h4");
    //   h4.textContent = finalOutput.data[i].categories;

    //   div.appendChild(h4);

    //   // const p = document.createElement("p");
    //   // p.textContent = finalOutput.data[i].desc;

    //   // div.appendChild(p);

    //   console.log(div);

    //   getPostView.appendChild(div);
    // }



    let containerElm = document.getElementById("container");
    for (let i = 0; i < finalOutput.data.length; i++) {
        var rowElm = createElement({ name: "div", attr: { class: "row" } });
        containerElm.appendChild(rowElm);

        var colElm = createElement({ name: "div", attr: { class: "col-md-4" } });
        rowElm.appendChild(colElm);

        var cardElm = createElement({ name: "div", attr: { class: "card" } });
        colElm.appendChild(cardElm);

        let imgElm = createElement({
            name: "img", attr: {
                src: finalOutput.data[i].photo, class: "card-img-top",
                alt: "...", width: "300px", height: "200px"
            }
        });
        let cardContent = createElement({ name: "div", attr: { class: "card-body" } });
        cardElm.appendChild(imgElm);
        cardElm.appendChild(cardContent);

        // card-body innerElm 
        let cardTitle = createElement({ name: "h5", attr: {class:"card-title", content: finalOutput.data[i].title}});
        let cardCategory = createElement({ name: "span"});
        let cardNextLine = createElement({ name: "br"});
        let cardDate = createElement({name: "label", attr: {class:"card-date", content:"date"}});
        cardContent.appendChild(cardTitle);
        cardContent.appendChild(cardCategory);
        cardContent.appendChild(cardNextLine);
        cardContent.appendChild(cardDate);

        // card-date innerElm 
        let dateIcon = createElement({name: "img", attr: {src: "./image/icon-calendar.png", alt:""}})
        cardDate.appendChild(dateIcon);

        // console.log(div);

        // getPostView.appendChild(div);
    }
};

showListOfPosts();

const logout = () => {
    // Ideally we should another API for loging the user out, so that we can destroy the access-token

    alert("Succesfully logged out!");
    localStorage.removeItem("access-token");
    localStorage.removeItem("user");

    window.location.href = "/index.html";
};
