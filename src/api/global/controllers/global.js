'use strict';

/**
 *  global controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::global.global', ({ strapi }) => ({
  async find(ctx) {
    ctx.query = {
      ...ctx.query,
      populate: {
        defaultSeo: {
          populate: ['shareImage', 'keywords']
        },
        careersSeo: {
          populate: ['shareImage', 'keywords']
        },
        talentsSeo: {
          populate: ['shareImage', 'keywords']
        },
        blogSeo: {
          populate: ['shareImage', 'keywords']
        },
      },
    };

    const { data, meta } = await super.find(ctx);

    return { data, meta };
  },


}));
