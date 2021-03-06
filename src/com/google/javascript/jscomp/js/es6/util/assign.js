/*
 * Copyright 2018 The Closure Compiler Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview
 * @suppress {uselessCode}
 */
'require util/owns';

/**
 * Equivalent to the Object.assign() method, but guaranteed to be available for use in code
 * generated by the compiler.
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 *
 * Copies values of all enumerable own properties from one or more
 * sources to the given target object, and returns the target.
 *
 * @final
 * @param {!Object} target The target object onto which to copy.
 * @param {...?Object} var_args The source objects.
 * @return {!Object} The target object is returned.
 */
$jscomp.assign = (typeof Object.assign == 'function') ?
    Object.assign :
    /**
     * @param {!Object} target
     * @param {...?Object} var_args
     * @return {!Object}
     * @suppress {reportUnknownTypes}
     */
    function(target, var_args) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        if (!source) continue;
        for (var key in source) {
          if ($jscomp.owns(source, key)) target[key] = source[key];
        }
      }
      return target;
    };
