<!DOCTYPE html>
<html <?php language_attributes(); ?>>
  <head>
    <meta charset="<?php bloginfo('charset'); ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <?php wp_head(); ?>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500&family=Noto+Serif+JP:wght@500;600&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="<?php echo esc_url(get_stylesheet_uri()); ?>" />
  </head>
  <body <?php body_class(); ?>>
    <?php wp_body_open(); ?>
    <header class="jgs-header">
      <div class="jgs-header__inner">
        <a class="jgs-header__logo" href="<?php echo esc_url(home_url('/')); ?>">
          <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/svg/logo.svg'); ?>" width="231" height="88" decoding="async" alt="<?php bloginfo('name'); ?>" />
        </a>

        <button type="button" class="jgs-header__menu-btn" aria-expanded="false" aria-controls="jgs-header-nav" aria-label="メニューを開く">
          <span class="jgs-header__menu-icon" aria-hidden="true"></span>
        </button>

        <nav id="jgs-header-nav" class="jgs-header__nav" aria-label="主要ナビゲーション">
          <ul class="jgs-header__list">
            <li class="jgs-header__item"><a class="jgs-header__link" href="<?php echo esc_url(home_url('/')); ?>">トップ</a></li>
            <li class="jgs-header__item"><a class="jgs-header__link" href="<?php echo esc_url(home_url('/products/jewelry/')); ?>">取扱商品</a></li>
            <li class="jgs-header__item"><a class="jgs-header__link" href="<?php echo esc_url(home_url('/services/sales/')); ?>">サービス内容</a></li>
            <li class="jgs-header__item"><a class="jgs-header__link" href="<?php echo esc_url(home_url('/shop-list/')); ?>">店舗紹介</a></li>
            <li class="jgs-header__item"><a class="jgs-header__link" href="<?php echo esc_url(home_url('/news/')); ?>">お知らせ</a></li>
            <li class="jgs-header__item"><a class="jgs-header__link" href="<?php echo esc_url(home_url('/company/')); ?>">会社情報</a></li>
          </ul>
        </nav>

        <div class="jgs-header__recruit-wrap">
          <a class="jgs-header__recruit" href="<?php echo esc_url(home_url('/recruit/')); ?>">
            <picture>
              <source media="(max-width: 1024px)" srcset="<?php echo esc_url(get_template_directory_uri() . '/assets/svg/sp_recruit_btn.svg'); ?>" />
              <img class="jgs-header__recruit-img" src="<?php echo esc_url(get_template_directory_uri() . '/assets/svg/recruit_btn.svg'); ?>" width="190" height="190" decoding="async" alt="採用情報" />
            </picture>
          </a>
        </div>
      </div>
    </header>

