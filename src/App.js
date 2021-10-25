import React, { useState, useEffect } from 'react';
import fetchImages from './services/api';
import Searchbar from './components/Searchbar/Searchbar';
import Loader from './components/Loader/Loader';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import styles from './App.module.css';

export default function App() {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState('');

  useEffect(() => {
    if (searchValue === '') {
      return;
    }
    fetchImages(searchValue, page)
      .then(data => {
        setImages(data);
        setPage(page);
      })
      .catch(err => console.log('Error:', err));
  }, [searchValue, page]);

  const loadMore = () => {
    setLoading(true);
    fetchImages(searchValue, page)
      .then(data => {
        setImages([...images, ...data]);
        setPage(page + 1);
        scrollWindow();
      })
      .finally(setLoading(false));
  };

  const handleSubmit = searchString => {
    setSearchValue(searchString);
  };

  const scrollWindow = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const onImgClick = e => {
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    setModalImg(e.target.dataset.img);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={handleSubmit} />
      {images && <ImageGallery images={images} onClick={onImgClick} />}
      {loading && <Loader />}
      {images && <Button onClick={loadMore} />}

      {showModal && (
        <Modal onCloseModal={toggleModal}>
          <img src={modalImg} alt="largeImg" />
        </Modal>
      )}
    </div>
  );
}
