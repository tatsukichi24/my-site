<?php
/*
Template Name: お問い合わせ
*/
get_header();

$contact_form = get_page_by_title('お問い合わせフォーム', OBJECT, 'wpcf7_contact_form');
?>

<main id="main" class="jgs-contact">
  <div class="jgs-contact__mv">
    <picture>
      <source media="(max-width: 768px)" srcset="<?php echo esc_url(get_template_directory_uri() . '/assets/image/sp-mv_contact.png'); ?>" />
      <img class="jgs-contact__mv-img" src="<?php echo esc_url(get_template_directory_uri() . '/assets/image/mv_contact.png'); ?>" width="1920" height="400" decoding="async" alt="お問い合わせページ メインビジュアル" />
    </picture>
  </div>

  <header class="jgs-contact__hero">
    <p class="jgs-contact__label-en">CONTACT</p>
    <h1 class="jgs-contact__title">お問い合わせ</h1>
  </header>

  <p class="jgs-contact__lead">お問い合わせ ご相談・ご依頼は、こちらのフォームよりお気軽にご連絡ください。</p>

  <div id="jgs-contact-form" class="jgs-form">
    <?php
    if ($contact_form) {
      echo do_shortcode('[contact-form-7 id="' . (int) $contact_form->ID . '" title="お問い合わせフォーム"]');
    }
    ?>
  </div>
</main>

<?php get_footer(); ?>
