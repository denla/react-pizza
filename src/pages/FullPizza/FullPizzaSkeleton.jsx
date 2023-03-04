import React from 'react';
import ContentLoader from 'react-content-loader';

const FullPizzaSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={1260}
    height={455}
    viewBox="0 0 1260 455"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="225" cy="225" r="175" />
    <rect x="450" y="90" rx="5" ry="5" width="280" height="27" />
    <rect x="1080" y="227" rx="23" ry="23" width="150" height="45" />
    <rect x="450" y="237" rx="5" ry="5" width="90" height="27" />
  </ContentLoader>
);

export default FullPizzaSkeleton;
