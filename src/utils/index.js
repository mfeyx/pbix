'use strict';
const fs = require('fs');
const unzip = require('unzipper');

/* -------------------------------------------------------------------------- */
/*                            LOGGING AND DEBUGGING                           */
/* -------------------------------------------------------------------------- */

/**
 * Helper for console.dir()
 * @param { any } name Name for the Sections
 * @param { any } [data] Input that will be printed
 * @param { number } [n] Depth of Logging
 */
const print = (name, data, n=1) => {
  const width = 60;
  const char = '=';
  const divider = (name = '') => {
    const nameLen = name.length;
    const chars = new Array(width - nameLen - 1).fill(char).join('');
    name = `${name} ${chars}`.trim().toUpperCase();
    console.log('\n' + name + '\n');
  };
  divider(name);
  if (data !== undefined || data !== null) {
    console.dir(data, { depth: n });
  }
};

/* -------------------------------------------------------------------------- */
/*                       WORKING WITH FILES AND FOLDERS                       */
/* -------------------------------------------------------------------------- */

/**
 * Extract ZIP Files
 * @param { string } zipFile The zip file to unpack
 * @param { string } destination The folder to unpack in
 * @param { number } [concurrency=5]
 * @returns {Promise<any>}
 */
async function extractZipFile (zipFile, destination, concurrency=5) {
  return new Promise((resolve, reject) => {
    try {
      return resolve(unzip.Open.file(zipFile).then(d => d.extract({ path: destination, concurrency })));
    } catch (error) {
      return reject(error);
    }
  });
}

/**
 * Make a directory
 * @param { string } fpath
 */
function mkdir (fpath) {
  if (fs.existsSync(fpath)) {
    fs.rmdirSync(fpath, { recursive: true });
  }
  fs.mkdirSync(fpath);
}

/**
 * Make a directory
 * @param { string } fpath
 */
function rmdir (fpath) {
  if (fs.existsSync(fpath)) {
    fs.rmdirSync(fpath, { recursive: true });
  }
}

/**
 * Rename a File
 * @param { string } before File name before
 * @param { string } after File name after
 * @param { boolean } [silent=true] File name after
 * @param { boolean } [replace=false] File name after
 */
function renameFile (before, after, silent=true, replace=false) {
  try {
    if (replace) {
      fs.renameSync(before, after);
    } else {
      fs.copyFileSync(before, after);
    }
  } catch (err) {
    if (!silent) {
      console.error(err.message);
    }
  }
}

/* -------------------------------------------------------------------------- */
/*                               IDENTITY CHECKS                              */
/* -------------------------------------------------------------------------- */

/**
   *
   * @param {any} obj
   * @returns
   */
function proto (obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

/**
   * Check if obj is an Array.
   * @param {any} obj
   * @returns {boolean}
   */
function isArray (obj) {
  return proto(obj) === 'array';
}

/**
   * Check if obj is an Array.
   * @param {any} obj
   * @returns {boolean}
   */
function isObject (obj) {
  return proto(obj) === 'object';
}

/**
   * Check if obj is an Array.
   * @param {any} obj
   * @returns {boolean}
   */
function isString (obj) {
  return proto(obj) === 'string';
}

/**
   * Check if obj is an Array.
   * @param {any} obj
   * @returns {boolean}
   */
function isNumber (obj) {
  return proto(obj) === 'number';
}

/**
   * Check if obj is an Array.
   * @param {any} obj
   * @returns {boolean}
   */
function isBoolean (obj) {
  return proto(obj) === 'boolean';
}

/**
   * Check if obj is an Array.
   * @param {any} obj
   * @returns {boolean}
   */
function isNull (obj) {
  return proto(obj) === 'null';
}

/**
   * Checks if a string is can be parsed by JSON or not
   * @param {string} obj
   * @returns
   */
function isStringifiedObject (obj) {
  if (typeof obj === 'string') {
    try {
      return !!JSON.parse(obj);
    } catch (_) {
      return false;
    }
  }
  return false;
}

/**
   * Check if the `obj` is nested or not
   * @param {any} obj Value to test
   * @returns {boolean}
   */
function isNestedObject (obj) {
  return isStringifiedObject(obj) || isArray(obj);
}

/* -------------------------------------------------------------------------- */
/*                                JSON PARSING                                */
/* -------------------------------------------------------------------------- */

/**
 *
 * @param {any} obj
 * @returns
 */
function safeParse (obj) {
  try {
    return JSON.parse(obj);
  } catch (_) {
    return obj;
  }
}

/**
 * Parse deeply nested JSON
 * @param  { any } thing
 * @return { any }
 */
function deepParseJson (thing) {
  if (typeof thing === 'string') {
    if (!isNaN(Number(thing))) {
      return thing;
    }
    try {
      return deepParseJson(JSON.parse(thing));
    } catch (_) {
      return thing;
    }
  } else if (Array.isArray(thing)) {
    return thing.map(val => deepParseJson(val));
  } else if (typeof thing === 'object' && thing !== null) {
    return Object.keys(thing).reduce((/** @type {Object<string, any>}*/obj, key) => {
      obj[key] = deepParseJson(thing[key]);
      return obj;
    }, {});
  } else {
    return thing;
  }
}

/* -------------------------------------------------------------------------- */
/*                                STRING UTILS                                */
/* -------------------------------------------------------------------------- */

/**
 * Repeat a given String
 * @param {string} char Character or Text
 * @param {number} [n] Times
 * @returns
 */
function repeatString (char, n=1) {
  return Array(n).fill(char).join('');
}

/* -------------------------------------------------------------------------- */

module.exports = {
  fs,
  extractZipFile,
  mkdir,
  rmdir,
  renameFile,
  print,
  proto,
  isArray,
  isBoolean,
  isObject,
  isString,
  isNumber,
  isNull,
  isStringifiedObject,
  isNestedObject,
  safeParse,
  deepParseJson,
  repeatString,
};
