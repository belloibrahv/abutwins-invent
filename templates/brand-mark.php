<?php
declare(strict_types=1);
if (!defined('ABSPATH')) {
    exit;
}
$atoms_brand = (new Atoms\Domain\ShopIdentity())->of((new Atoms\Services\SettingsService())->get());
$atoms_logo_alt = trim((string) ($atoms_brand['company'] ?? ''));
if ($atoms_logo_alt === '') {
    $atoms_logo_alt = 'Abu Twins Softskills Investment';
}
$atoms_logo_url = ATOMS_URL . 'assets/img/abutwins-logo.svg';
$atoms_mark_url = ATOMS_URL . 'assets/img/abutwins-mark.svg';
?>
<a class="atoms-brand-logo" href="#/dashboard" aria-label="<?php echo esc_attr($atoms_logo_alt); ?>">
  <img
    class="atoms-brand-logo-full"
    src="<?php echo esc_url($atoms_logo_url); ?>"
    alt="<?php echo esc_attr($atoms_logo_alt); ?>"
    width="220"
    height="52"
    decoding="async"
  >
  <img
    class="atoms-brand-logo-icon"
    src="<?php echo esc_url($atoms_mark_url); ?>"
    alt=""
    aria-hidden="true"
    width="32"
    height="32"
    decoding="async"
  >
</a>
