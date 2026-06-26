<?php
/*
Template Name: 採用エントリーフォーム
*/
get_header();

$entry_form = get_page_by_title('採用エントリーフォーム', OBJECT, 'wpcf7_contact_form');
?>

<main id="main" class="jgs-entry">
  <div class="jgs-entry__wrap">
    <section class="jgs-entry__hero">
      <p class="jgs-entry__label-en">ENTRY</p>
      <h1 class="jgs-entry__title">エントリーフォーム</h1>
    </section>

    <div class="jgs-entry__shell">
      <div class="jgs-entry__lead">
        <p>以下のフォームよりご応募ください。<br />担当より数日以内にご連絡いたします。</p>
        <p>※ご入力いただいた内容は採用連絡のみに使用します。</p>
      </div>

      <div id="jgs-entry-form" class="jgs-form">
        <?php
        if ($entry_form) {
          echo do_shortcode('[contact-form-7 id="' . (int) $entry_form->ID . '" title="採用エントリーフォーム"]');
        }
        ?>
      </div>
    </div>
  </div>
</main>

<?php get_footer(); ?>
