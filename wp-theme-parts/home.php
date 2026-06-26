<?php get_header(); ?>

<main id="main" class="jgs-news">
  <div class="jgs-news__mv">
    <picture>
      <source media="(max-width: 768px)" srcset="<?php echo esc_url(get_template_directory_uri() . '/assets/image/sp-mv_news.png'); ?>" />
      <img class="jgs-news__mv-img" src="<?php echo esc_url(get_template_directory_uri() . '/assets/image/mv_news.png'); ?>" width="1920" height="400" decoding="async" alt="お知らせページ メインビジュアル" />
    </picture>
  </div>

  <section class="jgs-news__hero">
    <p class="jgs-news__label-en">NEWS</p>
    <h1 class="jgs-news__title">お知らせ</h1>
  </section>

  <?php
  $news_cat = get_category_by_slug('news');
  $event_cat = get_category_by_slug('event');
  ?>
  <nav class="jgs-news__tabs-wrap" aria-label="お知らせの種類">
    <ul class="jgs-news__tabs">
      <li><a class="jgs-news__tab <?php echo is_home() && !is_category() ? 'jgs-news__tab--current' : ''; ?>" href="<?php echo esc_url(home_url('/news/')); ?>">すべて</a></li>
      <?php if ($news_cat) : ?><li><a class="jgs-news__tab <?php echo is_category('news') ? 'jgs-news__tab--current' : ''; ?>" href="<?php echo esc_url(get_category_link($news_cat)); ?>">お知らせ</a></li><?php endif; ?>
      <?php if ($event_cat) : ?><li><a class="jgs-news__tab <?php echo is_category('event') ? 'jgs-news__tab--current' : ''; ?>" href="<?php echo esc_url(get_category_link($event_cat)); ?>">イベント</a></li><?php endif; ?>
    </ul>
  </nav>

  <div class="jgs-news__list-wrap">
    <?php if (have_posts()) : ?>
      <ul class="jgs-news__list">
        <?php while (have_posts()) : the_post(); ?>
          <?php $cat = get_the_category(); ?>
          <li class="jgs-news__item">
            <article class="jgs-news__article">
              <a class="jgs-news__link" href="<?php the_permalink(); ?>">
                <div class="jgs-news__thumb" aria-hidden="true">
                  <?php if (has_post_thumbnail()) : the_post_thumbnail('medium'); endif; ?>
                </div>
                <div class="jgs-news__body">
                  <div class="jgs-news__meta">
                    <time class="jgs-news__date" datetime="<?php echo esc_attr(get_the_date('c')); ?>"><?php echo esc_html(get_the_date('Y.m.d')); ?></time>
                    <?php if (!empty($cat)) : ?><span class="jgs-news__tag"><?php echo esc_html($cat[0]->name); ?></span><?php endif; ?>
                  </div>
                  <h2 class="jgs-news__item-title"><?php the_title(); ?></h2>
                  <p class="jgs-news__excerpt"><?php echo esc_html(wp_trim_words(get_the_excerpt(), 54, '...')); ?></p>
                </div>
              </a>
            </article>
          </li>
        <?php endwhile; ?>
      </ul>
    <?php else : ?>
      <p class="jgs-news__empty">現在、お知らせはありません。</p>
    <?php endif; ?>
  </div>

  <?php
  $links = paginate_links(array(
    'type' => 'array',
    'prev_text' => 'PREV',
    'next_text' => 'NEXT',
  ));
  if ($links) :
  ?>
    <nav class="jgs-news__pager" aria-label="ページ送り">
      <div class="jgs-news__pager-inner"><?php echo wp_kses_post(implode('', $links)); ?></div>
    </nav>
  <?php endif; ?>
</main>

<?php get_footer(); ?>
