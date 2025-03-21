const db = require('../config/firebase');
const poemsCollection = db.collection('poems');

const addPoem = async (req, res) => {
  try {
    const { title, content, author, hashtags } = req.body;

    const newPoem = {
      title,
      content,
      author,
      hashtags,
      date: new Date(),
      comments: [],
    };

    const docRef = await poemsCollection.add(newPoem);
    res.status(200).json({ message: 'Poem added successfully', id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add poem' });
  }
};

module.exports = { addPoem };
