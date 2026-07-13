export function SiteLoader() {
  return (
    <div className="site-loader" aria-hidden="true">
      <div className="site-loader__box">
        <div className="site-loader__frame">
          <div className="site-loader__rings" />
          <div className="site-loader__line" />
          <div className="site-loader__dots">
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="site-loader__label">
          <span>CodePilot</span>
          <span>Initializing intelligence layer</span>
        </div>
      </div>
    </div>
  );
}