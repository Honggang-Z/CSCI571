const express = require('express')
const router = express.Router()
const axios = require('axios')

const NYTimesKey = 'EDkIM28GyULNjC2bfJwNv1FzfI6zikdK'
const GuardianKey = 'bb77ec67-bf8f-4598-a53f-7acb9cdbcd58'

// const getNews = async (sectionName) => {
//     return await axios.get(`https://api.nytimes.com/svc/topstories/v2/${sectionName}.json?api-key=` + NYTimesKey)
//     // return await axios.get(`https://api.nytimes.com/svc/topstories/v2/${sectionName}.json?api-key=${NYTimesKey}`)
// }
const getNYTimes = async (keyword) => {
    return await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${keyword}&api-key=${NYTimesKey}`)
}
const getGuardian = async (keyword) => {
    return await axios.get(`https://content.guardianapis.com/search?q=${keyword}&api-key=${GuardianKey}&show-blocks=all`)
}

router.get('/', async (req, res, next) => {
    const keyword = req.query.q
    console.log(keyword)

    const news = await getNYTimes(keyword)
    const guarNews = await getGuardian(keyword)

    const nytNewResult = { 
        status: news.data.status,
        results: [] 
    }
    const guardianNewResult = { 
        status: guarNews.data.response.status,
        results: [] 
    }

    for(let i = 0; i < news.data.response.docs.length; i++){
        // console.log('i: ' + i)
        // filter base on image size
        const filteredMultimedia = news.data.response.docs[i].multimedia.filter(function(beforefilter) {
            return beforefilter.width >= 2000
        })

        if(filteredMultimedia.length === 0){
            // console.log('length: ' + filteredMultimedia.length + ': ' + 'now is null')
            filteredMultimedia.push({url: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg',
                    width: 'Default image'})
            nytNewResult['results'].push({ 
                section: news.data.response.docs[i].news_desk.toUpperCase(),
                title: news.data.response.docs[i].headline.main,
                description: news.data.response.docs[i].abstract,
                url: news.data.response.docs[i].web_url,
                imageUrl: filteredMultimedia[0].url,
                imageWidth: filteredMultimedia[0].width,
                date: news.data.response.docs[i].pub_date.substring(0, 10) 
            })
                    
        } else {
            nytNewResult['results'].push({ 
                section: news.data.response.docs[i].news_desk.toUpperCase(),
                title: news.data.response.docs[i].headline.main,
                description: news.data.response.docs[i].abstract,
                url: news.data.response.docs[i].web_url,
                imageUrl:  'https://static01.nyt.com/' + filteredMultimedia[0].url,
                imageWidth: filteredMultimedia[0].width,
                date: news.data.response.docs[i].pub_date.substring(0, 10) 
            })
        }
    }
    nytNewResult['results'] = nytNewResult.results.filter((beforefilter)=>{
        return (beforefilter.section != "" && beforefilter.section != null && beforefilter.title != null &&
            beforefilter.url != null && beforefilter.date != null)
    })
    
    for(let j = 0; j < guarNews.data.response.results.length; j++){
        // console.log('j: ' + j)
        try {
            arrLength = guarNews.data.response.results[j].blocks.main.elements[0].assets.length
            guardianNewResult['results'].push({
                section: guarNews.data.response.results[j].sectionId.toUpperCase(),
                title: guarNews.data.response.results[j].webTitle,
                description: guarNews.data.response.results[j].blocks.body[0].bodyTextSummary,
                url: guarNews.data.response.results[j].webUrl,
                id: guarNews.data.response.results[j].id,
                imageUrl: guarNews.data.response.results[j].blocks.main.elements[0].assets[arrLength-1].file,
                imageWidth: guarNews.data.response.results[j].blocks.main.elements[0].assets[arrLength-1].typeData.width,
                date: guarNews.data.response.results[j].webPublicationDate.substring(0, 10)
            })
        } catch {
            guardianNewResult['results'].push({
                section: guarNews.data.response.results[j].sectionId.toUpperCase(),
                title: guarNews.data.response.results[j].webTitle,
                description: guarNews.data.response.results[j].blocks.body[0].bodyTextSummary,
                url: guarNews.data.response.results[j].webUrl,
                id: guarNews.data.response.results[j].id,
                imageUrl: 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png',
                imageWidth: 'Default image',
                date: guarNews.data.response.results[j].webPublicationDate.substring(0, 10)
            })
        }
    }

    const totalResult = {
        statusNYT: nytNewResult.status,
        statusGuar: guardianNewResult.status,
        results: []
    }
    for(let i = 0; i < nytNewResult.results.length; i++){
        totalResult['results'].push(nytNewResult.results[i])
    }
    for(let i = 0; i < guardianNewResult.results.length; i++){
        totalResult['results'].push(guardianNewResult.results[i])
    }
    
    totalResult['results'] = totalResult['results'].slice(0, 10)


    // res.send(testfilt)
    // res.send(nytNewResult)
    // res.send(guardianNewResult)
    res.send(totalResult)
})

module.exports = router;