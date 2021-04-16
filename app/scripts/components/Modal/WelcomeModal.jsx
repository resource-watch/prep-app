import React, { useCallback, useState } from 'react';
import Modal from './Modal';
import Button from '../Button/Button';

const WelcomeModal = () => {
  const opened = localStorage.getItem('modalWelcomeOpened') === 'true'
    && location.pathname.indexOf('embed') === -1; // also, don't show modals on embed

  const [isModalOpened, setModalOpened] = useState(opened);

  const handleClose = useCallback(() => {
    localStorage.setItem('modalWelcomeOpened', 'true');
    setModalOpened(true);
  }, []);

  const handleToExplore = useCallback(() => {
    localStorage.setItem('modalWelcomeOpened', 'true');
    setModalOpened(true);
    window.location.href = '/explore';
  }, []);

  const handleToHowTo = useCallback(() => {
    localStorage.setItem('modalWelcomeOpened', 'true');
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
        <div className="m-content">
          <article>
            <h2>Welcome to PREPdata</h2>
            <p>We are continuing to add data and functionality to PREPdata. We welcome feedback on the platform&apos;s content and navigation and welcome suggestions for other features you would like to see. Have a suggestion? Send us a message at info@prepdata.org.</p>
            <p className="-small"><strong>DISCLAIMER:</strong> YOU AGREE THAT YOUR USE OF THE SITE AND ITS CONTENT IS AT YOUR SOLE RISK. WE MAKE NO PROMISES OR COMMITMENTS ABOUT THE SITE OR ITS CONTENT, AND THE SITE AND CONTENT ARE PROVIDED ON AN “AS IS” BASIS AND WITHOUT WARRANTIES OR REPRESENTATIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, STATUTORY, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.</p>
          </article>
          <aside>
            <div className="small-12 align-center" style={{ display: 'flex' }}>
              <Button click={handleToExplore} className="c-new-button">Continue</Button>
              <Button click={handleToHowTo} className="c-new-button -transparent">How to use PREPDATA</Button>
            </div>
          </aside>
        </div>
      </div>
    </Modal>
  );
};

export default WelcomeModal;
