import Script from 'next/script';

export default function AnalyticsScript() {
  const GA_ID = 'G-6Z9GSHKPDC';
  return (
    <>
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${GA_ID}', {
                        custom_map: {
                          dimension1: 'user_id',
                          dimension2: 'coupon_ids',
                          dimension3: 'format_id',
                          dimension4: 'category_id',
                          dimension5: 'format_category_id',
                          dimension6: 'course_ids',
                          dimension7: 'origin_course_ids',
                          dimension8: 'banner_id',
                          dimension9: 'curation_id',
                          dimension10: 'hashtag',
                          dimension11: 'customer_id',
                          dimension12: 'slug',
                          dimension13: 'edu_pid',
                          dimension14: 'edu_pagetype',
                          dimension15: 'edu_totalvalue',
                        },
                      });
                    `,
        }}
      />
    </>
  );
}
