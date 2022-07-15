import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <div className="pizza-block-wrapper">
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={468}
        viewBox="0 0 280 468"
        backgroundColor="#d6d6d6"
        foregroundColor="#d6d6d6"
        >
        <circle cx="141" cy="122" r="123" /> 
        <rect x="0" y="311" rx="10" ry="10" width="280" height="88" /> 
        <rect x="0" y="265" rx="10" ry="10" width="280" height="27" /> 
        <rect x="0" y="430" rx="10" ry="10" width="90" height="27" /> 
        <rect x="150" y="423" rx="25" ry="25" width="130" height="44" />
      </ContentLoader>
  </div>     
)

export default Skeleton;
