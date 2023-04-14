const express = require('express')
const router = express.Router()
const axios = require('axios')

const GuardianKey ='bb77ec67-bf8f-4598-a53f-7acb9cdbcd58'

const getGuarNews = async () => {
    return await axios.get(`https://content.guardianapis.com/search?api-key=${GuardianKey}&section=(sport|business|technology|politics)&show-blocks=all`)
}

const getSectionNews = async (sectionName) => {
    return await axios.get(`https://content.guardianapis.com/${sectionName}?api-key=${GuardianKey}&show-blocks=all`)
}

router.get('/', async (req, res, next) => {
    const news = await getGuarNews()
    const response = news.data.response
    const newResult = { status: response.status,
                        results: [] }
    
    for(let i = 0; i < response.results.length; i++){
        // filter base on image size
        if(response.results[i].blocks.main !== undefined){
            if(response.results[i].blocks.main.elements[0].assets.length === 0){
                tempImage = {
                    url: 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png',
                    width: 'Default image'
                }
            } else{
                arrLength = response.results[i].blocks.main.elements[0].assets.length
                tempImage = {
                    url: response.results[i].blocks.main.elements[0].assets[arrLength-1].file,
                    width: response.results[i].blocks.main.elements[0].assets[arrLength-1].typeData.width
                }
            }
            // console.log(tempImage)
            newResult['results'].push({ section: response.results[i].sectionId.toUpperCase(),
                                        id: response.results[i].id,
                                        title: response.results[i].webTitle,
                                        description: response.results[i].blocks.body[0].bodyTextSummary,
                                        url: response.results[i].webUrl,
                                        imageUrl:  tempImage.url,
                                        imageWidth: tempImage.width,
                                        date: response.results[i].webPublicationDate.substring(0, 10) })
        }
    }

    res.send(newResult)
})

router.get('/:section', async (req, res, next) => {
    const sectionName = req.params.section
    console.log('request section name: '+ sectionName)
    const news = await getSectionNews(sectionName)
    const response = news.data.response
    // res.send(response)
    // res.send(news.data)

    const newResult = { status: response.status,
                        results: [] }
    
    for(let i = 0; i < response.results.length; i++){
        // filter base on image size
        // console.log(i)
        // console.log(response.results[i].blocks.main)
        if(response.results[i].blocks.main !== undefined){
            if(response.results[i].blocks.main.elements[0].assets.length === 0){
                tempImage = {
                    url: 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png',
                    width: 'Default image'
                }
            } else{
                arrLength = response.results[i].blocks.main.elements[0].assets.length
                tempImage = {
                    url: response.results[i].blocks.main.elements[0].assets[arrLength-1].file,
                    width: response.results[i].blocks.main.elements[0].assets[arrLength-1].typeData.width
                }
            }
            // console.log(tempImage)
            newResult['results'].push({ section: response.results[i].sectionId.toUpperCase(),
                                        id: response.results[i].id,
                                        title: response.results[i].webTitle,
                                        description: response.results[i].blocks.body[0].bodyTextSummary,
                                        url: response.results[i].webUrl,
                                        imageUrl:  tempImage.url,
                                        imageWidth: tempImage.width,
                                        date: response.results[i].webPublicationDate.substring(0, 10) })
        }
    }

    res.send(newResult)
})

module.exports = router;