// load data from api
const loadInfo = () => {
    const searchText = document.getElementById('search-field');
    const searchValue = searchText.value;

    // clear input field 
    searchText.value = '';

    const url = ` https://openlibrary.org/search.json?q=${searchValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayInfo(data))
    

}
// display data 
const displayInfo = books => {

    // show search result
    const totalResult = document.getElementById('total-result');
    totalResult.textContent = '';
        const resultDiv = document.createElement('div');
        resultDiv.innerHTML = `
        <p>About ${books.numFound} Result found</p>
        `;
    totalResult.appendChild(resultDiv);

    const info = books.docs;
    // error handing
    const errorOne = document.getElementById('error-1');
    if (info.numFound || info.num_found === 0) {
        errorOne.classList.add('d-block');
    } else {
        errorOne.classList.add('d-none');
    }
    // card creat and append
    const bookContainer = document.getElementById('book-container');
    bookContainer.textContent = '';

    info?.forEach(book => {
        
        const div = document.createElement('div');
        div.innerHTML = `

        
        <div class="col">
            <div class="card ">
                <img style="height: 400px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h4 class="card-title">Name: <span class="text-primary">${book.title_suggest}</span></h4>
                    <h5 >Author Name: <span class="text-success"> ${book.author_name}</span></h5>
                    <h6>First Publish: ${book.first_publish_year ? book.first_publish_year : 'not available'}</h6>  
                </div>
            </div>
        </div>


    `;
        bookContainer.appendChild(div);
   })
}