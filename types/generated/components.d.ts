import type { Schema, Attribute } from '@strapi/strapi';

export interface SharedByTheNumberItem extends Schema.Component {
  collectionName: 'components_shared_by_the_number_items';
  info: {
    displayName: 'ByTheNumberItem';
    icon: 'apps';
    description: '';
  };
  attributes: {
    value: Attribute.Integer;
    suffix: Attribute.String;
    title: Attribute.String;
    description: Attribute.String;
  };
}

export interface SharedMedia extends Schema.Component {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Attribute.Media;
  };
}

export interface SharedQuote extends Schema.Component {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    title: Attribute.String;
    body: Attribute.Text;
  };
}

export interface SharedRichText extends Schema.Component {
  collectionName: 'components_shared_rich_texts';
  info: {
    displayName: 'Rich text';
    icon: 'align-justify';
    description: '';
  };
  attributes: {
    body: Attribute.RichText;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    name: 'Seo';
    icon: 'allergies';
    displayName: 'Seo';
    description: '';
  };
  attributes: {
    metaTitle: Attribute.String & Attribute.Required;
    metaDescription: Attribute.Text & Attribute.Required;
    shareImage: Attribute.Media;
  };
}

export interface SharedSlider extends Schema.Component {
  collectionName: 'components_shared_sliders';
  info: {
    displayName: 'Slider';
    icon: 'address-book';
    description: '';
  };
  attributes: {
    files: Attribute.Media;
  };
}

export interface SharedSuccessStoryItem extends Schema.Component {
  collectionName: 'components_shared_success_story_items';
  info: {
    displayName: 'SuccessStoryItem';
    icon: 'apps';
    description: '';
  };
  attributes: {
    content: Attribute.String;
    name: Attribute.String;
    position: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'shared.by-the-number-item': SharedByTheNumberItem;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'shared.success-story-item': SharedSuccessStoryItem;
    }
  }
}
