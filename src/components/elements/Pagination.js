import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Pagination = ({ pagesCount }) => {
  const { query, pathname } = useRouter();
  const page = Number(query.page || 1);

  return (
    <ul className="ps-pagination">
      {page > 1 ? (
        <li className="ps-pagination__prev">
          <Link href={`${pathname}?page=${Math.max(1, page - 1)}`} passHref>
            <a>
              <i className="feather icon icon-chevron-left"></i>
            </a>
          </Link>
        </li>
      ) : (
        ''
      )}
      {Array.from(new Array(Math.min(pagesCount - page, 9))).map((nil, i) =>
        true ? (
          <li key={i} className={i === 0 ? 'active' : ''}>
            <Link href={`${pathname}?page=${i + page}`} passHref>
              <a>
                <span>{`${i + page}`}</span>
              </a>
            </Link>
          </li>
        ) : (
          ''
        )
      )}
      {pagesCount > page + 8 ? (
        <li className="ps-pagination__next">
          <Link
            href={`${pathname}?page=${Math.min(pagesCount, page + 9)}`}
            passHref
          >
            <a>
              <i className="feather icon icon-chevron-right"></i>
            </a>
          </Link>
        </li>
      ) : (
        ''
      )}
    </ul>
  );
};

export default Pagination;
