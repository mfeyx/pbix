'use strict';
const path = require('path');
const utils = require('../utils');

/** @typedef {import('../types').LayoutFile } LayoutFile */
/** @typedef {import('../types').PbixMetaData } PbixMetaData */

/** @type {Object< string, string[] >} */
const contentMap = {
  version:       ['Version'],
  layout:        ['Report', 'Layout'],
  metadata:      ['Metadata'],
  settings:      ['Settings'],
  diagramLayout: ['DiagramLayout'],
  connections:   ['Connections'],
};

const JSON_DATA = Object.keys(contentMap);

/**
 * @class The PBIX-File Class
 * @classdesc Class for handling the pbix-file content
 */
class PBIX {
  /** @param {object} [options] */
  constructor (options) {
    this.options = options || {};

    this.PBIX_FILE = '';
    this.OUT_FOLDER = '.pbix-content';

    this._contentTypes = null;
    this._dataModel = null;
    this._diagramLayout = null;

    this._settings = null;

    /** @type { number | null } */
    this._version = null;

    /** @type { PbixMetaData | null } */
    this._metadata = null;

    this._connections = null;

    this._report = {
      staticResources: {
        registered: {
          json: [],
          images: []
        },
        shared: {}
      },

      /** @type { LayoutFile | null } */
      layout: null,
      linguisticSchema: null,
    };

  }

  /**
   * Read the *.pbix-File
   * @method
   * @async
   * @param { string } fpath
   */
  async readFile (fpath) {
    this.PBIX_FILE = fpath;

    // check if file type is correct
    if (!this.PBIX_FILE.endsWith('.pbix')) {
      throw new TypeError('Input must be a *.pbix file!');
    }

    // try to extract the data
    const isExtracted = await this._handleFile();
    if (isExtracted) {
      for (const content of JSON_DATA ) {
        this._handleContent(content);
      }
      return this;
    }

    // throw or not to throw?
    throw new Error('Could not extract file content');
  }

  /**
   * Handle the different Content Parts of the File
   * @private
   * @param { string } name
   */
  _handleContent (name) {
    const folder = contentMap[name];
    const contentPath =  path.resolve(this.OUT_FOLDER, ...folder);
    try {
      const data = utils.fs.readFileSync(contentPath, { encoding: 'utf16le' });
      // this is somewhat redundant? should change, but how?
      switch(name) {
      case 'metadata':
        this._metadata = utils.deepParseJson(data);
        break;
      case 'layout':
        this._report.layout = utils.deepParseJson(data);
        break;
      case 'settings':
        this._settings = utils.deepParseJson(data);
        break;
      case 'diagramLayout':
        this._diagramLayout = utils.deepParseJson(data);
        break;
      case 'version':
        this._version = utils.deepParseJson(data);
        break;
      case 'connections':
        this._connections = utils.deepParseJson(data);
        break;
      }
    } catch (error) {
      console.error(`Content [${name.toUpperCase()}] not found.`);
    }
    return;
  }

  /**
   * @private
   * @async
   * @returns {Promise<boolean>}
   */
  async _handleFile () {
    try {
      const ZIP_FILE = this.PBIX_FILE.replace('.pbix', '.zip');
      utils.mkdir(this.OUT_FOLDER);
      utils.renameFile(this.PBIX_FILE, ZIP_FILE);
      await utils.extractZipFile(ZIP_FILE, this.OUT_FOLDER);
      utils.rmdir(ZIP_FILE);
      return true;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  }

  /**
   * @private
   * @param {any} obj
   * @returns
   */
  _getter (obj) {
    return Object.assign({}, obj);
  }

  get layout () {
    return this._getter(this._report.layout);
  }

  get metadata () {
    return this._getter(this._metadata);
  }

  get settings () {
    return this._getter(this._settings);
  }

  get diagramLayout () {
    return this._getter(this._diagramLayout);
  }
  get version () {
    return this._getter(this._version);
  }

  get connections () {
    return this._getter(this._connections);
  }
}


module.exports = PBIX;
