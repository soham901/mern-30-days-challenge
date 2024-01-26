let blogs: any[] = [];

const lorem =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo quasi optio omnis facilis odio eos tempora commodi natus hic inventore sequi aut voluptate, ullam rem nostrum mollitia velit voluptatibus eius beatae? Placeat labore saepe dolorem culpa nobis laudantium deserunt, quis iusto provident impedit corporis tenetur sint quasi voluptatibus sit ab! Recusandae illum reiciendis dignissimos cum temporibus quo blanditiis perspiciatis nulla veniam est, labore consequuntur ratione vero sit neque laudantium quia numquam rerum natus nisi. Alias quasi voluptate pariatur quo? Optio iste, obcaecati dignissimos vel soluta reprehenderit, aliquam dolor deserunt quia iure eum! Mollitia rerum velit nam tempore, alias sunt accusamus odio blanditiis, consequuntur doloremque doloribus quia perspiciatis tenetur minus! Laudantium dolorem rem autem ut officia libero eos quibusdam corporis vitae? Enim commodi non molestiae quis illum, facilis recusandae!";

const generateRandomNum = (end: number, start: number = 1) =>
  Math.floor(Math.random() * (end + 1 - start) + start);

function generateFakeData() {
  for (let i = 0; i < 60; i++) {
    const randomIdx = blogs.length + generateRandomNum(lorem.length, 0);

    let newTitle = lorem.substring(randomIdx, randomIdx - 32);
    let newContent = lorem.substring(randomIdx, randomIdx - 96);

    while (newContent.length < 96) {
      newContent += newContent.at(generateRandomNum(10));
    }

    const newBlog = {
      id: i + 1,
      title: newTitle,
      content: newContent,
    };
    blogs.push(newBlog);
  }
}

generateFakeData();
