const Article = require('../models/Article');
const fs = require('fs');
const path = require('path');
const { put } = require('@vercel/blob');

const getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.json({ articles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createArticle = async (req, res) => {
  try {
    console.log('=== CREATE ARTICLE ===');
    console.log('Body:', req.body);

    // Validate required fields
    if (!req.body.name || !req.body.title || !req.body.content) {
      return res.status(400).json({
        message: 'Missing required fields: name, title, and content are required'
      });
    }

    // Handle content (same as before)
    let content;
    try {
      content = typeof req.body.content === 'string'
        ? JSON.parse(req.body.content)
        : req.body.content;
    } catch (e) {
      content = req.body.content.includes('\n')
        ? req.body.content.split('\n')
        : [req.body.content];
    }

    content = content.filter(item => item && item.trim() !== '');

    if (content.length === 0) {
      return res.status(400).json({ message: 'Content cannot be empty' });
    }

    const articleData = {
      name: req.body.name,
      title: req.body.title,
      content: content,
      isActive: req.body.isActive === 'true' || req.body.isActive === true,
      image: null 
    };

    let imageUrl = null;

    console.log(req.body)
    if (req.body.imageBase64) {
      if (!req.body.imageBase64.startsWith('data:image')) {
        return res.status(400).json({ message: 'Invalid image format' });
      }

      const contentType = req.body.imageBase64.split(';')[0].split(':')[1];
      const base64Data = req.body.imageBase64.split(',')[1];
      const buffer = Buffer.from(base64Data, 'base64');

      const filename = `articles/${req.body.name.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`;

      const blob = await put(filename, buffer, {
        access: 'public',
        contentType: contentType, // 4. Explicitly set content type
        addRandomSuffix: true,
      });

      imageUrl = blob.url;
    }
    else{
      console.log("This is not base64")
    }
    
    if (imageUrl) {
      articleData.image = imageUrl;
    }

    console.log(imageUrl)
    console.log('Article data to save:', articleData);

    const article = await Article.create(articleData);
    console.log('Article created successfully:', article._id);

    res.status(201).json(article);

  } catch (error) {
    console.error('Error creating article:', error);

    if (error.code === 11000) {
      return res.status(400).json({ message: 'An article with this name already exists' });
    }

    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

const updateArticle = async (req, res) => {
  try {
    console.log('=== UPDATE ARTICLE ===');
    console.log('ID:', req.params.id);
    console.log('Body:', req.body);
    console.log('File:', req.file);

    // Safely parse content
    let content;
    try {
      content = typeof req.body.content === 'string'
        ? JSON.parse(req.body.content)
        : req.body.content;
    } catch (e) {
      content = req.body.content.includes('\n')
        ? req.body.content.split('\n')
        : [req.body.content];
    }

    // Filter out empty strings
    content = content.filter(item => item && item.trim() !== '');

    const articleData = {
      name: req.body.name,
      title: req.body.title,
      content: content,
      isActive: req.body.isActive === 'true' || req.body.isActive === true,
    };

    // If new image uploaded
    if (req.file) {
      // Delete old image if exists
      const oldArticle = await Article.findById(req.params.id);
      if (oldArticle && oldArticle.image) {
        const oldImagePath = path.join(__dirname, '..', oldArticle.image);
        console.log('Deleting old image:', oldImagePath);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      articleData.image = `/uploads/articles/${req.file.filename}`;
    }

    console.log('Article data to update:', articleData);

    const article = await Article.findByIdAndUpdate(
      req.params.id,
      articleData,
      { new: true }
    );

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    console.log('Article updated successfully:', article._id);
    res.json(article);
  } catch (error) {
    console.error('Error updating article:', error);

    if (error.code === 11000) {
      return res.status(400).json({ message: 'An article with this name already exists' });
    }

    res.status(400).json({ message: error.message });
  }
};

const toggleArticleStatus = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    article.isActive = !article.isActive;
    await article.save();
    res.json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getArticleByName = async (req, res) => {
  try {
    const article = await Article.findOne({
      name: req.params.name,
      isActive: true
    });
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json({ article });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getArticles,
  createArticle,
  updateArticle,
  toggleArticleStatus,
  getArticleByName
};