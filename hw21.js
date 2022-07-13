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
        newPost = `<h1 id="post_title">${this.title}</h1>
                   <p id="post_body">${this.description}</p>`
        this.element.innerHTML = newPost;
    }

    renderComments(data) {
        let array = data;
        let div = document.createElement('div');
        div.setAttribute('id', 'comments')

        for (let el of array) {
            let p = document.createElement('p');
            let text = document.createTextNode(`Comment: ${el.name}`);
            p.appendChild(text)
            div.appendChild(p);
        }
        this.element.appendChild(div);
    }

    addComments() {
        let newComment = document.createElement("p")
        newComment.setAttribute('id', 'new_comment');
        let input = document.createElement('input');
        input.setAttribute('type','text');
        input.setAttribute('value', 'text your comment here')
        newComment.appendChild(input);

        let btn = document.createElement('button');
        btn.innerHTML = 'Add Comment';

        this.element.appendChild(newComment);
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
        post1.addComments()
        }))


//Second part of homework

console.log(1);

setTimeout(function () {
    console.log(2);
}, 100);

setTimeout(function () {
    console.log(3);
}, 0);

new Promise(function (resolve) {
    setTimeout( () => resolve(), 0 )

}).then(() => {
    console.log(4);
});

console.log(5);

