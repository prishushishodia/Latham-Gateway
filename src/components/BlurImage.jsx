import React, { useState, useEffect, useRef } from 'react';
import { decode } from 'blurhash';

/** Renders a blurhash string onto a canvas that fills its parent */
function BHCanvas({ hash }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!hash || !ref.current) return;
    const W = 32, H = 32;
    const canvas = ref.current;
    canvas.width = W;
    canvas.height = H;
    try {
      const pixels = decode(hash, W, H);
      const ctx = canvas.getContext('2d');
      const imageData = ctx.createImageData(W, H);
      imageData.data.set(pixels);
      ctx.putImageData(imageData, 0, 0);
    } catch {
      // invalid hash — silently skip
    }
  }, [hash]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}

/**
 * BlurImage
 *
 * A wrapper that shows a blurhash (or Sanity lqip base64) placeholder while
 * the real image loads, then crossfades to the full image.
 *
 * Props:
 *   src          — image URL
 *   alt          — alt text
 *   hash         — blurhash string (for local/static images)
 *   lqip         — base64 data URL from Sanity metadata.lqip (takes priority over hash)
 *   fill         — if true, positions absolutely to fill a `position: relative` parent
 *   className    — applied to the wrapper div (or ignored when fill=true)
 *   imgClassName — extra classes for the <img>
 */
export function BlurImage({
  src,
  alt = '',
  hash,
  lqip,
  fill = false,
  className = '',
  imgClassName = '',
}) {
  const [loaded, setLoaded] = useState(false);

  const wrapperStyle = fill
    ? { position: 'absolute', inset: 0, overflow: 'hidden' }
    : { position: 'relative', overflow: 'hidden' };

  const placeholderStyle = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    transition: 'opacity 0.6s ease',
    opacity: loaded ? 0 : 1,
    pointerEvents: 'none',
    zIndex: 1,
  };

  return (
    <div style={wrapperStyle} className={fill ? '' : className}>
      {/* Placeholder layer */}
      {lqip ? (
        <img
          src={lqip}
          aria-hidden
          alt=""
          style={{
            ...placeholderStyle,
            objectFit: 'cover',
            filter: 'blur(24px)',
            transform: 'scale(1.08)',
          }}
        />
      ) : hash ? (
        <div style={placeholderStyle}>
          <BHCanvas hash={hash} />
        </div>
      ) : null}

      {/* Real image */}
      <img
        src={src}
        alt={alt}
        className={imgClassName}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'opacity 0.6s ease',
          opacity: loaded ? 1 : 0,
          position: 'relative',
          zIndex: 2,
        }}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
