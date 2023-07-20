const container = document.querySelector('.container');

function generateMasonryGrid(columns, posts) {
  container.innerHTML = '';

  // Store column arrays that contain relevant posts
  let columnWrappers = {};

  // Create column item array and add this to column wrapper object
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
      if (post.media.endsWith('.mp4')) {
        media = document.createElement('video');
        media.src = post.media;
        media.controls = true;
      } else {
        media = document.createElement('img');
        media.src = post.media;
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

const posts = [];
const mediaFolder = 'Blender/';
const mediaFiles = [
  'cat.png',
  'egypt_post.jpg',
  'Ganesh_temple.mp4',
  'lab.png',
  'Fluxus submission.mp4',
  'Green field.mp4',
  'SP.png',
  'SUMMON.png',
  'scifi.mp4',
];

for (let i = 1; i <= 80; i++) {
  const mediaIndex = i % mediaFiles.length;
  const mediaFileName = mediaFiles[mediaIndex];
  const mediaURL = mediaFileName.endsWith('.mp4') ? getVideoURL(mediaFileName) : `${mediaFolder}${mediaFileName}`;

  let item = {
    id: i,
    title: `Post ${i}`,
    media: mediaURL,
  };
  posts.push(item);
}

function getVideoURL(filename) {
  // Update the function to return the full path to the video file
  return `file://full/path/to/videos/${filename}`;
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

// Page Load
if (previousScreenSize < 600) {
  generateMasonryGrid(1, posts);
} else if (previousScreenSize >= 600 && previousScreenSize < 1000) {
  generateMasonryGrid(2, posts);
} else {
  generateMasonryGrid(4, posts);
}
