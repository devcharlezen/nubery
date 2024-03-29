import Sub from '../models/sub'
import Course from '../models/course'
import slugify from 'slugify'

export const create = async (req, res) => {
  try {
    const { name, parent } = req.body
    res.json(
      await new Sub({ name, parent, slug: slugify(name) })
        .populate('parent')
        .save(),
    )
  } catch (err) {
    console.log('SUB CREATE ERR ----->', err)
    res.status(400).send('Create sub failed')
  }
}

export const list = async (req, res) =>
  res.json(await Sub.find({}).sort({ createdAt: -1 }).exec())

export const read = async (req, res) => {
  let sub = await Sub.findOne({ slug: req.params.slug }).exec()
  const courses = await Course.find({ subs: sub }).populate('category').exec()

  res.json({
    sub,
    courses,
  })
}

export const update = async (req, res) => {
  const { name, parent } = req.body
  try {
    const updated = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name, parent, slug: slugify(name) },
      { new: true },
    )
    res.json(updated)
  } catch (err) {
    res.status(400).send('Sub update failed')
  }
}

export const remove = async (req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({ slug: req.params.slug })
    res.json(deleted)
  } catch (err) {
    res.status(400).send('Sub delete failed')
  }
}
