document.getElementById('fetchArticleButton').addEventListener('click', fetchRandomArticle);
document.getElementById('expandButton').addEventListener('click', expandArticle);

let currentArticleTitle = '';

async function fetchRandomArticle() {
  const url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&generator=random&grnnamespace=0&prop=extracts|pageimages&exintro&explaintext&pithumbsize=300&origin=*';
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    const pages = data.query.pages;
    const page = Object.values(pages)[0];
    
    currentArticleTitle = page.title;
    const extract = page.extract;
    const imageUrl = page.thumbnail ? page.thumbnail.source : '';

    document.getElementById('articleTitle').textContent = currentArticleTitle;
    document.getElementById('articleIntro').textContent = extract;

    const articleImage = document.getElementById('articleImage');
    if (imageUrl) {
      articleImage.src = imageUrl;
      articleImage.classList.remove('hidden');
    } else {
      articleImage.classList.add('hidden');
    }

    document.getElementById('articleDetails').classList.remove('hidden');
    document.body.style.width = '600px';
    document.body.style.height = '800px';
  } catch (error) {
    console.error('Error fetching article:', error);
  }
}

function expandArticle() {
  if (currentArticleTitle) {
    chrome.tabs.create({ url: `https://en.wikipedia.org/wiki/${currentArticleTitle}` });
  }
}