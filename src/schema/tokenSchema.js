const yup = require('yup');

const schema = {
    storeToken: {
        body: yup
            .object()
            .shape({
                email: yup.string().email().required(),
                password: yup.string().required(),
            })
            .noUnknown(),
    },
};

module.exports = schema;
