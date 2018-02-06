/*
 *  Copyright 2017 Adobe Systems Incorporated. All rights reserved.
 *  This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License. You may obtain a copy
 *  of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software distributed under
 *  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *  OF ANY KIND, either express or implied. See the License for the specific language
 *  governing permissions and limitations under the License.
 *
 */

const t = require('babel-types');
const template = require('babel-template');
const LiftingTransform = require('./LiftingTransform');

const hoistTemplate = template(`this[NAME] = this[NAME] || EXPR;`);
const replaceTemplate = template(`this[NAME]`);

/**
 * Detect attributes that have arrow functions, and lift them to the parent block
 * This ensures that we only create the closure for the event handler once (which is
 * more efficient than having the event handler be recreated on every render).
 */
module.exports = new LiftingTransform(t.isArrowFunctionExpression, hoistTemplate, replaceTemplate);
