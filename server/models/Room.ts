import mongoose from 'mongoose'

const RoomSchema = new mongoose.Schema({
  roomId: String,
  isPersistent: Boolean,
  messages: [{
    sender: String,
    content: String,
    type: String, // 'text' or 'file'
    fileUrl: String,
    timestamp: Date
  }],
  files: [{
    name: String,
    url: String,
    uploadedBy: String,
    timestamp: Date
  }]
})

export default mongoose.model('Room', RoomSchema)