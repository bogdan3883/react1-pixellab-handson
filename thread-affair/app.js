class NewsletterForm extends React.Component {
  state = {
    email: '',
    formMessage: '',
    busy: false,
    successMessage: '',
  };

  validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  }

  // event handlers need "this"
  onSubmit = (event) => {
    event.preventDefault();
    const email = this.state.email;

    if (!this.validateEmail(email)) {
      this.setState({
        formMessage: 'Please use a valid email',
      });

      return;
    }

    this.setState({
      busy: true,
      formMessage: '',
    });

    setTimeout(() => {
      this.setState({
        busy: false,
        email: '',
        formMessage: '',
        successMessage: `emailul ${email} a fost inscris!`,
      });
    }, 3000);

    const message = `emailul ${email} a fost inscris!`;
    this.setState({
      email: '',
      formMessage: message,
    });
  };

  //controlled component
  onInputChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  //render runs everytime state changes
  render() {
    const isSubmitted = this.state.successMessage.trim().length > 0;
    // render must return JSX
    return (
      <form className="form-newsletter container" onSubmit={this.onSubmit}>
        <label htmlFor="field-newsletter">
          Subscribe to our <span>newsletter</span>
        </label>
        <input
          type="text"
          name="field-newsletter"
          id="field-newsletter"
          placeholder="enter your email address to receive the latest news!"
          onChange={this.onInputChange}
        ></input>

        {this.state.email}
        <button title="Subscribe" type="submit" disabled={this.state.busy}>
          {this.state.busy ? '...loading' : 'Submit'}
        </button>

        <div className="form-message">{this.state.formMessage}</div>
      </form>
    );
  }
}

const newsletterContainer = document.querySelector('.home-newsletter');
// React recipe?

ReactDOM.render(<NewsletterForm></NewsletterForm>, newsletterContainer);

class AddToCartButton extends React.Component {
  state = {
    added: false,
  };
  // all components require a render
  render() {
    //render MUST return jsx
    return (
      <button className="product-a2c">
        {this.state.added === true ? 'Remove from Cart' : 'Add to Cart'}
      </button>
    );
  }
}

const productTileControls = document.querySelectorAll('.product-tile-controls');
productTileControls.forEach((productTileControls) => {
  ReactDOM.render(<AddToCartButton></AddToCartButton>, productTileControls);
});
