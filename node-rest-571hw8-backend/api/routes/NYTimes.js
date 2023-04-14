const express = require('express')
const router = express.Router()
// const request = require('request')
// const https = require('https')
const axios = require('axios')

const NYTimesKey = 'EDkIM28GyULNjC2bfJwNv1FzfI6zikdK'
const GuardianKey =''

const getNews = async (sectionName) => {
    return await axios.get(`https://api.nytimes.com/svc/topstories/v2/${sectionName}.json?api-key=` + NYTimesKey)
    // return await axios.get(`https://api.nytimes.com/svc/topstories/v2/${sectionName}.json?api-key=${NYTimesKey}`)
}
const getNYTdetail = async (articleUrl) => {
    return await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:("${articleUrl}")&api-key=${NYTimesKey}`)
}

router.get('/', async (req, res, next) => {
    const news = await getNews('home')
    const newResult = { status: news.data.status,
                        section: news.data.section,
                        results_number: news.data.num_results,
                        results: [] }

    for(let i = 0; i < news.data.num_results; i++){
        // console.log('i: ' + i)
        // filter base on image size
        let filteredMultimedia = []
        try{
            if(news.data.results[i].multimedia !== null){
                filteredMultimedia = news.data.results[i].multimedia.filter(function(beforefilter) {
                    return beforefilter.width >= 2000
                })
            }
        } catch {
            filteredMultimedia = []
        }

        if(filteredMultimedia.length === 0){
            // console.log('length: ' + filteredMultimedia.length + ': ' + 'now is null')
            filteredMultimedia.push({url: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg',
                    width: 'Default image'})
        } 
        // console.log(filteredMultimedia)

        newResult['results'].push({ section: news.data.results[i].section.toUpperCase(),
                                    title: news.data.results[i].title,
                                    description: news.data.results[i].abstract,
                                    url: news.data.results[i].url,
                                    imageUrl:  filteredMultimedia[0].url,
                                    imageWidth: filteredMultimedia[0].width,
                                    date: news.data.results[i].published_date.substring(0, 10) })
    }
    newResult['results'] = newResult['results'].slice(0, 10)
    newResult['results_number'] = newResult.results.length
    
    // res.send(news.data)
    res.send(newResult)
})

router.get('/world', async (req, res, next) => {
    const news = await getNews('world')
    const newResult = { status: news.data.status,
                        section: news.data.section,
                        results_number: news.data.num_results,
                        results: [] }

    for(let i = 0; i < news.data.num_results; i++){
        // console.log('i: ' + i)
        // filter base on image size
        var filteredMultimedia = []
        try {
            filteredMultimedia = news.data.results[i].multimedia.filter(function(beforefilter) {
                return beforefilter.width >= 2000
            })
        } catch{
            filteredMultimedia = []
        }

        if(filteredMultimedia.length === 0){
            // console.log('length: ' + filteredMultimedia.length + ': ' + 'now is null')
            filteredMultimedia.push({url: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg',
                    width: 'Default image'})
        } 

        if(news.data.results[i].section === 'world'){
            newResult['results'].push({ section: news.data.results[i].section.toUpperCase(),
                                        title: news.data.results[i].title,
                                        description: news.data.results[i].abstract,
                                        url: news.data.results[i].url,
                                        imageUrl:  filteredMultimedia[0].url,
                                        imageWidth: filteredMultimedia[0].width,
                                        date: news.data.results[i].published_date.substring(0, 10) })
        }
        newResult['results_number'] = newResult.results.length
    }
    // console.log(newResult.results_number)
    newResult['results'] = newResult.results.slice(0,10)
    newResult['results_number'] = newResult.results.length
    // console.log(newResult.results_number)

    res.send(newResult)
})

router.get('/politics', async (req, res, next) => {
    const news = await getNews('politics')
    const newResult = { status: news.data.status,
                        section: news.data.section,
                        results_number: news.data.num_results,
                        results: [] }

    for(let i = 0; i < news.data.num_results; i++){
        // console.log('i: ' + i)
        // filter base on image size
        var filteredMultimedia = []
        try {
            filteredMultimedia = news.data.results[i].multimedia.filter(function(beforefilter) {
                return beforefilter.width >= 2000
            })
        } catch {
            filteredMultimedia = []
        }

        if(filteredMultimedia.length === 0){
            // console.log('length: ' + filteredMultimedia.length + ': ' + 'now is null')
            filteredMultimedia.push({url: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg',
                    width: 'Default image'})
        } 

        if(news.data.results[i].subsection === 'politics'){
            newResult['results'].push({ section: news.data.results[i].section.toUpperCase(),
                                        title: news.data.results[i].title,
                                        description: news.data.results[i].abstract,
                                        url: news.data.results[i].url,
                                        imageUrl:  filteredMultimedia[0].url,
                                        imageWidth: filteredMultimedia[0].width,
                                        date: news.data.results[i].published_date.substring(0, 10) })
        }
        newResult['results_number'] = newResult.results.length
    }
    // console.log(newResult.results_number)
    newResult['results'] = newResult.results.slice(0,10)
    newResult['results_number'] = newResult.results.length
    // console.log(newResult.results_number)

    res.send(newResult)
})

router.get('/business', async (req, res, next) => {
    const news = await getNews('business')
    const newResult = { status: news.data.status,
                        section: news.data.section,
                        results_number: news.data.num_results,
                        results: [] }

    for(let i = 0; i < news.data.num_results; i++){
        // console.log('i: ' + i)
        // filter base on image size
        var filteredMultimedia = []
        try {
            filteredMultimedia = news.data.results[i].multimedia.filter(function(beforefilter) {
                return beforefilter.width >= 2000
            })
        } catch {
            filteredMultimedia = []
        }

        if(filteredMultimedia.length === 0){
            // console.log('length: ' + filteredMultimedia.length + ': ' + 'now is null')
            filteredMultimedia.push({url: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg',
                    width: 'Default image'})
        } 

        if(news.data.results[i].section === 'business'){
            newResult['results'].push({ section: news.data.results[i].section.toUpperCase(),
                                        title: news.data.results[i].title,
                                        description: news.data.results[i].abstract,
                                        url: news.data.results[i].url,
                                        imageUrl:  filteredMultimedia[0].url,
                                        imageWidth: filteredMultimedia[0].width,
                                        date: news.data.results[i].published_date.substring(0, 10) })
        }
        newResult['results_number'] = newResult.results.length
    }
    // console.log(newResult.results_number)
    newResult['results'] = newResult.results.slice(0,10)
    newResult['results_number'] = newResult.results.length
    // console.log(newResult.results_number)

    res.send(newResult)
})

router.get('/technology', async (req, res, next) => {
    const news = await getNews('technology')
    const newResult = { status: news.data.status,
                        section: news.data.section,
                        results_number: news.data.num_results,
                        results: [] }

    for(let i = 0; i < news.data.num_results; i++){
        // console.log('i: ' + i)
        // filter base on image size
        var filteredMultimedia = []
        try {
            filteredMultimedia = news.data.results[i].multimedia.filter(function(beforefilter) {
                return beforefilter.width >= 2000
            })
        } catch {
            filteredMultimedia = []
        }

        if(filteredMultimedia.length === 0){
            // console.log('length: ' + filteredMultimedia.length + ': ' + 'now is null')
            filteredMultimedia.push({url: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg',
                    width: 'Default image'})
        } 

        if(news.data.results[i].section === 'technology'){
            newResult['results'].push({ section: news.data.results[i].section.toUpperCase(),
                                        title: news.data.results[i].title,
                                        description: news.data.results[i].abstract,
                                        url: news.data.results[i].url,
                                        imageUrl:  filteredMultimedia[0].url,
                                        imageWidth: filteredMultimedia[0].width,
                                        date: news.data.results[i].published_date.substring(0, 10) })
        }
        newResult['results_number'] = newResult.results.length
    }
    // console.log(newResult.results_number)
    newResult['results'] = newResult.results.slice(0,10)
    newResult['results_number'] = newResult.results.length
    // console.log(newResult.results_number)

    res.send(newResult)
})

router.get('/sports', async (req, res, next) => {
    const news = await getNews('sports')
    const newResult = { status: news.data.status,
                        section: news.data.section,
                        results_number: news.data.num_results,
                        results: [] }

    for(let i = 0; i < news.data.num_results; i++){
        // console.log('i: ' + i)
        // filter base on image size
        var filteredMultimedia = []
        try {
            filteredMultimedia = news.data.results[i].multimedia.filter(function(beforefilter) {
                return beforefilter.width >= 2000
            })
        } catch {
            filteredMultimedia = []
        }

        if(filteredMultimedia.length === 0){
            // console.log('length: ' + filteredMultimedia.length + ': ' + 'now is null')
            filteredMultimedia.push({url: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg',
                    width: 'Default image'})
        } 

        if(news.data.results[i].section === 'sports'){
            newResult['results'].push({ section: news.data.results[i].section.toUpperCase(),
                                        title: news.data.results[i].title,
                                        description: news.data.results[i].abstract,
                                        url: news.data.results[i].url,
                                        imageUrl:  filteredMultimedia[0].url,
                                        imageWidth: filteredMultimedia[0].width,
                                        date: news.data.results[i].published_date.substring(0, 10) })
        }
        newResult['results_number'] = newResult.results.length
    }
    // console.log(newResult.results_number)
    newResult['results'] = newResult.results.slice(0,10)
    newResult['results_number'] = newResult.results.length
    // console.log(newResult.results_number)

    res.send(newResult)
})

router.get('/:articleUrl', async (req, res, next) => {
    const url = req.params.articleUrl
    const news = await getNYTdetail(decodeURI(url))
    console.log(url)
    const newResult = { status: news.data.status,
                        section: news.data.response.docs[0].news_desk.toUpperCase(),
                        title: news.data.response.docs[0].headline.main,
                        description: news.data.response.docs[0].abstract,
                        date: news.data.response.docs[0].pub_date.substring(0,10),
                        url: news.data.response.docs[0].web_url,
                        imageUrl: '',
                        imageWidth: ''
                    }
    // console.log(news.data.response.docs[0].multimedia.length)
    var filteredMultimedia = []
    try {
        filteredMultimedia = news.data.response.docs[0].multimedia.filter(function(beforefilter) {
            return beforefilter.width >= 2000
        })
    } catch {
        filteredMultimedia = []
    }
    
    if(filteredMultimedia.length === 0){
        filteredMultimedia.push({url: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg',
                width: 'Default image'})
        newResult['imageUrl'] = filteredMultimedia[0].url
    } 
    else{
        newResult['imageUrl'] = 'https://static01.nyt.com/' + filteredMultimedia[0].url
        newResult['imageWidth'] = filteredMultimedia[0].width
    }
    // console.log(filteredMultimedia)

    res.send(newResult)
})

// following are tutorial examples
router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST request'
    })
})

module.exports = router;