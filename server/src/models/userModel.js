import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bookmarks: [
    {
      mediaId: {
        type: Number,
        required: true,
      },
      mediaType: {
        type: String,
        enum: ['movie', 'tv'],
        required: true,
      },
      title: String,
      posterPath: String,
      releaseDate: String,
    }
  ]
})

const userModel = mongoose.models.user || mongoose.model('user', userSchema)

export default userModel