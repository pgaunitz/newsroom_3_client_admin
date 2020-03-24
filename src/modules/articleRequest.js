import axios from 'axios'

const submitArticle = async(title, snippet, content) => {
    let response
try {
    let articleParams = {
        article: {
            title: title,
            snippet: snippet,
            content: content
        }
    }
response = axios.post("http://localhost:3000/api/v1/articles")
} catch(error) {

}
}


export {submitArticle};