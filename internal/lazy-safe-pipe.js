'use strict';

function lazySafePipe([readable, transform, ...others]) {
  if (!transform) {
    return readable;
  }

  readable.on('error', err => transform.emit('error', err));
  readable.pipe(transform);

  if (others.length) {
    return lazySafePipe([transform, ...others]);
  }
  return transform;
}

export default lazySafePipe;

