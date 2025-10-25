const Item = require('../models/Item');

// Exchange rate: 1 USD = 83 INR (approximate, you may want to fetch this dynamically)
const USD_TO_INR_RATE = 83;

/**
 * @desc    Create a new item
 * @route   POST /api/items
 * @access  Private (Librarian, Admin)
 */
exports.createItem = async (req, res) => {
  try {
    const {
      title,
      author,
      category,
      description,
      price,
      currency,
      isFree,
      image,
      quantity,
      isbn,
      publisher,
      publishedDate,
      pages,
      language,
      tags,
      content,
      pdfUrl,
      epubUrl
    } = req.body;

    // Validation
    if (!title) {
      return res.status(400).json({ 
        success: false,
        message: "Title is required" 
      });
    }

    const item = new Item({
      title,
      author,
      category,
      description,
      price: price || 0,
      currency: currency || 'INR',
      isFree: isFree || false,
      image,
      quantity: quantity || 1,
      isbn,
      publisher,
      publishedDate,
      pages,
      language: language || 'English',
      tags,
      content,
      pdfUrl,
      epubUrl
    });

    await item.save();

    res.status(201).json({
      success: true,
      message: "Item created successfully",
      data: item
    });
  } catch (err) {
    console.error("Create item error:", err);
    res.status(400).json({ 
      success: false,
      message: "Error creating item",
      error: err.message 
    });
  }
};

/**
 * @desc    Get all items
 * @route   GET /api/items
 * @access  Private
 */
exports.getItems = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const { free } = req.query;

    // Build query
    let query = {};
    if (free === 'true') {
      query.isFree = true;
    }

    const items = await Item.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Item.countDocuments(query);

    // Convert prices to INR for display
    const itemsWithConvertedPrices = items.map(item => {
      const itemObj = item.toObject();
      if (itemObj.currency === 'USD') {
        itemObj.priceInr = Math.round(itemObj.price * USD_TO_INR_RATE);
      } else {
        itemObj.priceInr = itemObj.price;
      }
      return itemObj;
    });

    res.status(200).json({
      success: true,
      count: items.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: itemsWithConvertedPrices
    });
  } catch (err) {
    console.error("Get items error:", err);
    res.status(500).json({ 
      success: false,
      message: "Error fetching items",
      error: err.message 
    });
  }
};

/**
 * @desc    Get single item by ID
 * @route   GET /api/items/:id
 * @access  Private
 */
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ 
        success: false,
        message: "Item not found" 
      });
    }

    // Convert price to INR for display
    const itemObj = item.toObject();
    if (itemObj.currency === 'USD') {
      itemObj.priceInr = Math.round(itemObj.price * USD_TO_INR_RATE);
    } else {
      itemObj.priceInr = itemObj.price;
    }

    res.status(200).json({
      success: true,
      data: itemObj
    });
  } catch (err) {
    console.error("Get item error:", err);
    res.status(500).json({ 
      success: false,
      message: "Error fetching item",
      error: err.message 
    });
  }
};

/**
 * @desc    Update item
 * @route   PUT /api/items/:id
 * @access  Private (Librarian, Admin)
 */
exports.updateItem = async (req, res) => {
  try {
    const {
      title,
      author,
      category,
      description,
      price,
      currency,
      isFree,
      image,
      quantity,
      isbn,
      publisher,
      publishedDate,
      pages,
      language,
      tags,
      content,
      pdfUrl,
      epubUrl
    } = req.body;

    const item = await Item.findByIdAndUpdate(
      req.params.id,
      {
        title,
        author,
        category,
        description,
        price,
        currency,
        isFree,
        image,
        quantity,
        isbn,
        publisher,
        publishedDate,
        pages,
        language,
        tags,
        content,
        pdfUrl,
        epubUrl,
        updatedAt: Date.now()
      },
      { 
        new: true, 
        runValidators: true 
      }
    );

    if (!item) {
      return res.status(404).json({ 
        success: false,
        message: "Item not found" 
      });
    }

    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      data: item
    });
  } catch (err) {
    console.error("Update item error:", err);
    res.status(400).json({ 
      success: false,
      message: "Error updating item",
      error: err.message 
    });
  }
};

