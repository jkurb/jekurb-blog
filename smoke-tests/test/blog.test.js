'use strict';

const chai = require('chai');
const request = require('supertest');
const cheerio = require('cheerio');
const blog = process.env.BLOG_BASE_URL;

const expect = chai.expect;

describe('Smoke tests', function() {
    describe('# Request Home', function() {
        it('should return at least 1 posts', function(done) {
            request(blog)
                .get('/')
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    var $ = cheerio.load(res.text);
                    expect($('div.post').length).to.be.at.least(1);
                    done();
                });
        });
    });
    describe('# Request All Posts', function() {
        it('should return at least 1 posts', function(done) {
            request(blog)
                .get('/posts/')
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    var $ = cheerio.load(res.text);
                    expect($('li.post').length).to.be.at.least(1);
                    done();
                });
        });
    });
    describe('# Request About', function() {
        it('should return about info', function(done) {
            request(blog)
                .get('/about/')
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    var $ = cheerio.load(res.text);
                    expect($('.title').text()).to.be.equal('About');
                    done();
                });
        });
    });
    describe('# Request Sitemap', function() {
        it('should return sitemap', function(done) {
            request(blog)
                .get('/sitemap.xml')
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    done();
                });
        });
    });
    describe('# Request RSS feed', function() {
        it('should return RSS xml', function(done) {
            request(blog)
                .get('/index.xml')
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    done();
                });
        });
    });
});