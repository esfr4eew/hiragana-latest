'use strict';

/**
 * moneyback service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::moneyback.moneyback');