/**
 * @desc    Delete item
 * @route   DELETE /api/items/:id
 * @access  Private (Admin)
 */
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    
    if (!item) {
      return res.status(404).json({ 
        success: false,
        message: "Item not found" 
      });
    }

    res.status(200).json({
      success: true,
      message: "Item deleted successfully"
    });
  } catch (err) {
    console.error("Delete item error:", err);
    res.status(500).json({ 
      success: false,
      message: "Error deleting item",
      error: err.message 
    });
  }
};

/**
 * @desc    Search items
 * @route   GET /api/items/search
 * @access  Private
 */
exports.searchItems = async (req, res) => {
  try {
    const { q, category, author, isbn, subject, free } = req.query;
    
    let query = {};
    
    if (q) {
      query.$or = [
        { title: new RegExp(q, 'i') },
        { description: new RegExp(q, 'i') }
      ];
    }
    
    if (category) {
      query.category = new RegExp(category, 'i');
    }
    
    if (author) {
      query.author = new RegExp(author, 'i');
    }
    
    if (isbn) {
      query.isbn = new RegExp(isbn, 'i');
    }
    
    if (subject) {
      query.tags = { $in: [new RegExp(subject, 'i')] };
    }
    
    if (free === 'true') {
      query.isFree = true;
    }

    const items = await Item.find(query).sort({ createdAt: -1 });

    // Convert prices to INR for display
    const itemsWithConvertedPrices = items.map(item => {
      const itemObj = item.toObject();
      if (itemObj.currency === 'USD') {
        itemObj.priceInr = Math.round(itemObj.price * USD_TO_INR_RATE);
      } else {
        itemObj.priceInr = itemObj.price;
      }
      return itemObj;
    });

    res.status(200).json({
      success: true,
      count: items.length,
      data: itemsWithConvertedPrices
    });
  } catch (err) {
    console.error("Search items error:", err);
    res.status(500).json({ 
      success: false,
      message: "Error searching items",
      error: err.message 
    });
  }
};

/**
 * @desc    Update reading progress
 * @route   POST /api/items/:id/progress
 * @access  Private
 */
exports.updateReadingProgress = async (req, res) => {
  try {
    const { currentPage, finished } = req.body;
    const userId = req.user.id;
    const itemId = req.params.id;

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ 
        success: false,
        message: "Item not found" 
      });
    }

    // Find existing progress or create new
    let progressEntry = item.readingProgress.find(p => p.user.toString() === userId);
    
    if (progressEntry) {
      // Update existing progress
      progressEntry.currentPage = currentPage;
      progressEntry.lastRead = Date.now();
      if (finished !== undefined) progressEntry.finished = finished;
    } else {
      // Create new progress entry
      item.readingProgress.push({
        user: userId,
        currentPage,
        finished: finished || false
      });
    }

    await item.save();

    res.status(200).json({
      success: true,
      message: "Reading progress updated",
      data: item.readingProgress.find(p => p.user.toString() === userId)
    });
  } catch (err) {
    console.error("Update reading progress error:", err);
    res.status(500).json({ 
      success: false,
      message: "Error updating reading progress",
      error: err.message 
    });
  }
};

/**
 * @desc    Get reading progress
 * @route   GET /api/items/:id/progress
 * @access  Private
 */
exports.getReadingProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const itemId = req.params.id;

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ 
        success: false,
        message: "Item not found" 
      });
    }

    const progressEntry = item.readingProgress.find(p => p.user.toString() === userId);

    res.status(200).json({
      success: true,
      data: progressEntry || { currentPage: 0, finished: false }
    });
  } catch (err) {
    console.error("Get reading progress error:", err);
    res.status(500).json({ 
      success: false,
      message: "Error fetching reading progress",
      error: err.message 
    });
  }
};

/**
 * @desc    Get free books
 * @route   GET /api/items/free
 * @access  Private
 */
exports.getFreeBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const items = await Item.find({ isFree: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Item.countDocuments({ isFree: true });

    res.status(200).json({
      success: true,
      count: items.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: items
    });
  } catch (err) {
    console.error("Get free books error:", err);
    res.status(500).json({ 
      success: false,
      message: "Error fetching free books",
      error: err.message 
    });
  }
};