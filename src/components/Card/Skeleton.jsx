import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={510}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="140" cy="115" r="115" />
    <rect x="0" y="250" rx="5" ry="5" width="280" height="27" />
    <rect x="1" y="290" rx="10" ry="10" width="280" height="88" />
    <rect x="128" y="400" rx="23" ry="23" width="150" height="45" />
    <rect x="0" y="408" rx="5" ry="5" width="90" height="27" />
  </ContentLoader>
);

export default Skeleton;
