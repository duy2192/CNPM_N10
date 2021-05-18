const express = require('express')
const router = express.Router()
const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request-promise');

router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})

router.get('/covid19vietnamdetails', async (req, res) => {
    const options = {
        uri: 'https://ncov.moh.gov.vn',
        rejectUnauthorized: false
    };
    request(options, async (er, response, html) => {
        try {
            const $ = cheerio.load(html); 
            let data = []
            $('#sailorTable tbody tr').each((index, el) => {
                const bn = {
                    bn: $(el).find('td:first-child').text(),
                    tuoi: $(el).find('td:nth-child(2)').text(),
                    que: $(el).find('td:nth-child(3)').text(),
                    tinhtrang: $(el).find('td:nth-child(4)').text(),
                    quoctich: $(el).find('td:nth-child(5)').text(),
                }
                data.push(bn);
            });
            res.json(data)
        } catch (error) {
            throw error
        }
    });
    
})
router.get('/covid19', async (req, res) => {
    const options = {
        uri: 'https://ncov.moh.gov.vn',
        rejectUnauthorized: false
    };
    request(options, async (er, response, html) => {
        try {
            const $ = cheerio.load(html); 
            let data = []
            $('.box-tke-V3 .row ').each((index, el) => {
                const resdata ={
                    scn:    $(el).find('div:nth-child(1) span').text(),
                    dangnhiem:  $(el).find('.text-warning1  span').text(),
                    khoi:   $(el).find('div:nth-child(3) span').text(),
                    tuvong: $(el).find('div:nth-child(4) span').text()
                }
                data.push(resdata);
            });
            res.json(data)
        } catch (error) {
            throw error
        }
    });
    
})

module.exports = router