import React from 'react';
import Article from '../Content/Article';
import { Link } from 'react-router';

class TermsOfService extends React.Component {
  render() {
    return (
      <div className="c-privacy-policy">
        <Article>
          <p>
            World Resources Institute (WRI) respects the privacy rights of our visitors and
            donors and recognizes the importance of protecting the information we collect
            about you. This policy statement tells you how we collect information from you
            and how we use it. WRI only collects personal information from our donors,
            customers and visitors on a voluntary basis and only when:
          </p>

          <ul>
            <li>contributing information for site registration and future updates;</li>
            <li>submitting feedback and comments;</li>
            <li>completing surveys;</li>
            <li>placing orders for materials;</li>
            <li>donating through our websites or mail.</li>
          </ul>

          <p>
            Personal information collected may include your name, your
            organization, email address, phone number, address. We also collect
            specific information about how you found our site and how you might
            use our materials. We do not generally require personal information
            to obtain access to any of our sites. In most cases, we will also ask
            if you would like to receive emails from us and give you the option
            of designating “yes” or “no”.
          </p>

          <p>
            World Resources may also collect demographic information from
            visitors and donors, such as age, gender, geographic location,
            interests. This information helps us to improve our offerings and
            allows us to tailor information to your preferences.
          </p>

          <h3>Data Collection and Sharing</h3>
          <p>
            WRI does not sell, rent, or distribute our customer, donor, or
            visitor lists. We may disclose user information in special cases when
            we have reason to believe that disclosing this information is
            necessary to identify, contact or bring legal action against someone
            who may be causing injury to or interference with (either
            intentionally or unintentionally) WRI’s rights or property, other WRI
            users or anyone else that could be harmed by such activities. At any
            time you can correct, update or remove your personal data by
            contacting <a href="mailto:info@prepdata.org">info@prepdata.org</a> with your request (please include a copy
            of the most recent correspondence from WRI).
          </p>

          <h3>Your Acceptance of These Terms</h3>
          <p>
            By using this site, you signify your assent to the WRI’s Privacy
            Policy. Your continued use of the sites following the posting of
            changes to these terms will mean you accept those changes.
          </p>

        </Article>
      </div>
    );
  }
}

export default TermsOfService;
