import React from 'react';
import { connect } from 'react-redux';
import { getCategories } from '~/store/collection/action';
import BlogHero from '~/components/partials/blog/BlogHero';
import HomeSidebar from '~/components/partials/homepage/modules/HomeSidebar';
import CategoryPostItems from '~/components/partials/category/CategoryPostItems';
import Router from 'next/router';
import { toggleDrawer } from '~/store/app/action';
import { getInstagram } from '~/store/media/action';
import ViewAllPosts from '~/components/elements/ViewAllPosts';
import Container from '~/components/layouts/Container';

class BlogWithLeftSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlug: null,
    };
  }

  static async getInitialProps(ctx) {
    return { query: ctx.query };
  }

  componentDidMount() {
    const { query } = this.props;
    const { slug } = this.props.query;

    if (query) {
      if (slug) {
        this.props.dispatch(getCategories([slug]));
      } else {
        Router.push('/page/page-404');
      }
    }

    Router.events.on('routeChangeStart', (url) => {
      const nextSlug = url.split('/').pop();
      const { currentSlug } = this.state;
      this.setState({
        currentSlug: nextSlug,
      });

      if (nextSlug !== '') {
        this.props.dispatch(getCategories([nextSlug]));
      }
    });
    this.props.dispatch(getInstagram(1));
    this.props.dispatch(toggleDrawer(false));
  }

  render() {
    const { query } = this.props;
    const { currentSlug } = this.state;
    return (
      <Container title="Category">
        <main className="ps-page ps-page--blog">
          <BlogHero />
          <div className="container">
            <section className="ps-blog--sidebar">
              <div className="ps-section__left">
                <CategoryPostItems
                  slug={currentSlug === null ? query.slug : currentSlug}
                />
                <ViewAllPosts />
              </div>
              <div className="ps-section__right">
                <HomeSidebar />
              </div>
            </section>
          </div>
        </main>
      </Container>
    );
  }
}

export default connect((state) => state.collection)(BlogWithLeftSidebar);
