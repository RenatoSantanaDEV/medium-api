const yup = require('yup');
const schema = {
  storeThumbnail: {
    file: yup.object().shape({
      name: yup.string().required(),
      type: yup.string().oneOf(['image/png', 'image/jpeg']).required(),
      size: yup.number().integer().positive().max(1024 * 1024, 'file is too big').required('there is no file to be posted')
    }).required().noUnknown(),
  },
}
module.exports = schema;
