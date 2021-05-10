import React, { useCallback, useState } from 'react';
import Modal from './Modal';
import Button from '../Button/Button';
import ToggleHelp from 'components/toggle-help';

export const LOCAL_STORAGE_KEY = 'modalWelcomeOpened';

const WelcomeModal = () => {
  const opened = localStorage.getItem(LOCAL_STORAGE_KEY) === 'true';

  if (location.pathname.indexOf('embed') > 0) return null; // also, don't show modals on embed

  const [isModalOpened, setModalOpened] = useState(opened);

  const handleClose = useCallback(() => {
    setModalOpened(true);
  }, []);

  const handleToExplore = useCallback(() => {
    setModalOpened(true);
    window.location.href = '/explore';
  }, []);

  const handleToHowTo = useCallback(() => {
    setModalOpened(true);
    window.location.href = '/how-to';
  }, []);

  // don't show modal when user already click on it
  if (isModalOpened) return null;

  return (
    <Modal
      opened
      close={handleClose}
      hideCloseButton
    >
      <div className="content">
        <article>
          <div className="row">
            <div className="column small-12">
              <h2>Welcome to Partnership<br /> for Resilience &amp; Preparedness</h2>
            </div>
            <div className="column small-12 medium-6">
              <p>We are continuing to add data and functionality to PREPdata. We welcome feedback on the platform&apos;s content and navigation and welcome suggestions for other features you would like to see. Have a suggestion? Send us a message at info@prepdata.org.</p>
              <p className="-small"><strong>DISCLAIMER:</strong> YOU AGREE THAT YOUR USE OF THE SITE AND ITS CONTENT IS AT YOUR SOLE RISK. WE MAKE NO PROMISES OR COMMITMENTS ABOUT THE SITE OR ITS CONTENT, AND THE SITE AND CONTENT ARE PROVIDED ON AN “AS IS” BASIS AND WITHOUT WARRANTIES OR REPRESENTATIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, STATUTORY, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.</p>
            </div>
            <div className="column small-12 medium-6">
              <iframe
                width="400"
                height="260"
                src="https://www.youtube.com/embed/AJzz9-76Bgk"
                title="Introduction to PREP DATA"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          <ToggleHelp keys={[LOCAL_STORAGE_KEY]} customText="Show this modal next time" />
        </article>
        <aside>
          <div className="small-12 align-center" style={{ display: 'flex' }}>
            <Button click={handleToExplore} className="c-new-button">Continue to Site</Button>
            <Button click={handleToHowTo} className="c-new-button -transparent">How to use PREPDATA</Button>
          </div>
        </aside>
      </div>
    </Modal>
  );
};

export default WelcomeModal;
