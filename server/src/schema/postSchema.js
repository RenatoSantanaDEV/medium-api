const yup = require('yup');

const schema = {
    storePost: {
        body: yup.object().shape({
            title: yup.string().required('Título é obrigatorio').max(255),
            text: yup.string().required(),
            summary: yup.string().required().max(255),
            postLikes: yup.number().integer(),
            post_date: yup.date().required().typeError('O campo post_date deve estar no formato ISO (YYYY-MM-DD)')
        }).noUnknown(),
    },
    updatePost: {
        body: yup.object().shape({
            title: yup.string().required('Título é obrigatorio').max(255),
            text: yup.string().required(),
            summary: yup.string().required().max(255),
            postLikes: yup.number().integer(),
            post_date: yup.date().required().typeError('O campo post_date deve estar no formato ISO (YYYY-MM-DD)')
        }).noUnknown(),
    },
    indexPost: {
        query: yup.object().shape({
            title: yup.string(),
            text: yup.string(),
            post_likes: yup.number().integer(),
            post_date: yup.date()
        }).noUnknown(),
    },
}

module.exports = schema;