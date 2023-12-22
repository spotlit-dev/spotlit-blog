import React from 'react';
import { format, parseISO } from 'date-fns';
import { enUS, fr } from 'date-fns/locale';
import { useTranslations } from 'use-intl';
import { useRouter } from 'next/router';

const ModuleArticleCommentListing = ({ comments, title = 'comment' }) => {
  const t = useTranslations('ModuleArticleCommentListing');
  const { locale } = useRouter();
  console.log({ locale });

  return (
    <div className="ps-post-comments">
      <div className="ps-section__header">
        <h3>{t(title, { nbComment: comments.length })}</h3>
      </div>
      <div className="ps-section__content">
        {comments.map((item) => (
          <div className="ps-block--comment" key={item._id}>
            <div className="ps-block__thumbnail">
              <img
                src={
                  item.user.coverPicture
                    ? `//${item.user.coverPicture}`
                    : '/static/img/user/user.svg'
                }
                width="70"
                height="70"
                alt={item.user.name}
              />
            </div>
            <div className="ps-block__content">
              <h5>
                {item.user.name}
                <small>
                  {format(parseISO(item.createdAt), 'PP', { locale })}
                </small>
                {item.rate != null && (
                  <small>
                    {Array.from(new Array(item.rate)).map((nil, j) => (
                      <i key={j} className="feather icon icon-star"></i>
                    ))}
                  </small>
                )}
              </h5>
              <p>{item.content || <i>{t('no comment left')}</i>}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModuleArticleCommentListing;
