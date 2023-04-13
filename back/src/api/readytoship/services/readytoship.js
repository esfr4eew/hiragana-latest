'use strict';

/**
 * readytoship service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::readytoship.readytoship');
