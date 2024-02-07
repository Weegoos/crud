fetch('/read/get-data')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const blogList = document.getElementById('blogList');

        data.forEach(blog => {
            const listItem = document.createElement('li');
            const deleteButton = document.createElement('button')
            const updateButton = document.createElement('button')
            const headline = document.createElement('p')
            const content = document.createElement('p')
            const readMinute = document.createElement('span')
            const timestamp = document.createElement('span')
            const authorOutput = document.createElement('span')

            // style
            deleteButton.classList.add('deleteButton')
            updateButton.classList.add('updateButton')
            headline.classList.add('headline')
            content.classList.add('content')
            authorOutput.classList.add('authorName')
            // text content
            deleteButton.textContent = "Delete"
            updateButton.textContent = "Update"
            headline.textContent = blog.headline;
            content.textContent = blog.content
            timestamp.textContent = blog.timestamp
            readMinute.textContent = `Read: ${Math.round((blog.length / 150))} min`
            authorOutput.textContent = blog.author

            listItem.addEventListener('click', () => {
                // console.log('Clicked on blog with id:', blog.id);
                document.querySelector('.contentSpan').innerHTML = blog.content
            });

            deleteButton.addEventListener('click', ()=> {
                alert('Deleted')
                location.reload()
                deleteBlog(blog.id)
            })

            updateButton.addEventListener('click', ()=> {
                updateBlog(blog.id, blog.content)
                document.querySelector('.updateData').setAttribute('style', 'display: block')
            })

            listItem.append(readMinute)
            listItem.append(timestamp)
            listItem.append(headline)
            listItem.append(deleteButton)
            listItem.append(updateButton)
            listItem.append(authorOutput)
            blogList.appendChild(listItem);

        });
    })
    .catch(error => console.error('Ошибка при получении данных:', error));


async function deleteBlog(blogId) {
        try {
            const response = await fetch(`/read/delete-blog/${blogId}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log(data.message);
            
        } catch (error) {
            console.error('Ошибка при удалении блога:', error);
        }
    }

async function updateBlog(blogId, updatedData) {
    document.querySelector('.updateDataId').value = blogId
    document.querySelector('.updateDataContent').value = updatedData

}

