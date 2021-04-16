import React, { useCallback, useState } from 'react';
import Modal from './Modal';
import Button from '../Button/Button';

const LOCAL_STORAGE_KEY = 'modalDiscoverDataOpened';

const DiscoverDataModal = () => {
  const opened = localStorage.getItem(LOCAL_STORAGE_KEY) === 'true'
    && location.pathname.indexOf('embed') === -1; // also, don't show modals on embed

  const [isModalOpened, setModalOpened] = useState(opened);

  const handleClose = useCallback(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
    setModalOpened(true);
  }, []);

  const handleToHowTo = useCallback(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
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
              <h2>Discover Data</h2>
            </div>
            <div className="column small-12 medium-6">
              <p>Search for climate, physical, and socioeconomic data. Create and share beautiful map visualizations and overlays, etc.</p>
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
        </article>
        <aside>
          <div className="small-12 align-center" style={{ display: 'flex' }}>
            <Button click={handleClose} className="c-new-button">Continue</Button>
            <Button click={handleToHowTo} className="c-new-button -transparent">Learn more</Button>
          </div>
        </aside>
      </div>
    </Modal>
  );
};

export default DiscoverDataModal;
