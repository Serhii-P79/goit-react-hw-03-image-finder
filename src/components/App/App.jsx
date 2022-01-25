import { Component } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { Button, Searchbar, Modal, ImageGallery, Loader } from 'components';
import { getPhoto } from 'services/PixabayApi';
import { searchObject, Status } from 'constants/var';
import './App.scss';

export class App extends Component {
  state = {
    images: [],
    showModal: false,
    searchQuery: '',
    imgUrl: '',
    page: 1,
    status: Status.IDLE,
  };

  async componentDidUpdate(nextProps, nextState) {
    // console.log('componentDidUpdate');
    // console.log(nextState.searchQuery === this.state.searchQuery);

    if (nextState.searchQuery !== this.state.searchQuery) {
      this.setState({ status: Status.PENDING });
      searchObject.searchPhrase = this.state.searchQuery;
      searchObject.safesearch = true;

      try {
        const data = await getPhoto(searchObject);
        //console.log(data);
        this.setState({
          images: [
            ...data.hits.map(({ id, webformatURL, largeImageURL }) => ({
              id,
              webformatURL,
              largeImageURL,
            })),
          ],
        });
        this.setState({ status: Status.RESOLVE });
      } catch (eror) {
        this.setState({ status: Status.REJECTED });
      }
      // console.log('ssss');
    }

    if (nextState.page !== this.state.page) {
      this.setState({ status: Status.PENDINGD });
      searchObject.page = this.state.page;
      // console.log('новый лист');

      try {
        const data = await getPhoto(searchObject);
        this.setState(prevST => {
          return this.state.page === 1
            ? {
                images: [
                  ...data.hits.map(({ id, webformatURL, largeImageURL }) => ({
                    id,
                    webformatURL,
                    largeImageURL,
                  })),
                ],
              }
            : {
                images: [
                  ...prevST.images,
                  ...data.hits.map(({ id, webformatURL, largeImageURL }) => ({
                    id,
                    webformatURL,
                    largeImageURL,
                  })),
                ],
              };
        });
        this.setState({ status: Status.RESOLVE }, () => {
          scroll.scrollToBottom();
        });
      } catch (error) {
        this.setState({ status: Status.REJECTED });
      }
      // console.log('вввв');
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  imgWindowModal = imgUrl => {
    // console.log(imgUrl);
    this.setState({ imgUrl }, () => {
      this.toggleModal();
    });
  };

  updSearchQuery = (e, searchQuery) => {
    e.preventDefault();
    // console.log(e);
    // console.log(searchQuery);
    // console.log(e.target.elements.searchQuery.value);
    // searchObject.defOpt();
    //searchObject.page = 1;
    this.setState({
      searchQuery,
      page: 1,
    });
  };

  nextPageRequest = () => {
    this.setState(prevST => {
      //   console.log(prevST);
      return { page: prevST.page + 1 };
    });
  };

  render() {
    const { showModal, images, imgUrl, status } = this.state;

    // if (status === Status.IDLE) {
    //   return <div>Введите строку поиска</div>;
    // }
    // if (status === Status.PENDING) {
    //   return <Loader />;
    // }
    // if (status === Status.RESOLVE) {
    //   return <ImageGallery images={images} onClick={this.imgWindowModal} />;
    // }

    // if (status === Status.REJECTED) {
    //   return <div>Что то пошло не так!!!</div>;
    // }

    return (
      <div className="App">
        <Searchbar onSubmit={this.updSearchQuery} />
        {/* {status === Status.IDLE && <div>Введите строку поиска</div>} */}
        {(status === Status.PENDING || status === Status.PENDINGD) && (
          <Modal onClose={() => {}}>
            <Loader />
          </Modal>
        )}
        {(status === Status.RESOLVE || status === Status.PENDINGD) && (
          <ImageGallery images={images} onClick={this.imgWindowModal} />
        )}
        {images.length !== 0 && <Button onClick={this.nextPageRequest} />}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={imgUrl} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}
