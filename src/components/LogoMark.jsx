function LogoMark({ className = 'h-10 w-10', alt = 'Logo TechAgency', src }) {
  return <img src={src || '/techagency-logo-mark.svg'} alt={alt} className={className} />;
}

export default LogoMark;
