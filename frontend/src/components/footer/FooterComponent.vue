<template>
  <div class="footer">
    <div class="container">
      <div class="footer__body">
        <div class="footer__row">
          <div class="footer__logo">Easy Buy</div>
          <div class="footer__info">
            <div class="footer__categories">
              <div class="footer__info-title">{{ $t('footer.categories.title') }}</div>
              <ul class="footer__info-menu">
                <li>{{ $t('footer.categories.audio') }}</li>
                <li>{{ $t('footer.categories.photoAndVideo') }}</li>
                <li>{{ $t('footer.categories.smartphones') }}</li>
                <li>{{ $t('footer.categories.householdAppliances') }}</li>
              </ul>
            </div>
            <div class="footer__clients">
              <div class="footer__info-title">{{ $t('footer.client.title') }}</div>
              <ul class="footer__info-menu">
                <li>{{ $t('footer.client.deliveryAndPayment') }}</li>
                <li>{{ $t('footer.client.publicOffer') }}</li>
                <li>{{ $t('footer.client.specialOffers') }}</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div class="footer__orders">
              <div class="footer__info-title">044-444-44-44</div>
              <div>
                {{ $t('footer.makeOrder') }}<br />
                9-00 - 21-00
              </div>
            </div>
            <div class="footer__support">
              <div class="footer__info-title">044-444-44-44</div>
              <div>
                {{ $t('footer.support') }}<br />
                9-00 - 21-00
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.footer {
  background: rgb(49, 49, 49);
  &__body {
    padding: 48px 63px 48px 108px;
    color: white;

    @media only screen and (max-width: 990px) {
      padding: 48px 10px;
    }
  }

  &__row {
    display: flex;
    justify-content: space-between;
    gap: 32px;

    @media only screen and (max-width: 990px) {
      flex-direction: column;
    }
  }

  &__logo {
    font-size: 32px;
    font-weight: 700;
    text-wrap: nowrap;
  }

  &__info {
    display: flex;
    justify-content: space-between;
    flex: 1 1 auto;
    gap: 32px;
    max-width: 950px;

    @media only screen and (max-width: 990px) {
      display: grid;
      grid-template-columns: repeat(auto-fit, minMax(180px, 1fr));
    }

    &-title {
      font-size: 24px;
      font-weight: 600;
    }
    &-menu {
      margin: 8px 0 0 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  }

  &__categories {
  }

  &__clients {
  }

  &__orders {
    :nth-child(2) {
      margin: 8px 0 0 0;
    }
  }

  &__support {
    :nth-child(2) {
      margin: 8px 0 0 0;
    }
  }
}
</style>
