const { v4: uuidv4 } = require('uuid');

module.exports = {
    beforeCreate(event) {
        event.params.data.uid = uuidv4();
    },

    beforeUpdate(event) {
        if (!event.params.data.uid) event.params.data.uid = uuidv4();
    },
};