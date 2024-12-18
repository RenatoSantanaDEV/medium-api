const yup = require('yup');

const schema = {
    storePost: {
        body: yup.object.shape({
            title: yup.string().required('Título é obrigatorio').min(1).max(255),
            text: yup.string().email().required().min(1).max(255),
            summary: yup.string().required().min(1).max(255),
            postLikes: yup.integer().required(),
            post_date: yup.date().required().typeError('O campo post_date deve estar no formato ISO (YYYY-MM-DD)')
        }).noUnknown(),
    }
}

module.exports - schema;