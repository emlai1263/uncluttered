const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      trim: true
    },
    name: {
      type: String,
      required: true,
      default: 'title',
      trim: true
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category', 
        default: null
    },
    icon: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
  },
  { collection: 'categories' }
)

module.exports = categorySchema;
