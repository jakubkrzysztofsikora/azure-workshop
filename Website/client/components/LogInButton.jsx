import React from 'react';
const createReactClass = require('create-react-class');
import { Modal, Button } from 'react-bootstrap';
import Cookies from 'js-cookie'



const loginModal = createReactClass({
  getInitialState() {
    let url = Cookies.get('url');
    const token = Cookies.get('token');
    url = url || 'https://ksikora.search.windows.net/indexes/azuresql-index/docs?api-version=2016-09-01&search=*'
    const getD = this.props.getData
    return { url, token, getD, showModal: false };
  },

  close() {

    this.setState({ showModal: false });
  },
  save() {
    this.setState({ showModal: false });
    Cookies.set('url', this.state.url, { expires: 1 });
    Cookies.set('token', this.state.token, { expires: 1 });
    this.state.getD()
  },
  open() {
    this.setState({ showModal: true });
  },
  handleChange1(e) {
    this.setState({ url: e.target.value });
  },
  handleChange2(e) {
    this.setState({ token: e.target.value });
  },
  render() {
    return (
      <div>
        <Button bsStyle="info" onClick={this.open}>
          Change Token
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Insert Coin</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div>Url</div>
              <input type="text" value={this.state.url} id="url" className="form-control" onChange={this.handleChange1}/>
            </div>
            <div>
              <div>Token</div>
              <input type="text" value={this.state.token} id="url" className="form-control" onChange={this.handleChange2}/>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
            <Button bsStyle="primary" onClick={this.save}>Save changes</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

export default loginModal;
