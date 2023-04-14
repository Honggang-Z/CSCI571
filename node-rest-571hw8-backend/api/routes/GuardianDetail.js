const express = require('express')
const router = express.Router()
const axios = require('axios')

const GuardianKey ='bb77ec67-bf8f-4598-a53f-7acb9cdbcd58'

const getGuarNews = async () => {
    return await axios.get(`https://content.guardianapis.com/search?api-key=${GuardianKey}&section=(sport|business|technology|politics)&show-blocks=all`)
}

const getGuarDetail = async (articleID) => {
    return await axios.get(`https://content.guardianapis.com/${articleID}?api-key=${GuardianKey}&show-blocks=all`)
}
https://content.guardianapis.com/?api-key=&show-blocks=all

router.get('/', async (req, res, next) => {
    const articleID = req.query.id
    console.log('article ID: '+ articleID)
    const news = await getGuarDetail(articleID)
    const response = news.data.response
    // res.send(response)
    // res.send(news.data)

    const newResult = { status: response.status,
                        section: response.content.sectionId.toUpperCase(),
                        id: articleID,
                        title: response.content.webTitle,
                        description: response.content.blocks.body[0].bodyTextSummary,
                        date: response.content.webPublicationDate.substring(0,10),
                        url: response.content.webUrl,
                        imageUrl: '',
                        imageWidth: ''
                    }
    arrLength = response.content.blocks.main.elements[0].assets.length
    if(arrLength === 0){
        tempImage = {
            url: 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png',
            width: 'Default image'
        }
    } else {
        tempImage = {
            url: response.content.blocks.main.elements[0].assets[arrLength-1].file,
            width: response.content.blocks.main.elements[0].assets[arrLength-1].typeData.width
        }
    }
    newResult['imageUrl'] = tempImage.url
    newResult['imageWidth'] = tempImage.width
    
    res.send(newResult)
})

module.exports = router;