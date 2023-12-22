import React from 'react';
import SocialLinks from '~/components/elements/SocialLinks';
import WidgetFooterCategories from '~/components/elements/widgets/WidgetFooterCategories';
import WidgetFooterAboutSite from '~/components/elements/widgets/WidgetFooterAboutSite';
import WidgetFooterAddress from '~/components/elements/widgets/WidgetFooterAddress';
import WidgetFooterQuickLink from '~/components/elements/widgets/WidgetFooterQuickLink';

const FooterSecond = ({ classes }) => {
  return (
    <footer className={`ps-footer ps-footer--second ${classes && classes}`}>
      <div className="ps-footer__top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-12">
              <WidgetFooterAboutSite dark={true} />
            </div>
            <div className="col-lg-3 col-6">
              <WidgetFooterQuickLink />
            </div>
            {/* <div className="col-lg-3 col-6">
              <WidgetFooterCategories />
            </div>
            <div className="col-lg-3 col-md-12">
              <WidgetFooterAddress />
            </div> */}
          </div>
        </div>
      </div>
      <div className="ps-footer__bottom">
        <div className="container">
          <div className="ps-footer__copyright text-center">
            <p>
              &copy; 2021 Copyright <a href="https://spotlit.com">Spotlit</a>.
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSecond;
