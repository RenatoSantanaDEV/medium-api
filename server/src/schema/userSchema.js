const yup = require('yup');

const schema = {
    storeUser: {
        body: yup.object().shape({
            username: yup.string().required('Nome é obrigatorio').min(3).max(50),
            email: yup.string().email().required(),
            password: yup.string().required(),
            confirmPassword: yup.string(255).required().oneOf([yup.ref('password'), null], 'Senha não é a mesma')
        }).noUnknown(),
    },
    showUser: {
        body: yup.object().shape({
            email: yup.string().email(),
        }).noUnknown(),
    }
}

module.exports = schema;