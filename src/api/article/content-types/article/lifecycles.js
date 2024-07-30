const marked = require('marked');
const DOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const renderer = new marked.Renderer();
const window = new JSDOM('').window;
const DOMPurifyInstance = DOMPurify(window);

const generateTableOfContents = (blocks) => {
  const toc = [];
  const regex = /<h([1-6])>(.*?)<\/h\1>/g;

  blocks.forEach(block => {
    if (block.__component === 'shared.rich-text' && block.body) {
      const sanitizedContent = DOMPurifyInstance.sanitize(block.body);
      const htmlContent = marked.parse(sanitizedContent, { renderer });
      let match;

      while ((match = regex.exec(htmlContent)) !== null) {
        toc.push({
          level: match[1],
          text: match[2].replace(/&#39;/g, "'"),
          id: generateId(match[2]),
        });
      }
    }
  });

  return toc;
};

const generateId = (text) => {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
};

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;

    if (data.isHighlight) {
      await strapi.db.query('api::article.article').updateMany({
        where: { isHighlight: true },
        data: { isHighlight: false },
      });
    }

    if (!data.order && data.order !== 0) {
      const maxOrder = await strapi.db.query('api::article.article').findMany({
        orderBy: { order: 'desc' },
        limit: 1,
      });
      data.order = maxOrder.length > 0 ? maxOrder[0].order + 1 : 0;
    } else {
      const existingArticle = await strapi.db.query('api::article.article').findOne({
        where: { order: data.order },
      });

      if (existingArticle) {
        await strapi.db.query('api::article.article').update({
          where: { id: existingArticle.id },
          data: { order: existingArticle.order + 1 },
        });
      }
    }
  },
  async afterCreate(event) {
    const { result } = event;
    if (result.blocks) {
      const updatedToc = generateTableOfContents(result.blocks);
      await strapi.entityService.update('api::article.article', result.id, {
        data: {
          tableOfContents: updatedToc,
        },
      });
    }
  },
  async beforeUpdate(event) {
    const { data, where } = event.params;

    if (data.isHighlight) {
      await strapi.db.query('api::article.article').updateMany({
        where: { isHighlight: true },
        data: { isHighlight: false },
      });
    }

    if (data.blocks) {
      const article = await strapi.entityService.findOne('api::article.article', where.id, {
        populate: {
          blocks: true,
        },
      });
      data.tableOfContents = generateTableOfContents(article.blocks);;
    }

    if (data.order || data.order === 0) {
      const existingArticle = await strapi.db.query('api::article.article').findOne({
        where: { order: data.order },
      });

      if (existingArticle && existingArticle.id !== where.id) {
        await strapi.db.query('api::article.article').update({
          where: { id: existingArticle.id },
          data: { order: existingArticle.order + 1 },
        });
      }
    }
  },
};
