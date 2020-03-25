import axios from 'axios'

const submitArticle = async(title, snippet, content) => {
    let response
try {
    let articleParams 

    articleParams = {
        title: title,
        snippet: snippet,
        content: content
    }
    
 
response = await axios.post("http://localhost:3000/api/v1/articles",
    {article: articleParams}
    )

} catch(error) {
    response = error.response.data.message
} finally {
    return response
}
}

export {submitArticle};