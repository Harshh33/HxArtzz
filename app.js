const container = document.querySelector('.container');
const mediaFolder = 'Blender/'; 

function generateMasonryGrid(columns, posts) {
  container.innerHTML = '';

  //Store column arrays that contain relevant posts
  let columnWrappers = {};

  //Create column item array and  add this to column wrapper object
  for (let i = 0; i < columns; i++) {
    columnWrappers[`column${i}`] = [];
  }
  for (let i = 0; i < posts.length; i++) {
    const column = i % columns;
    columnWrappers[`column${column}`].push(posts[i]);
  }
  for (let i = 0; i < columns; i++) {
    let columnPosts = columnWrappers[`column${i}`];
    let column = document.createElement('div');
    column.classList.add('column');
    columnPosts.forEach((post) => {
      let postDiv = document.createElement('div');
      postDiv.classList.add('post');
      let media;
      if (post.type === 'image') {
        media = document.createElement('img');
        media.src = mediaFolder + post.fileName; // Use the media folder path and file name
      } else if (post.type === 'video') {
        media = document.createElement('video');
        media.src = mediaFolder + post.fileName; // Use the media folder path and file name
        media.controls = true;
      }
      let overlay = document.createElement('div');
      overlay.classList.add('overlay');
      let title = document.createElement('h3');
      title.innerText = post.title;

      overlay.appendChild(title);
      postDiv.append(media, overlay);
      column.appendChild(postDiv);
    });
    container.appendChild(column);
  }
}


let previousScreenSize = innerWidth;
console.log(previousScreenSize);

window.addEventListener('resize', () => {
  mediaIndex = 0;
  if (innerWidth < 600 && previousScreenSize >= 600) {
    generateMasonryGrid(1, posts);
  } else if (
    innerWidth >= 600 &&
    innerWidth < 1000 &&
    (previousScreenSize < 600 || previousScreenSize >= 1000)
  ) {
    generateMasonryGrid(2, posts);
  } else if (innerWidth >= 1000 && previousScreenSize < 1000) {
    generateMasonryGrid(4, posts);
  }
  previousScreenSize = innerWidth;
});

//Page Load
if (previousScreenSize < 600) {
  generateMasonryGrid(1, posts);
} else if (previousScreenSize >= 600 && previousScreenSize < 1000) {
  generateMasonryGrid(2, posts);
} else {
  generateMasonryGrid(4, posts);
}
