import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { UIStore } from '~/store/uistore';

const SearchForm = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState(null);
  const isSearchOpen = UIStore.useState((s) => s.isSearchOpen);

  function handleCloseSearchBox() {
    UIStore.update((s) => ({
      isSearchOpen: false,
    }));
  }

  function handleSubmit(e) {
    UIStore.update((s) => ({
      isSearchOpen: false,
    }));
    router.push(`/search?keyword=${keyword}`);
    e.preventDefault();
  }

  function handleChangeKeyword(e) {
    setKeyword(e.target.value);
  }

  return (
    <div
      className={`ps-search ${isSearchOpen ? 'active' : ''}`}
      id="site-search"
    >
      <a className="ps-btn--close" href="#" onClick={handleCloseSearchBox}></a>
      <div className="ps-search__content">
        <form
          className="ps-form--primary-search"
          method="get"
          onSubmit={handleSubmit}
        >
          <input
            className="form-control"
            name="keyword"
            type="text"
            onChange={handleChangeKeyword}
            placeholder="Search for..."
          />
          <button>
            <i className="icon feather icon-search"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
