'use strict';

/**
 * by-the-number service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::by-the-number.by-the-number');
