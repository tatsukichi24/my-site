<?php get_header(); ?>

<main id="main" class="jgs-news">
  <section class="jgs-news__hero">
    <p class="jgs-news__label-en">NEWS</p>
    <h1 class="jgs-news__title">お知らせ</h1>
  </section>

  <?php while (have_posts()) : the_post(); ?>
    <?php $cat = get_the_category(); ?>
    <div class="jgs-news-single__shell">
      <div class="jgs-news-single__grid">
        <article class="jgs-news-single__article">
          <header class="jgs-news-single__header">
            <div class="jgs-news-single__meta">
              <time class="jgs-news-single__date" datetime="<?php echo esc_attr(get_the_date('c')); ?>"><?php echo esc_html(get_the_date('Y.m.d')); ?></time>
              <?php if (!empty($cat)) : ?><span class="jgs-news-single__cat"><?php echo esc_html($cat[0]->name); ?></span><?php endif; ?>
            </div>
            <h2 class="jgs-news-single__title"><?php the_title(); ?></h2>
          </header>

          <?php if (has_post_thumbnail()) : ?>
            <figure class="jgs-news-single__media"><?php the_post_thumbnail('large'); ?></figure>
          <?php endif; ?>

          <div class="jgs-news-single__body entry-content">
            <?php the_content(); ?>
          </div>
        </article>

        <aside class="jgs-news-single__aside" aria-label="関連のお知らせ">
          <section class="jgs-news-single__widget">
            <h2 class="jgs-news-single__widget-title">最近の投稿</h2>
            <ul class="jgs-news-single__widget-list">
              <?php
              $recent_posts = new WP_Query(array('post_type' => 'post', 'posts_per_page' => 3, 'post__not_in' => array(get_the_ID())));
              while ($recent_posts->have_posts()) :
                $recent_posts->the_post();
                $recent_cat = get_the_category();
              ?>
                <li class="jgs-news-single__mini">
                  <a class="jgs-news-single__mini-link" href="<?php the_permalink(); ?>">
                    <div class="jgs-news-single__mini-body">
                      <div class="jgs-news-single__mini-meta">
                        <time datetime="<?php echo esc_attr(get_the_date('c')); ?>"><?php echo esc_html(get_the_date('Y.m.d')); ?></time>
                        <?php if (!empty($recent_cat)) : ?><span class="jgs-news-single__mini-tag"><?php echo esc_html($recent_cat[0]->name); ?></span><?php endif; ?>
                      </div>
                      <p class="jgs-news-single__mini-title"><?php the_title(); ?></p>
                    </div>
                  </a>
                </li>
              <?php endwhile; wp_reset_postdata(); ?>
            </ul>
          </section>
        </aside>
      </div>
    </div>
  <?php endwhile; ?>
</main>

<?php get_footer(); ?>

