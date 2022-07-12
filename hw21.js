async function getPost(url) {
    let response = await fetch(url);
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Error' + response.status);
    }
}

class FullPost {
    constructor (object1, element) {
        this.title = object1.title;
        this.description = object1.body;
        this.element = element;
    }

    renderPostBody() {
        let newPost = '';
        newPost = `<h1>${this.title}</h1>
                   <p>${this.description}</p>`
        this.element.innerHTML = newPost;
    }

    renderComments(data) {
        let array = data;
        for (let el of array) {
            let p = document.createElement('p');
            let text = document.createTextNode(`Comment: ${el.name}`);
            p.appendChild(text)
            this.element.appendChild(p);
        }
    }

    addButton() {
        let btn = document.createElement('button');
        btn.innerHTML = 'Add Comment';
        this.element.appendChild(btn);
    }

}

let post = document.querySelector('#full_post');
let post1 = '';
getPost('https://jsonplaceholder.typicode.com/posts/1')
    .then( data => {
        post1 = new FullPost (data, post)
        post1.renderPostBody()
    })
    .then (getPost('https://jsonplaceholder.typicode.com/posts/1/comments')
    .then(data => {
        post1.renderComments(data);
        post1.addButton()
        }))