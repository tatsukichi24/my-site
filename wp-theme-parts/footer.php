    <footer class="jgs-footer">
      <div class="jgs-footer__main">
        <div class="jgs-footer__inner">
          <div class="jgs-footer__brand">
            <a class="jgs-footer__logo-link" href="<?php echo esc_url(home_url('/')); ?>">
              <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/svg/logo.svg'); ?>" width="231" height="88" decoding="async" alt="<?php bloginfo('name'); ?>" />
            </a>
            <div class="jgs-footer__company">
              <p class="jgs-footer__company-name">株式会社ジュエルグランスエムネ</p>
              <address class="jgs-footer__address">〒729-6205<br />広島県三次市塩町2123-5</address>
              <p class="jgs-footer__tel-fax">
                <span><a href="tel:0824661035">ＴＥＬ 0824-66-1035</a></span>
                <span>ＦＡＸ 0824-66-1031</span>
              </p>
            </div>
          </div>

          <nav class="jgs-footer__nav-col jgs-footer__nav-primary" aria-label="サイトマップ（主要）">
            <div class="jgs-footer__block"><a href="<?php echo esc_url(home_url('/')); ?>">トップページ</a></div>
            <hr class="jgs-footer__rule" />
            <div class="jgs-footer__block"><a href="<?php echo esc_url(home_url('/company/')); ?>">会社概要</a></div>
            <hr class="jgs-footer__rule" />
            <div class="jgs-footer__block"><a href="<?php echo esc_url(home_url('/news/')); ?>">お知らせ</a></div>
            <hr class="jgs-footer__rule" />
            <div class="jgs-footer__block"><a href="<?php echo esc_url(home_url('/privacy/')); ?>">プライバシーポリシー</a></div>
          </nav>

          <nav class="jgs-footer__nav-col jgs-footer__nav-recruit" aria-label="採用情報">
            <div class="jgs-footer__block"><a href="<?php echo esc_url(home_url('/recruit/')); ?>">採用トップ</a></div>
            <hr class="jgs-footer__rule" />
            <div class="jgs-footer__block"><a href="<?php echo esc_url(home_url('/recruit/recruitment/')); ?>">採用情報</a></div>
            <hr class="jgs-footer__rule" />
            <div class="jgs-footer__block"><a href="<?php echo esc_url(home_url('/recruit/childcare/')); ?>">子育て両立応援支援</a></div>
          </nav>

          <div class="jgs-footer__actions">
            <a class="jgs-footer__cta jgs-footer__cta--light" href="<?php echo esc_url(home_url('/contact/#jgs-contact-form')); ?>">
              <img class="jgs-footer__cta-img" src="<?php echo esc_url(get_template_directory_uri() . '/assets/svg/footer-contact_btn.svg'); ?>" width="349" height="105" alt="" decoding="async" aria-hidden="true" />
            </a>
            <a class="jgs-footer__cta jgs-footer__cta--dark" href="<?php echo esc_url(home_url('/recruit/entry/')); ?>">
              <img class="jgs-footer__cta-img" src="<?php echo esc_url(get_template_directory_uri() . '/assets/svg/footer_entry_btn.svg'); ?>" width="220" height="86" alt="" decoding="async" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <div class="jgs-footer__bottom">
        <p class="jgs-footer__copyright">&copy;2022 Jewel Gran Suemune.</p>
      </div>
    </footer>
    <?php wp_footer(); ?>
    <script src="<?php echo esc_url(get_template_directory_uri() . '/assets/js/common.js'); ?>" defer></script>
  </body>
</html>

