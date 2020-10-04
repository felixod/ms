/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|милисекунды?|милисекунд?|милисекунда?|msecs?|милисек?|ms|мс|seconds?|secs?|секунд?|секунды?|секунда?|сек?|s|с|minutes?|mins?|мин?|минуты?|минута?|минут?|m|м|hours?|hrs?|часов?|часа?|час?|h|ч|days?|дня?|день?|дней?|d|д|недели?|неделя?|недель?|weeks?|w|н|years?|yrs?|года?|лет?|г|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'года':
    case 'лет':
    case 'year':
    case 'год':
    case 'yrs':
    case 'yr':
    case 'y':
    case 'г':
      return n * y;
    case 'weeks':
    case 'недель':
    case 'недели':
    case 'week':
    case 'неделя':
    case 'w':
    case 'н':
      return n * w;
    case 'days':
    case 'дней':
    case 'дня':
    case 'day':
    case 'день':
    case 'd':
    case 'д':
      return n * d;
    case 'hours':
    case 'часов':
    case 'hour':
    case 'hrs':
    case 'часа':
    case 'hr':
    case 'час':
    case 'h':
    case 'ч':
      return n * h;
    case 'minutes':
    case 'минуты':
    case 'minute':
    case 'минута':
    case 'mins':
    case 'минут':
    case 'min':
    case 'мин':
    case 'm':
    case 'м':
      return n * m;
    case 'seconds':
    case 'секунд':
    case 'second':
    case 'секунда':
    case 'secs':
    case 'секунды':
    case 'sec':
    case 'сек':
    case 's':
    case 'с':
      return n * s;
    case 'milliseconds':
    case 'милисекунды':
    case 'милисекунд':
    case 'millisecond':
    case 'милисекунда':
    case 'msecs':
    case 'msec':
    case 'мсек':
    case 'ms':
    case 'мс':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}
