function LogoMark({ className = 'h-10 w-10', alt = 'Logo INNOVIA', src, full = false }) {
  const legacyLogo = !src || /^\/(?:techagency|innovia)-logo(?:-mark)?\.svg$/.test(src);
  const image = legacyLogo ? (full ? '/innovia-logo.png' : '/innovia-logo-mark.svg') : src;
  return <img src={image} alt={alt} className={`${className} object-contain`} />;
}

export default LogoMark;
