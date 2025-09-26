function getData(category = "business", search = ""){
    fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=186af0d3cda74691a6eb012cab60348d`)
    .then(response => response.json())
    .then(data => {
        let news = data.articles,
            row = document.querySelector("section .row");
            row.innerHTML = ``;
        news.forEach((element) => {
            if(search == ""){
                row.innerHTML += `
                    <div class="col-md-6 col-lg-4">
                        <div class="item mb-5 p-4 rounded-5" style="background-image: url(${element.urlToImage || "..//Images//not-found.jpg"});">
                            <a href="${element.url}" class="text-decoration-none text-black">
                                <div class="box bg-light position-absolute bottom-0 start-0 rounded p-2 m-3">
                                    <h5 class="text-primary">${element.source.name || "unknown"}</h5>
                                    <p class="fs-5 fw-medium mb-2">${element.content?.substr(0,50) || "no content"}...</p>
                                    <p class="mb-1 text-black-50">${element.description?.substr(0,50) || "no description"}...</p>
                                    <div class="info d-flex align-items-center">
                                        <i class="fa-solid fa-user me-3"></i>
                                        <p class="mb-0 me-4">${element.author?.substr(0,10) || "unknown"}</p>
                                        <p class="mb-0 text-black-50">${element.publishedAt?.substr(0,10) || "unknown"}</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                `;
            }
            else if(element.source.name?.toLowerCase().includes(search.toLowerCase()) || element.content?.toLowerCase().includes(search.toLowerCase()) || element.description?.toLowerCase().includes(search.toLowerCase()) || element.author?.toLowerCase().includes(search.toLowerCase())){
                row.innerHTML += `
                    <div class="col-md-6 col-lg-4">
                        <div class="item mb-5 p-4 rounded-5" style="background-image: url(${element.urlToImage});">
                            <a href="${element.url}" class="text-decoration-none text-black">
                                <div class="box bg-light position-absolute bottom-0 start-0 rounded p-2 m-3">
                                    <h5 class="text-primary">${element.source.name || "unknown"}</h5>
                                    <p class="fs-5 fw-medium mb-2">${element.content?.substr(0,50) || "no content"}...</p>
                                    <p class="mb-1 text-black-50">${element.description?.substr(0,50) || "no description"}...</p>
                                    <div class="info d-flex align-items-center">
                                        <i class="fa-solid fa-user me-3"></i>
                                        <p class="mb-0 me-4">${element.author?.substr(0,10) || "unknown"}</p>
                                        <p class="mb-0 text-black-50">${element.publishedAt?.substr(0,10) || "unknown"}</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                `;
            }
        });
    })
    .catch(error => {
        let row = document.querySelector("section .row");
            row.innerHTML = `
                <div class=" col alert alert-danger text-center fw-bolder fs-1 mx-3" style="box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;">404 NotFound</div>
            `;
    })
}
getData();

document.querySelector("header select").addEventListener("change", function (){
    getData(this.value, document.querySelector("header input").value);
});

document.querySelector("header input").addEventListener("keyup", function (){
    let select = document.querySelector("header select");
    getData(select.value == "Category" ? "business" : select.value, this.value);
});