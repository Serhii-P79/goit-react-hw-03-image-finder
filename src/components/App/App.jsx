import { Component } from 'react';
import { Button, Searchbar, Modal, ImageGallery } from 'components';
import { getPhoto } from 'services/PixabayApi';
import { searchObject } from 'constants/var';
import './App.scss';

export class App extends Component {
  state = {
    images: [],
    showModal: false,
    searchQuery: '',
    imgUrl: '',
    page: 1,
  };

  async componentDidMount() {
    // const data = await getPhoto(searchObject);
    // console.log(data);
    // this.setState({ images: [...data.hits] });
    // console.log('componentDidMount');
  }

  async componentDidUpdate(nextProps, nextState) {
    // console.log('componentDidUpdate');
    // console.log(nextState.searchQuery === this.state.searchQuery);

    if (nextState.searchQuery !== this.state.searchQuery) {
      searchObject.searchPhrase = this.state.searchQuery;
      searchObject.safesearch = false;
      const data = await getPhoto(searchObject);
      this.setState({ images: [...data.hits] });
      // console.log('ssss');
    }

    if (nextState.page !== this.state.page) {
      searchObject.page = this.state.page;
      // console.log('новый лист');
      const data = await getPhoto(searchObject);
      this.setState(prevST => {
        return this.state.page === 1
          ? { images: [...data.hits] }
          : { images: [...prevST.images, ...data.hits] };
      });
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

  updSearchQuery = e => {
    e.preventDefault();
    // console.log(e);
    // console.log(e.target.elements.searchQuery.value);
    // searchObject.defOpt();
    //searchObject.page = 1;
    this.setState({
      searchQuery: e.target.elements.searchQuery.value,
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
    const { showModal, images, imgUrl } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.updSearchQuery} />
        <ImageGallery images={images} onClick={this.imgWindowModal} />
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
